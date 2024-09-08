import * as xlsx from "xlsx";
import fs from "fs";
import { generateTestcasesPrompts } from "@/prompts/generate-testcases.prompt";
import { LLMS } from "@/llms";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

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

const parser = StructuredOutputParser.fromZodSchema(
  generateTestcasesPrompts.testcasesSchema
);

const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(generateTestcasesPrompts.prompt),
  LLMS["llama3.1"],
  parser,
]);

export async function generateTestCasesService(
  specsPath: string
): Promise<string> {
  const docs = await loadCSV(specsPath);

  let result: any[] = [];

  for await (const doc of docs) {
    try {
      const response = await chain.invoke({
        specs: JSON.stringify(doc),
        format_instructions: parser.getFormatInstructions(),
      });

      result = [...result, ...response];
    } catch (errror) {
      result = [...result, { errror }];
    }
  }

  const indexedTestCases = result.map((r, i) => ({ no: i + 1, ...r }));

  return await writeTestCasesToFile(indexedTestCases, docs);
}
