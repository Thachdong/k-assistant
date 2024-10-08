"use client";

import React, { useMemo, useRef } from "react";
import {
  SpeedDialAction,
  SpeedDialIcon,
  SpeedDial,
  Box,
  Typography,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import StyleIcon from "@mui/icons-material/Style";
import { ChatCompletion } from "@prisma/client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./index.scss";
import { useCtaButtonMethods } from "../../../hooks/useCtaButtonMethods";
import { useGenerateAction } from "../../../hooks/useGenerateAction";
import { AddComponentBtn } from "../add-component-btn";
import { CompletionList } from "../../drawing-box/completion-list";
import { UnitTestBtn } from "../unit-test-btn";
import { TCreateUnitTest } from "../../../sourcecode.type";

type TProps = {
  filePath: string;
  fileContent: string;
  chatCompletions: ChatCompletion[];
  sourceCode: string;
};

export const CtaButtons: React.FC<TProps> = ({
  filePath,
  fileContent,
  chatCompletions,
  sourceCode,
}) => {
  const chatCompletionContainerRef = useRef<HTMLDivElement>(null);

  const { handleOpenDrawer, speedDialModal, drawerModal } =
    useCtaButtonMethods();

  const { onRefactor, onStoryBook, onUnitTest, onComponent, currentAction } =
    useGenerateAction({ handleOpenDrawer });

  const actions = useMemo(
    () => [
      { icon: <OpenWithIcon onClick={handleOpenDrawer} />, name: "Open" },
      {
        icon: (
          <AddComponentBtn sourceCode={sourceCode} onComponent={onComponent} />
        ),
        name: "Add Component",
      },
      {
        icon: (
          <UnitTestBtn
            onUnitTest={(data: TCreateUnitTest) =>
              onUnitTest(filePath, fileContent, data)
            }
          />
        ),
        name: "Unit Test",
      },
      {
        icon: <UpdateIcon onClick={() => onRefactor(filePath, fileContent)} />,
        name: "Refactor",
      },
      {
        icon: <StyleIcon onClick={() => onStoryBook(filePath, fileContent)} />,
        name: "StoryBook",
      },
    ],
    [onRefactor, filePath, fileContent, onStoryBook]
  );

  const currentActionBox = useMemo(() => {
    if (currentAction) {
      chatCompletionContainerRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      return (
        <Box className="border rounded">
          <Typography className="bg-black text-white border-b p-3">
            {currentAction?.prompt}
          </Typography>

          <Markdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            className="whitespace-pre-wrap py-2 px-3 mb-3"
          >
            {currentAction?.stream}
          </Markdown>
        </Box>
      );
    }
  }, [currentAction]);

  return (
    <>
      <Box
        className="source-code-cta-buttons"
        sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon onClick={speedDialModal.toggle} />}
          open={speedDialModal.open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>

      <CompletionList
        chatCompletions={chatCompletions}
        drawerModal={drawerModal}
        chatCompletionContainerRef={chatCompletionContainerRef}
      >
        {currentActionBox}
      </CompletionList>
    </>
  );
};
