import * as xlsx from "xlsx";
import fs from "fs";
import { generateTestCasesPrompt } from "./prompts";
import ollama from "ollama";

const { readFile, set_fs, utils } = xlsx;
set_fs(fs);

export async function loadCSV(path: string) {
  const workbook = readFile(path);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  return utils.sheet_to_json(sheet);
}

function writeTestCasesToFile(testCases: any, specs: any): string {
  const testcasesSheet = utils.json_to_sheet(testCases);

  const specsSheet = utils.json_to_sheet(specs);

  const workbook = utils.book_new();

  utils.book_append_sheet(workbook, testcasesSheet, "testcases");

  utils.book_append_sheet(workbook, specsSheet, "specs");

  const filename = `/generated/testcases-${new Date().toDateString()}.xlsx`;

  xlsx.writeFile(workbook, `./public${filename}`);

  return filename;
}

export async function generateTestCasesService(specsPath: string): Promise<string> {
    const docs = await loadCSV(specsPath);

    let result: any[] = [];

  for (const doc of docs) {
    const prompt = generateTestCasesPrompt.promptGenerator(doc);

    const { response } = await ollama.generate({
      model: "llama3.1",
      prompt,
      options: {
        temperature: 1,
      },
      system: generateTestCasesPrompt.systemPrompt,
      stream: false,
    });

    try {
      const testCases = JSON.parse(response);

      result = [...result, ...testCases];
    } catch (error) {
      console.log(error);
      
      result = [...result, {error, data: response}];
    }
  }

  const indexedTestCases = result.map((r, i) => ({no: i + 1, ...r}));

  return await writeTestCasesToFile(indexedTestCases, docs);
}