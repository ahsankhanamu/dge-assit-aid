interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: ErrorResponse
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error: ApiError): boolean => {
  // Retry on network errors or 5xx server errors
  return !error.status || (error.status >= 500 && error.status < 600);
};

async function fetchWithTimeout(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    ...fetchOptions
  } = options;

  let lastError: ApiError;
  let attempt = 0;

  // If retries is 0, don't retry at all
  const maxAttempts = retries === 0 ? 1 : retries + 1;

  while (attempt < maxAttempts) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          errorData as ErrorResponse
        );
      }

      return response;
    } catch (error) {
      lastError =
        error instanceof ApiError
          ? error
          : new ApiError(
              error instanceof Error
                ? error.message
                : "An unknown error occurred"
            );

      // If this is the last attempt or error is not retryable, throw
      if (!isRetryableError(lastError) || attempt === maxAttempts - 1) {
        throw lastError;
      }

      attempt++;
      await delay(retryDelay * attempt); // Exponential backoff
    }
  }

  throw lastError!;
}

async function api<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
}

// Helper methods for common HTTP methods
export const apiClient = {
  get: <T>(url: string, options?: RequestOptions) =>
    api<T>(url, { ...options, method: "GET" }),

  post: <T>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestOptions
  ) =>
    api<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestOptions
  ) =>
    api<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestOptions
  ) =>
    api<T>(url, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(url: string, options?: RequestOptions) =>
    api<T>(url, { ...options, method: "DELETE" }),
};
