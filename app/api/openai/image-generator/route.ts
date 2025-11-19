import { modelDallE2 } from "@/app/_libs/api/openai/config";
import {
  experimental_generateImage as generateImage,
  NoImageGeneratedError,
} from "ai";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "";
    if (!prompt) {
      return null;
    }
    // See more https://ai-sdk.dev/docs/ai-sdk-core/image-generation
    const { image } = await generateImage({
      model: modelDallE2,
      prompt: prompt,
      size: "256x256",
      n: 1,
      // aspectRatio: "16:9",
      // providerOptions: {
      //   openai: { style: "vivid", quality: "hd" },
      // },
    });

    const imageBase64 = image.base64; // base64 image data
    return NextResponse.json(
      { url: `data:image/png;base64,${imageBase64}` },
      { status: 200 }
    );
  } catch (error) {
    if (NoImageGeneratedError.isInstance(error)) {
      console.log("NoImageGeneratedError");
      console.log("Cause:", error.cause);
      console.log("Responses:", error.responses);
    }
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
