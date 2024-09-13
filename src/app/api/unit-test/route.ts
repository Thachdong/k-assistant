import { LLMS } from "@/llms";
import { generateUnittestPrompt } from "@/prompts/generate-unittest.prompt";

export async function POST(request: Request) {
  const { codeSnippet, testRunner, testUtility, instruction, configFiles } = await request.json();

  const prompts = [
    generateUnittestPrompt.systemPrompt(),
    generateUnittestPrompt.userPrompt(codeSnippet, testRunner, testUtility, instruction, configFiles),
  ]

  const stream = await LLMS.codellama.stream(prompts)

  return new Response(stream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
