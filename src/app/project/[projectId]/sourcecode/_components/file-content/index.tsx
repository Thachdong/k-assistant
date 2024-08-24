"use client";

import { Stack, Typography } from "@mui/material";
import React from "react";

type TProps = {
  filePath: string;
  fileContent: string;
};

export const FileContent: React.FC<TProps> = ({
  filePath,
  fileContent
}) => {
  return (
    <Stack className="relative h-full pl-2 py-4">
      <Stack className="sticky bg-white top-0">
        {filePath && (
          <Typography className="p-2 border-b font-bold">
            path: {filePath}
          </Typography>
        )}
      </Stack>

      <pre className="whitespace-pre-wrap">{fileContent}</pre>
    </Stack>
  );
};
