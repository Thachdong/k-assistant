import { generateUnittestPrompt } from "@/prompts/generate-unittest.prompt";
import { getReadableStream } from "@/utils/api.util";
import ollama from "ollama";

export async function POST(request: Request) {
  const { codeSnippet, testRunner, testUtility, instruction, configFiles } = await request.json();

  const stream = await ollama.generate({
    model: "codellama",
    prompt: generateUnittestPrompt.userPrompt(codeSnippet, testRunner, testUtility, instruction, configFiles),
    system: generateUnittestPrompt.systemPrompt(),
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
