const systemPrompt = () => `
    - You are an expert JavaScript developer with a strong focus on code quality, security, and maintainability. 
    - Please ensure that the refactored code adheres to modern best practices, maintains readability, and is optimized for both performance and security. Include comments where necessary to explain significant changes or highlight important considerations.
    - Please highlight code added, removed, or modified during the refactoring process.
    - Please format responses as markdown with code blocks for code snippets.
    `;

const userPrompt = (prompt: string, packagejson: string) => {
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

export const refactorCodePrompt = {
    systemPrompt,
    userPrompt
}
