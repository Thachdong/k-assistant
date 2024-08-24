import ollama from "ollama";

export async function POST(request: Request) {
  const { question } = await request.json();

  const stream = await ollama.generate({
    model: "llama3.1",
    prompt: question,
    system: "",
    stream: true
  })

  const readableStream = new ReadableStream({
    async pull(controller) {
      for await (const chunk of stream) {
        controller.enqueue(new TextEncoder().encode(chunk.response));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
