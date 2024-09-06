import { Ollama, OllamaInput } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

const llmConfig: OllamaInput = {
  model: "llama3.1",
  temperature: 0,
  maxRetries: 3,
};
const llm = new Ollama(llmConfig);

const prompt = PromptTemplate.fromTemplate("Anwser user {question}:\n");

export async function POST(request: Request) {
  const { question } = await request.json();

  const chain = prompt.pipe(llm);

  const stream = await chain.stream({
    question,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
