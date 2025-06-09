import { apiClient } from "./api";

interface OpenAIParams {
  prompt: string;
  promptField: string;
  data: object;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal: null | string;
      annotations: unknown[];
    };
    logprobs: null;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: {
      cached_tokens: number;
      audio_tokens: number;
    };
    completion_tokens_details: {
      reasoning_tokens: number;
      audio_tokens: number;
      accepted_prediction_tokens: number;
      rejected_prediction_tokens: number;
    };
  };
  service_tier: string;
  system_fingerprint: null;
}

interface EmailParams {
  to: string;
  subject: string;
  isArabic: boolean;
  data: Record<string, unknown>;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

// OpenAI API endpoint
const openAI = {
  generateText: async (params: OpenAIParams): Promise<OpenAIResponse> => {
    const response = await apiClient.post<ApiResponse<OpenAIResponse>>(
      import.meta.env.VITE_OPENAI_API_URL,
      {
        prompt: params.prompt,
        promptField: params.promptField,
        data: params.data,
      }
    );
    console.log("API Response:", response);
    if (response.error) {
      throw new Error(response.error);
    }
    // The response is already the OpenAI response, not wrapped in data
    return response as unknown as OpenAIResponse;
  },
};

// Email API endpoint
export const EMAIL_API = {
  sendEmail: async (params: EmailParams) => {
    return apiClient.post<ApiResponse<{ messageId: string }>>(
      import.meta.env.VITE_EMAIL_API_URL,
      {
        to: params.to,
        subject: params.subject,
        isArabic: params.isArabic,
        data: params.data,
      }
    );
  },
};

export { openAI };
