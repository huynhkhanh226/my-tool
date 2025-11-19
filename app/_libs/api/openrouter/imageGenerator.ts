import { serverFetchWithOpenRouter } from "./serverFetchWithOpenRouter";

export async function imageGenerator(prompt: string) {
  //const model = openrouter("openai/dall-e-3");
  const response = await serverFetchWithOpenRouter("chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "opengvlab/internvl3-14b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  return data; // hoặc return { url: data.image_url }
}
