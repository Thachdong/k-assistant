const promptGenerator = (doc: any) => `
  - you are software tester, you can reading some documents about software specification,
  - and here is specs: ${JSON.stringify(doc)},

  ### Example ###
  - specs: {
              'No.': 1,
              item: 'ID',
              Type: 'int',
              'Max Length': 5,
              'Input(I)/Ouput(O)': 'Input/Output',
              Required: '-',
              Description: 'Input làm điều kiện search \r\n' +
              'Hiển thị ban đầu: rỗng\r\n' +
              'Output: hiển thị trên column ID ở table list: get giá trị từ API GetUserList > list > userId\r\n' +
              'List hiển thị ban đầu ở table sẽ được sort theo default là ID giảm dần và hiển thị icon ▼\r\n' +
              'Sử dụng ID để sort theo descending/ascending cho list giá trị trong table '
          }   
  - test cases: '[{"title":"test type of ID tag","action":"input number into id tag","expect":"can input number"},{"title":"test type of ID","action":"input string into id tag","expect":"can not input string"},{"title":"test max length of ID","action":"","expect":"maximun length of ID is 5"},{"title":"test empty ID","action":"input empty value into id tag","expect":"ID cannot be empty"},{"title":"test invalid input for ID","action":"input special character into id tag","expect":"can not input special character"},{"title":"test sort ascending","action":"sort list by ID in ascending order","expect":"list is sorted in ascending order"},{"title":"test sort descending","action":"sort list by ID in descending order","expect":"list is sorted in descending order"}]'
  `;

const systemPrompt =  "you are testcase generator, no need explaination text, you only response a json of list of test cases, and not insert any new line"

export const generateTestCasesPrompt = {
    promptGenerator,
    systemPrompt
}