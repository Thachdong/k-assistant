import { getReadableStream } from "@/utils/api.util";
import ollama from "ollama";

const packageJsonFile = `{
  "name": "source-base",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@fontsource/roboto": "^5.0.14",
    "@hookform/resolvers": "^3.9.0",
    "@mui/icons-material": "^6.0.0",
    "@mui/material": "^6.0.0",
    "next": "14.2.6",
    "next-auth": "^4.24.7",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.53.0",
    "yup": "^1.4.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.6",
    "postcss": "^8",
    "prisma": "^5.18.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}`;

const systemPrompt = `
    You are an expert front-end developer with extensive experience in building and designing user interfaces. 
    You specialize in React.js and are highly proficient in reading and interpreting both images (like design files from Figma or Photoshop) and source code bases. 
    Your task is to generate React.js components based on the given design images and existing source code. 
    You should adhere to best practices, ensuring that the code is modular, maintainable, and follows the principles of atomic design (if applicable). 
    Your output should be clear, well-commented, and ready to be integrated into a live codebase.
    Analyze the attached Figma design file. Focus on identifying the key visual elements and overall layout structure.
    Package.json file of project: ${packageJsonFile}
    `;

function promptGenerator(
  componentName: string,
  dependencies: string,
  customPrompt: string
) {
  return `
    Please reading this components: ${dependencies}, try to understand their structure, style, and functionality

    Compose this components to generate new component name ${componentName} base on attatched design

    Respone format: only return code snippet in markdown format, no need any explaination
  `;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const { dependencies, componentName, content, design } = Object.fromEntries(
    formData.entries()
  );

  const arrayBuffer = await (design as File).arrayBuffer();

  const uint8Array = new Uint8Array(arrayBuffer);

  const prompt = promptGenerator(
    componentName as string,
    dependencies as string,
    content as string
  );

  const stream = await ollama.generate({
    model: "llava",
    prompt,
    system: systemPrompt,
    images: [uint8Array],
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
