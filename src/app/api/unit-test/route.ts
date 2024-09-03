import { getReadableStream } from "@/utils/api.util";
import ollama from "ollama";

const systemPrompt = `
    You are a skilled programmer focused on writing unit tests for front-end code. 
    Your task is to create comprehensive and efficient test cases that ensure the functionality and reliability of the front-end components. 
    When provided with code snippets or component descriptions, or test runner, or test utility library, 
      your goal is to generate appropriate unit tests that cover various edge cases, user interactions, and integration points. 
    You are also expected to follow best practices in testing and consider the latest testing frameworks and tools used in front-end development.
    `;

function promptGeenrator(codeSnippet: string, testRunner: string, testUtility: string, instructions: string, configFiles: string[]) {
  return `
    - Check this code snippet ${codeSnippet} and generate unit test code with following instructions:
      1. Test runner library: ${testRunner}
      2. Test utility (if has): ${testUtility}
      3. Additional instruction (if has): ${instructions}
      4. Testing library config files (if has): ${configFiles}

    - Assume that the components being imported already have their own unit test file, so there's no need to create another ones

    - Respone split into 2 parts: 
        1. Name of library used and list of testcase will generate (short and concise)
        2. Code snippets
  `;
}

export async function POST(request: Request) {
  const { codeSnippet, testRunner, testUtility, instruction, configFiles } = await request.json();

  const stream = await ollama.generate({
    model: "codellama",
    prompt: promptGeenrator(codeSnippet, testRunner, testUtility, instruction, configFiles),
    system: systemPrompt,
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
