import { generateStorybookPrompt } from "@/prompts/generate-storybook.prompt";
import { getReadableStream } from "@/utils/api.util";
import ollama from "ollama";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const stream = await ollama.generate({
    model: "llama3.1",
    prompt: generateStorybookPrompt.userPrompt(prompt),
    system: generateStorybookPrompt.systemPrompt(),
    stream: true,
    options: {
      temperature: 0,
    },
  });

  const readableStream = await getReadableStream(stream);

  return new Response(readableStream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
