import ollama from "ollama";

const systemPrompt = `
    - You are an expert developer with a strong mastery of the Storybook package. 
    - You have extensive experience in setting up, configuring, and using Storybook to create, organize, and document UI components effectively. 
    - Your knowledge allows you to craft efficient, maintainable, and well-documented component libraries using Storybook, ensuring that UI development is streamlined and consistent across projects.
    - You will response in markdown format
    `;

function promptGeenrator(prompt: string) {
  return `
    - Check this code snippet ${prompt} and generate storybook code.

    - Assume that the components being imported already have their own Storybook, so there's no need to create another ones

    - Respone split into 2 parts: 
        1. Brief summary about code you will genarate
        2. Code snippets
  `;
}

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const stream = await ollama.generate({
    model: "llama3.1",
    prompt: promptGeenrator(prompt),
    system: systemPrompt,
    stream: true,
    options: {
      temperature: 0,
    },
  });

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
