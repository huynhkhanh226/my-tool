import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";
import OpenAI from "openai";

export const openai: OpenAIProvider = createOpenAI({
  baseURL: "https://api.openai.com/v1",
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

export const modelGPT4oMini = openai.chat("gpt-4o-mini");

export const modelDallE2 = openai.image("dall-e-2");

export const modelTextToAudio = openai.speech("gpt-4o-mini-tts");

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const modelGptImage1 = openai.image("gpt-image-1");

