import { TModal } from "@/hooks/useModal";
import { Box, Chip, Drawer, Stack, Typography } from "@mui/material";
import { ChatCompletion, ECompletionType } from "@prisma/client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Resizable, ResizeCallback } from "re-resizable";
import { FillterChatCompletionForm } from "../fillter-chat-completion-form";
import { getChatCompletionAction } from "../../../sourcecode.action";
import { useSearchParams } from "next/navigation";

type TProps = {
  children?: ReactNode;
  drawerModal: TModal;
  chatCompletionContainerRef: React.RefObject<HTMLDivElement>
};

type TSettings = {
  width: string;
};

type TCompletionCardSettings = {
  id: string;
  isCollapse: boolean;
};

const defautSettings: TSettings = {
  width: "750px",
};

export const CompletionList: React.FC<TProps> = ({
  drawerModal,
  children,
  chatCompletionContainerRef
}) => {
  const [settings, setSettings] = useState<TSettings>(defautSettings);

  const [completionCardSettings, setCompletionCardSettings] = useState<
    TCompletionCardSettings[]
  >([]);

  const [completions, setCompletions] = useState<ChatCompletion[]>([]);

  const searchParams = useSearchParams();

  const searchTerms = searchParams.get('searchTerms') || '';

  const type = searchParams.get('type') as ECompletionType;

  // #region -- callbacks
  const handleCollapse = useCallback(
    (id: string) => {
      const index = completionCardSettings.findIndex((item) => item.id === id);

      if (index === -1) {
        setCompletionCardSettings((prev) => [
          ...prev,
          { id, isCollapse: true },
        ]);
      } else {
        setCompletionCardSettings((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isCollapse: !item.isCollapse } : item
          )
        );
      }
    },
    [completionCardSettings]
  );

  const checkIsCardCollapse = useCallback(
    (id: string) => {
      const index = completionCardSettings.findIndex((item) => item.id === id);

      if (index === -1) {
        return false;
      }

      return completionCardSettings[index].isCollapse;
    },
    [completionCardSettings]
  );

  const renderChatCompletion = useCallback(
    (chatCompletion: ChatCompletion) => {
      const isCollapse = checkIsCardCollapse(chatCompletion.id);

      const anwserHeight = isCollapse ? "" : "125px";

      const controlText = isCollapse ? "Hide Answer" : "Show Answer";
      return (
        <Box key={chatCompletion.id} className="border rounded mb-3">
          <Box className="border-b bg-gray-300 p-3">
            <Typography className="mb-3">
              <strong>Completion Type: </strong>
              {chatCompletion.type}
            </Typography>

            <Typography className="truncate mb-3">
              <strong>Prompt: </strong>
              {chatCompletion.prompt}
            </Typography>

            <Typography className="text-sm">
              <strong>Created at: </strong>
              {chatCompletion.createdAt?.toDateString()}
            </Typography>
          </Box>

          <Box
            sx={{ height: anwserHeight }}
            className="relative overflow-hidden"
          >
            <Markdown
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              className="whitespace-pre-wrap rounded py-2 px-3 mb-3"
            >
              {chatCompletion.answer}
            </Markdown>

            <Chip color="primary" onClick={() => handleCollapse(chatCompletion.id)} label={controlText} className="absolute bottom-2 right-2 z-10" />
          </Box>
        </Box>
      );
    },
    [handleCollapse, checkIsCardCollapse]
  );

  const handleResize: ResizeCallback = useCallback((...params) => {
    const container = params[2] as HTMLElement;

    const width = container.style.width;

    setSettings((prev) => ({ ...prev, width }));
  }, []);
  // #endregion

  // #region -- memos
  const emptyCompletion = useMemo(() => {
    if (completions.length === 0) {
      return (
        <Box className="text-center p-3">
          <Typography>No completions found</Typography>
        </Box>
      );
    }
  }, [completions]);
  // #endregion

  // #region -- side effects
  useEffect(() => {
    (async() => {
      const result = await getChatCompletionAction(searchTerms, type ?? undefined);

      if (result.success) [
        setCompletions(result.data as ChatCompletion [])
      ]
    })();
  }, [])
  // #endregion
  return (
    <Drawer
      open={drawerModal.open}
      onClose={drawerModal.onClose}
      anchor="right"
    >
      <Resizable onResize={handleResize} className="overflow-hidden">
        <Stack
          sx={{ width: settings.width }}
          className="overflow-auto p-3 pt-20"
          gap={4}
        >
          <FillterChatCompletionForm containerWidth={settings.width} />

          {emptyCompletion}

          {completions.map(renderChatCompletion)}

          {children}
          {/* scroll to bottom target */}
          <Box ref={chatCompletionContainerRef}></Box>
        </Stack>
      </Resizable>
    </Drawer>
  );
};
