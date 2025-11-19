/* eslint-disable @typescript-eslint/no-explicit-any */
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export const maxDuration = 30; // Giới hạn thời gian phản hồi tối đa

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Khởi tạo OpenRouter với API key từ biến môi trường
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  // Chọn mô hình cần sử dụng, ví dụ: 'openai/gpt-4o'
  const model = openrouter("openai/gpt-4o-mini");

  // Gửi yêu cầu và nhận phản hồi dạng stream
  const result: any = await streamText({
    model,
    messages,
  });

  // Trả về phản hồi dưới dạng stream
  return result.toDataStreamResponse();
}
