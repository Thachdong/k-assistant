const systemPrompt = () => `
    - You are developer, you will reading attached image and generate new component
    - You only response code snippet as result, no need to explain anything
    `;

function userPrompt(
  componentName: string,
  dependencies: string,
  customPrompt: string
) {
  return `
    - This image is design about a part of webpage, please reading and descript all components that belong to this image
  `;
}

export const generateCodePrompt = {
  userPrompt,
  systemPrompt,
};
