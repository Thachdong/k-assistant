"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Generate } from "@prisma/client";
import React, { useCallback, useState } from "react";

type TProps = {
  generates: Generate[];
};

export const GeneratedBox: React.FC<TProps> = ({ generates }) => {
  console.log(generates);

  const renderItem = useCallback((item: Generate) => {
    return (
      <Box key={item.id}>
        <Typography>
          Refactor component: <strong>{item.componentName}</strong>
        </Typography>

        <Typography>Result: {item.answer}</Typography>
      </Box>
    );
  }, []);

  return <Stack>{generates.map(renderItem)}</Stack>;
};
