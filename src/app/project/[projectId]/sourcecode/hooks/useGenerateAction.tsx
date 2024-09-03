import { TCreateChatCompletion } from "@/database/repositories/chat-completion-repository";
import { ECompletionType } from "@prisma/client";
import { useCallback, useState } from "react";
import { createChatCompletionAction } from "../sourcecode.action";
import { TCreateUnitTest } from "../sourcecode.type";

type TCurrentAction = {
  prompt: string;
  stream: string;
};

type TProps = {
  handleOpenDrawer: () => void;
};

export const useGenerateAction = ({ handleOpenDrawer }: TProps) => {
  const [currentAction, setCurrentAction] = useState<TCurrentAction | null>(
    null
  );

  const onRefactor = useCallback(
    async (filePath: string, fileContent: string) => {
      // 1. VALIDATE FILE PATH
      if (!filePath) {
        alert("No file selected");

        return;
      }

      if (!filePath.includes("component")) {
        const confirm = window.confirm(
          "This file is not a component. Do you want to continue?"
        );

        if (!confirm) {
          return;
        }
      }

      // 2. OPEN DRAWER
      setCurrentAction({ prompt: `Refactor: $${filePath}`, stream: "" });

      handleOpenDrawer();

      // 3. CHAT COMPLETION WITH OLLAMA
      const response = await fetch("/api/refactor", {
        method: "POST",
        body: JSON.stringify({
          prompt: fileContent,
        }),
      });

      // 4. STREAMING RESULT
      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      let awnser = "Result: ";

      while (true) {
        const { done, value } = await reader!.read();

        if (done) {
          // 5. TRIGGER CREATE GENERATE ACTION
          const completion: TCreateChatCompletion = {
            type: ECompletionType.REFACTOR_COMPONENT,
            prompt: `Refactor file $${filePath}`,
            answer: awnser,
            componentName: null,
            image: null,
          };

          await createChatCompletionAction(completion);

          setCurrentAction(null);

          break;
        }

        awnser += decoder.decode(value);

        setCurrentAction({
          prompt: `Refactor file $${filePath}`,
          stream: awnser,
        });
      }
    },
    []
  );

  const onStoryBook = useCallback(
    async (filePath: string, fileContent: string) => {
      // 1. VALIDATE FILE PATH
      if (!filePath) {
        alert("No file selected");

        return;
      }

      if (!filePath.includes("component")) {
        const confirm = window.confirm(
          "This file is not a component. Do you want to continue?"
        );

        if (!confirm) {
          return;
        }
      }

      // 2. OPEN DRAWER
      setCurrentAction({
        prompt: `Generate story for file: $${filePath}`,
        stream: "",
      });

      handleOpenDrawer();

      // 3. CHAT COMPLETION WITH OLLAMA
      const response = await fetch("/api/storybook", {
        method: "POST",
        body: JSON.stringify({
          prompt: fileContent,
        }),
      });

      // 4. STREAMING RESULT
      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      let awnser = "Result: ";

      while (true) {
        const { done, value } = await reader!.read();

        if (done) {
          // 5. TRIGGER CREATE GENERATE ACTION
          const completion: TCreateChatCompletion = {
            type: ECompletionType.ADD_STORYBOOK,
            prompt: `Generate story for file: $${filePath}`,
            answer: awnser,
            componentName: null,
            image: null,
          };

          await createChatCompletionAction(completion);

          setCurrentAction(null);

          break;
        }

        awnser += decoder.decode(value);

        setCurrentAction({
          prompt: `Generate story for file: $${filePath}`,
          stream: awnser,
        });
      }
    },
    []
  );

  const onUnitTest = useCallback(
    async (filePath: string, fileContent: string, data: TCreateUnitTest) => {
      if (!filePath) {
        alert("No file selected");

        return;
      }

      const prompt = `Generate unit test for file: $${filePath}`

      // 2. OPEN DRAWER
      setCurrentAction({
        prompt,
        stream: "",
      });

      handleOpenDrawer();

      // 3. CHAT COMPLETION WITH OLLAMA
      const payload = {
        codeSnippet: fileContent,
        testRunner: data.testRunner,
        testUtility: data.testUtility,
        instruction: data.instructions,
        configFiles: data.configFiles || []
      }

      const response = await fetch("/api/unit-test", {
        method: "POST",
        body: JSON.stringify(payload)
      })

      // 4. STREAMING RESULT
      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      let awnser = "Result: ";

      while (true) {
        const { done, value } = await reader!.read();

        if (done) {
          // 5. TRIGGER CREATE GENERATE ACTION
          const completion: TCreateChatCompletion = {
            type: ECompletionType.ADD_STORYBOOK,
            prompt,
            answer: awnser,
            componentName: null,
            image: null,
          };

          // await createChatCompletionAction(completion);

          // setCurrentAction(null);

          break;
        }

        awnser += decoder.decode(value);

        setCurrentAction({
          prompt,
          stream: awnser,
        });
      }
    },
    []
  );

  const onComponent = useCallback(async (data: FormData) => {
    // 1. EXTRACT DATA
    const componentName = data.get("componentName");

    // 2. OPEN DRAWER
    const prompt = `Generate component: ${componentName}`;

    setCurrentAction({ prompt, stream: "" });

    handleOpenDrawer();

    // 3. CHAT COMPLETION WITH OLLAMA
    const response = await fetch("/api/create-component", {
      method: "POST",
      body: data
    });

    // 4. STREAMING RESULT
    const reader = response.body?.getReader();

    const decoder = new TextDecoder();

    let awnser = "Result: ";

    while (true) {
      const { done, value } = await reader!.read();

      if (done) {
        // 5. TRIGGER CREATE GENERATE ACTION
        const completion: TCreateChatCompletion = {
          type: ECompletionType.REFACTOR_COMPONENT,
          prompt,
          answer: awnser,
          componentName: null,
          image: null,
        };

        // await createChatCompletionAction(completion);

        // setCurrentAction(null);

        break;
      }

      awnser += decoder.decode(value);

      setCurrentAction({ prompt, stream: awnser });
    }
  }, []);

  return {
    onRefactor,
    onStoryBook,
    onUnitTest,
    onComponent,
    currentAction,
  };
};
