"use client";

import { Grid } from "@mui/material";
import { Project } from "@prisma/client";
import { SourceTree } from "../source-tree";
import { useCallback, useState } from "react";
import "./index.scss";
import { FileContent } from "../file-content";

type TProps = {
  projectDetail: Project;
};

export const SourceCode: React.FC<TProps> = ({ projectDetail }) => {
  const { sourceCode } = projectDetail;

  const [filePath, setFilePath] = useState<string>("");

  const onSelect = useCallback((path: string) => {
    setFilePath(path);
  }, []);

  return (
    <Grid container className="h-screen overflow-hidden">
      <Grid item xs={2} className="border-r h-full overflow-auto no-scrollbar">
        <SourceTree sourceCode={sourceCode} onSelect={onSelect} />
      </Grid>

      <Grid item xs={10} className="h-full overflow-auto no-scrollbar">
        <FileContent projectDetail={projectDetail} filePath={filePath} />
      </Grid>
    </Grid>
  );
};
