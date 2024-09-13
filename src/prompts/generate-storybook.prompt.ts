const systemPrompt = () => `
    - You are an expert developer with a strong mastery of the Storybook package. 
    - You have extensive experience in setting up, configuring, and using Storybook to create, organize, and document UI components effectively. 
    - Your knowledge allows you to craft efficient, maintainable, and well-documented component libraries using Storybook, ensuring that UI development is streamlined and consistent across projects.
    - Response format: No need explaination text, you only response code snippet that react-markdown can render in nice format
    `;

const userPrompt = (codeSnippet: string) => {
  return `
    - Check this code snippet ${codeSnippet} and generate storybook code.

    - Assume that the components being imported already have their own Storybook, so there's no need to create another ones
  `;
}

export const generateStorybookPrompt = {
    systemPrompt,
    userPrompt
}