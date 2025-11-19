import { modelTextToAudio } from "@/app/_libs/api/openai/config";
import { experimental_generateSpeech as generateSpeech } from "ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "";
    if (!prompt) {
      return null;
    }
    // See more https://ai-sdk.dev/docs/ai-sdk-core/speech
    const res = await generateSpeech({
      model: modelTextToAudio,
      text: prompt,
      voice: "alloy",
    });

    console.log("res", res);
    const buffer = Buffer.from(res.audio.uint8Array);

    // const filePath = path.join(process.cwd(), 'public', 'tmp');
    // if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
    // const fileName = `audio-${Date.now()}.mp3`;

    // const fullPath = path.join(filePath, fileName);
    // fs.writeFileSync(fullPath, buffer);

    // const downloadUrl = `/tmp/${fileName}`;
    // return NextResponse.json({ url: downloadUrl }, { status: 200 });
    const base64 = buffer.toString("base64");
    return NextResponse.json({ base64 }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("AI_NoAudioGeneratedError");
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
