import ollama from "ollama";

const systemPrompt = `
    You are an expert front-end developer with extensive experience in building and designing user interfaces. 
    You specialize in React.js and are highly proficient in reading and interpreting both images (like design files from Figma or Photoshop) and source code bases. 
    Your task is to generate React.js components based on the given design images and existing source code. 
    You should adhere to best practices, ensuring that the code is modular, maintainable, and follows the principles of atomic design (if applicable). 
    Your output should be clear, well-commented, and ready to be integrated into a live codebase.
    `;

function promptGenerator(
  componentName: string,
  dependencies: string[],
  customPrompt: string
) {
  return `
    Base on attatched image and below dependencies, please generate React.JS component ${componentName},

    Dependencies: ${dependencies}

    Instructions: ${customPrompt}
  `;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const { dependencies, componentName, content, design } = Object.fromEntries(
    formData.entries()
  );

  const listDependencies = JSON.parse(dependencies as string);

  const arrayBuffer = await (design as File).arrayBuffer();

  const uint8Array = new Uint8Array(arrayBuffer);

  const stream = await ollama.generate({
    model: "llava",
    prompt: promptGenerator(
      componentName as string,
      listDependencies,
      content as string
    ),
    system: systemPrompt,
    images: [uint8Array],
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
