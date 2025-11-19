import { OpenRouterProvider } from "@openrouter/ai-sdk-provider";
import { OpenRouterCompletionLanguageModel } from "@openrouter/ai-sdk-provider/internal";

export type ImageType = {
  prompt: string
  model: OpenRouterCompletionLanguageModel 
  provider: OpenRouterProvider
};


