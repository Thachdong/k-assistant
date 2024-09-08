import { LLMS } from "@/llms";
import { PromptTemplate } from "@langchain/core/prompts";

const prompt = PromptTemplate.fromTemplate("Anwser user {question}:\n");

export async function POST(request: Request) {
  const { question } = await request.json();

  const chain = prompt.pipe(LLMS['llama3.1']);

  const stream = await chain.stream({
    question,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
