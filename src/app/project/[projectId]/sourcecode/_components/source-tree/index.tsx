"use client";

import React, { useContext, useMemo } from "react";
import { convertToRCTreeData } from "../../sourcecode.utils";
import Tree from "rc-tree";
import { Box } from "@mui/material";
import { ProjectContext } from "../../../_context";

export const SourceTree: React.FC = () => {
  const { project, getSelectedFile } = useContext(ProjectContext);

  const { sourceCode } = project || {};

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
          const path = info.node?.data?.path ?? "";

          getSelectedFile?.(path, true);
        }}
        selectable
      />
    </Box>
  );
};
