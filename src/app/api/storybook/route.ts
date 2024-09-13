import { LLMS } from "@/llms";
import { generateStorybookPrompt } from "@/prompts/generate-storybook.prompt";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const prompts = [
    generateStorybookPrompt.systemPrompt(),
    generateStorybookPrompt.userPrompt(prompt)
  ]

  const stream = await LLMS['llama3.1'].stream(prompts)

  return new Response(stream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
