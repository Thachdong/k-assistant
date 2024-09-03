import { TCreateChatCompletion } from "@/database/repositories/chat-completion-repository";
import { ECompletionType } from "@prisma/client";
import { useCallback, useContext, useState } from "react";
import { createChatCompletionAction } from "../sourcecode.action";
import { TCreateUnitTest } from "../sourcecode.type";
import { ProjectContext } from "../../_context";

type TCurrentAction = {
  prompt: string;
  stream: string;
};

type TProps = {
  handleOpenDrawer: () => void;
};

export const useGenerateAction = ({ handleOpenDrawer }: TProps) => {
  const { selectedFile } = useContext(ProjectContext);

  const [currentAction, setCurrentAction] = useState<TCurrentAction | null>(
    null
  );

  const onRefactor = useCallback(
    async () => {
      // 1. VALIDATE FILE PATH
      if (!selectedFile) {
        alert("No file selected");

        return;
      }

      if (!selectedFile.path.includes("component")) {
        const confirm = window.confirm(
          "This file is not a component. Do you want to continue?"
        );

        if (!confirm) {
          return;
        }
      }

      // 2. OPEN DRAWER
      const prompt = `Refactor: ${selectedFile.path}`;

      setCurrentAction({ prompt, stream: "" });

      handleOpenDrawer();

      // 3. CHAT COMPLETION WITH OLLAMA
      const response = await fetch("/api/refactor", {
        method: "POST",
        body: JSON.stringify({
          prompt: selectedFile.content,
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
            prompt,
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
          prompt,
          stream: awnser,
        });
      }
    },
    []
  );

  const onStoryBook = useCallback(
    async () => {
      // 1. VALIDATE FILE PATH
      if (!selectedFile) {
        alert("No file selected");

        return;
      }

      if (!selectedFile.path.includes("component")) {
        const confirm = window.confirm(
          "This file is not a component. Do you want to continue?"
        );

        if (!confirm) {
          return;
        }
      }

      // 2. OPEN DRAWER
      const prompt = `Generate story for file: $${selectedFile.path}`;

      setCurrentAction({
        prompt,
        stream: "",
      });

      handleOpenDrawer();

      // 3. CHAT COMPLETION WITH OLLAMA
      const response = await fetch("/api/storybook", {
        method: "POST",
        body: JSON.stringify({
          prompt: selectedFile.content,
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
            prompt,
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
          prompt,
          stream: awnser,
        });
      }
    },
    []
  );

  const onUnitTest = useCallback(
    async (data: TCreateUnitTest) => {
      if (!selectedFile) {
        alert("No file selected");

        return;
      }

      const prompt = `Generate unit test for file: $${selectedFile.path}`

      // 2. OPEN DRAWER
      setCurrentAction({
        prompt,
        stream: "",
      });

      handleOpenDrawer();

      // 3. CHAT COMPLETION WITH OLLAMA
      const payload = {
        codeSnippet: selectedFile.content,
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

          await createChatCompletionAction(completion);

          setCurrentAction(null);

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
