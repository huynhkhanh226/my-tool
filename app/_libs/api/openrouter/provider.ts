import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Khởi tạo OpenRouter với API key từ biến môi trường
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});
