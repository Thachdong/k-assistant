import { Ollama, OllamaInput } from "@langchain/ollama";

// #region -- llama3.1
const llamaConfig: OllamaInput = {
  model: "llama3.1",
  temperature: 0,
  maxRetries: 3,
};

const llama = new Ollama(llamaConfig);
// #endregion

// #region codellama
const codellamaConfig: OllamaInput = {
  model: "codellama",
  temperature: 0,
  maxRetries: 3,
};

const codellama = new Ollama(codellamaConfig);
// #endregion

// #region -- llava
const llavaConfig: OllamaInput = {
  model: "llava",
  temperature: 0,
  maxRetries: 3,
};

const llava = new Ollama(llavaConfig);
// #endregion

export const LLMS = {
  "llama3.1": llama,
  codellama,
  llava
};
