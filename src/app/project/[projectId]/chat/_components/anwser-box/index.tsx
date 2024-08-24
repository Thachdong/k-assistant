"use client";
import { Stack } from "@mui/material";
import React from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import "./index.scss";
import { Chat } from "@prisma/client";

type TProps = {
  stream: string;
  history: Chat[];
};

export const AnwserBox: React.FC<TProps> = ({ stream, history }) => {

  return (
    <Stack className="anwser-box">
      {history.map((item) => (
        <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className="whitespace-pre-wrap border rounded w-2/3 py-2 px-3 mb-3" key={item.id}>
          {item.message}
        </Markdown>
      ))}

      {stream && (
        <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className="whitespace-pre-wrap border rounded w-2/3 py-2 px-3 mb-3">{stream}</Markdown>
      )}
    </Stack>
  );
};
