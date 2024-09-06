"use client";

import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ProjectContext } from "../../../_context";

export const FileContent: React.FC = () => {
  const { selectedFile } = useContext(ProjectContext);

  const { path = '', content = '' } = selectedFile || {};

  return (
    <Stack className="relative h-full pl-2 py-4">
      <Stack className="sticky bg-white top-0">
        {path && (
          <Typography className="p-2 border-b font-bold">
            path: {path}
          </Typography>
        )}
      </Stack>

      <pre className="whitespace-pre-wrap">{content}</pre>
    </Stack>
  );
};
