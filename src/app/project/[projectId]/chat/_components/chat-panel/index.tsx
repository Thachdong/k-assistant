"use client";

import { Box, Stack } from "@mui/material";
import { AnwserBox } from "../anwser-box";
import { QuestionBox } from "../question-box";
import { useCallback, useEffect, useState } from "react";
import { createChatMessageAction } from "../../chat.action";
import { Chat, ERoles } from "@prisma/client";

type TProps = {
  chatHistory: Chat[];
};

export const ChatPanel: React.FC<TProps> = ({ chatHistory }) => {
  const [stream, setStream] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [history, setHistory] = useState<Chat[]>(chatHistory);

  const addHistory = useCallback(async(message: string, role: ERoles) => {
    const result = await createChatMessageAction({
      role,
      message,
    });

    if (result.success) {
      console.log(`start save ${role} message`)
      setHistory((prev => [...prev, result.data as Chat]));
    }
  }, []);

  async function getAnwser(question: string) {
    // 1. VALIDATE QUESTION
    // 2. CREATE USER MESSAGE
    // 3. GET SYSTEM MESSAGE
    // 4. CREATE SYSTEM MESSAGE
    // 5. RETURN SYSTEM MESSAGE
    if (!question) return;

    await addHistory(question, ERoles.USER);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    const reader = response.body?.getReader();

    const decoder = new TextDecoder();

    let awnser = "";

    while (true) {
      const { done, value, ...rest } = await reader!.read();

      if (done) {
        await addHistory(awnser, ERoles.SYSTEM);

        setStream("");

        break;
      }

      awnser += decoder.decode(value);

      setStream(awnser);
    }
  }

  useEffect(() => {
    getAnwser(question);
  }, [question]);

  return (
    <Stack className="h-full p-2">
      <Box className="flex-grow overflow-y-auto">
        <AnwserBox stream={stream} history={history} />
      </Box>

      <QuestionBox setQuestion={setQuestion} />
    </Stack>
  );
};
