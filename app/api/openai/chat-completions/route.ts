/* eslint-disable @typescript-eslint/no-explicit-any */
import { modelGPT4oMini } from "@/app/_libs/api/openai/config";
import { streamText } from "ai";
export const maxDuration = 30; // Giới hạn thời gian phản hồi tối đa

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request, res: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: modelGPT4oMini,
    messages,
  });

  // res.writeHead(200, {
  //   'Content-Type': 'text/event-stream',
  //   'Cache-Control': 'no-cache',
  //   Connection: 'keep-alive',
  // });

  // for await (const chunk of result.textStream) {
  //   res.write(`data: ${chunk}\n\n`);
  // }

  // res.end();

  // Trả về phản hồi dưới dạng stream
  console.log("result", result);
  return result.toDataStreamResponse();
}
