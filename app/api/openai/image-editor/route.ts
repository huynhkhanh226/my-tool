import { NextRequest, NextResponse } from "next/server";
import { modelGptImage1, openaiClient } from "@/app/_libs/api/openai/config";
export async function POST(req: NextRequest) {
  const errorUrl =
    "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png";
  try {
    const formData = await req.formData();
    const prompt = formData.get("prompt")?.toString() || "";
    const images = formData.getAll("images") as File[];
    console.log("prompt", prompt);
    console.log("images", images);
    const res = await openaiClient.images.edit({
      model: modelGptImage1.modelId,
      image: images,
      prompt: prompt,
      //size: "512x512",
      //response_format: "b64_json",
    });
    console.log("res", res);
    // Save the image to a file
    const imageBase64 = res.data ? res.data[0].b64_json : errorUrl;
    return NextResponse.json(
      { url: `data:image/png;base64,${imageBase64}` },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("NoImageGeneratedError");
    return NextResponse.json({ url: errorUrl }, { status: 500 });
  }
}
