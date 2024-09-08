import { LLMS } from "@/llms";
import { refactorCodePrompt } from "@/prompts/refactor-code.prompt";

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

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const prompts = [
    refactorCodePrompt.systemPrompt(),
    refactorCodePrompt.userPrompt(prompt, JSON.stringify(packagejson)),
  ]

  const stream = await LLMS['llama3.1'].stream(prompts)

  return new Response(stream, {
    headers: {
      "Content-Type": "pplication/octet-stream",
    },
  });
}
