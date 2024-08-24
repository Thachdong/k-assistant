import { Ollama } from "@langchain/ollama";

export const llama = new Ollama({ model: "llama3.1" });