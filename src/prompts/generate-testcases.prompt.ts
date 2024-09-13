import { z } from "zod";

const prompt = `
  Generate testcases base on specs and convert generated data into vietnamese.\n
    ***Example:***
      1. specs:
        {{
        "No.": 1,
        "item": "ID",
        "Type": "int",
        "Max Length": 5,
        "Input(I)/Output(O)": "Input/Output",
        "Required": "-",
        "Description": "Input làm điều kiện search \r\nHiển thị ban đầu: rỗng\r\nOutput: hiển thị trên column ID ở table list: get giá trị từ API GetUserList > list > userId\r\nList hiển thị ban đầu ở table sẽ được sort theo default là ID giảm dần và hiển thị icon ▼\r\nSử dụng ID để sort theo descending/ascending cho list giá trị trong table"
      }}

      2. generated testcases:
      [
        {{"title": "test type of ID tag", "action": "input number into id tag", "expect": "can input number"}},
        {{"title": "test type of ID", "action": "input string into id tag", "expect": "can not input string"}},
        {{"title": "test max length of ID", "action": "", "expect": "maximum length of ID is 5"}},
        {{"title": "test empty ID", "action": "input empty value into id tag", "expect": "ID cannot be empty"}},
        {{"title": "test invalid input for ID", "action": "input special character into id tag", "expect": "can not input special character"}},
        {{"title": "test sort ascending", "action": "sort list by ID in ascending order", "expect": "list is sorted in ascending order"}},
        {{"title": "test sort descending", "action": "sort list by ID in descending order", "expect": "list is sorted in descending order"}}
      ]
    ***Response format***: {format_instructions}\n

    ***Specs***: {specs}
  `;

const singleTestCaseSchema = z.object({
  title: z.string().describe("Name of testing target"),
  action: z.string().describe("Detail about test action"),
  expect: z.string().describe("Expect behavior base on action"),
});

const testcasesSchema = z.array(singleTestCaseSchema);

export const generateTestcasesPrompts = {
  prompt,
  testcasesSchema,
};
