/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";
import fs from "fs";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body", body)
  const prompt = body.prompt || "A futuristic city at sunset";

  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || "",
    baseURL: "https://openrouter.ai/api/v1",
  });

  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
  });
  console.log("result", result)
  // Save the image to a file
  if (result && result.data) {
    const image_base64 = result.data[0].b64_json;
    const image_bytes = Buffer.from(image_base64!, "base64");
    fs.writeFileSync("otter.png", image_bytes);

    return Response.json({
      url: "otter.png",
    });
  } else {
    return Response.json({
      url: "aaaa.png",
    });
  }
}
