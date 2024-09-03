import { getReadableStream } from "@/utils/api.util";
import ollama from "ollama";

export async function POST(request: Request) {
  const { question } = await request.json();

  const stream = await ollama.generate({
    model: "llama3.1",
    prompt: question,
    system: "",
    stream: true
  })

  const readableStream = await getReadableStream(stream)

  return new Response(readableStream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
