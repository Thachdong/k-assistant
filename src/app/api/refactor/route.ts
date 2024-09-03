import { getReadableStream } from "@/utils/api.util";
import ollama from "ollama";

const systemPrompt = `
    - You are an expert JavaScript developer with a strong focus on code quality, security, and maintainability. 
    - Please ensure that the refactored code adheres to modern best practices, maintains readability, and is optimized for both performance and security. Include comments where necessary to explain significant changes or highlight important considerations.
    - Please highlight code added, removed, or modified during the refactoring process.
    - Please format responses as markdown with code blocks for code snippets.
    `;

const packagejson = {
  name: "codebase",
  version: "0.1.0",
  private: true,
  engines: {
    node: "16.x",
  },
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "next lint",
    export: "next build && next export",
  },
  dependencies: {
    "@date-io/moment": "^2.16.0",
    "@emotion/cache": "^11.10.3",
    "@emotion/react": "^11.10.4",
    "@emotion/server": "^11.10.0",
    "@emotion/styled": "^11.10.4",
    "@fontsource/roboto": "^4.5.8",
    "@hookform/error-message": "^2.0.0",
    "@hookform/resolvers": "^3.0.1",
    "@mui/icons-material": "^5.10.9",
    "@mui/lab": "^5.0.0-alpha.104",
    "@mui/material": "^5.10.9",
    "@mui/x-data-grid": "^5.17.8",
    "@mui/x-date-pickers": "^5.0.5",
    "@tanstack/react-query": "^4.12.0",
    "@tinymce/tinymce-react": "^4.2.0",
    axios: "0.27.2",
    "chart.js": "^4.2.1",
    clsx: "^1.2.1",
    lodash: "^4.17.21",
    moment: "^2.29.4",
    next: "12.3.1",
    nprogress: "^0.2.0",
    "rc-tree-select": "2.9.4",
    react: "18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-contexify": "^6.0.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.37.0",
    "react-lottie": "^1.2.3",
    "react-material-ui-carousel": "^3.4.2",
    "react-number-format": "^4.9.3",
    "react-query": "^3.39.2",
    "react-responsive": "^9.0.2",
    "react-to-print": "^2.14.12",
    "react-toastify": "^9.0.8",
    recharts: "^2.5.0",
    sass: "^1.58.3",
    tinymce: "^6.3.1",
    yup: "^1.0.2",
  },
  devDependencies: {
    "@types/lodash": "^4.14.186",
    "@types/node": "18.11.0",
    "@types/nprogress": "^0.2.0",
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.6",
    "@types/react-lottie": "^1.2.6",
    autoprefixer: "^10.4.12",
    eslint: "8.25.0",
    "eslint-config-next": "12.3.1",
    less: "^4.1.3",
    "less-loader": "^11.1.0",
    postcss: "^8.4.18",
    "postcss-import": "^15.0.0",
    tailwindcss: "^3.1.8",
    typescript: "4.8.4",
  },
};

function promptGeenrator(prompt: string) {
  return `
    - Please reading this package.json file: ${packagejson}

    - Check this code snippet ${prompt} and refactor it

    - Only validate and refactor code belongs to the provided code snipet, ignore imported code

    - Some aspects to consider:
        1. Security Audit: Identify any potential security vulnerabilities in the code.
        2. Variable Naming: Check for any incorrect, misleading, or meaningless variable names.
        3. Function Simplification: Identify any overly complicated or lengthy functions.
        4. Dead Code Removal: Detect any dead or unused code and remove it.
        5. Technical Debt: Identify any areas in the code that contribute to technical debt.
        6. Code Optimization: Optimize the code for performance and efficiency.
        7. Code Comments: Check for missing or outdated comments in the code.
        8. Documentation: Update the code documentation to reflect any changes made during the refactoring process.

    - Because updating the code take a lot effort, please evaluate carefully before making suggestion

    - validate each considerations in range of 1 - 10, highlight if each one <= 7

    - Respone split into 2 parts: 
        1. Summary of changes made
        2. Refactored code snippet
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

  const readableStream = await getReadableStream(stream);

  return new Response(readableStream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
