"use client";

import React, { useMemo } from "react";
import { convertToRCTreeData } from "../../sourcecode.utils";
import Tree from "rc-tree";
import { Box } from "@mui/material";

type TProps = {
  sourceCode: string;
  onSelect: (path: string) => void;
};

export const SourceTree: React.FC<TProps> = ({ sourceCode, onSelect }) => {
  const treeData = useMemo(() => {
    if (!sourceCode) return [];

    try {
      const fileList = JSON.parse(sourceCode);

      return convertToRCTreeData(fileList);
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [sourceCode]);

  return (
    <Box>
      <Tree
        treeData={treeData}
        onSelect={(_, info) => {
            const path = info.node?.data?.path ?? '';

          onSelect(path);
        }}
        selectable
      />
    </Box>
  );
};
