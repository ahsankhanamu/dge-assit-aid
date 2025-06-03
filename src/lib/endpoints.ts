import { apiClient } from "./api";

interface OpenAIParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

interface EmailParams {
  to: string;
  subject: string;
  template: string;
  data: Record<string, unknown>;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

// OpenAI API endpoint
export const openAI = {
  generateSuggestion: async (params: OpenAIParams) => {
    return apiClient.post<string>(import.meta.env.VITE_OPENAI_API_URL, {
      prompt: params.prompt,
      retries: 1,
    });
  },
};

// Email API endpoint
const email = {
  sendEmail: async (params: EmailParams) => {
    return apiClient.post<ApiResponse<{ messageId: string }>>(
      import.meta.env.VITE_EMAIL_API_URL,
      {
        to: params.to,
        subject: params.subject,
        template: params.template,
        data: params.data,
      }
    );
  },
};
