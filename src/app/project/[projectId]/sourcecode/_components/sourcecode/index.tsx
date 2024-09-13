"use client";

import { Grid } from "@mui/material";
import { SourceTree } from "../source-tree";
import { useContext, useMemo } from "react";
import "./index.scss";
import { FileContent } from "../file-content";
import { useFileContent } from "../../hooks/useFileContent";
import { FileContentSkeleton } from "../drawing-box/file-content-skeleton";
import { CtaButtons } from "../cta-box/cta-buttons";
import { ProjectContext } from "../../../_context";

export const SourceCode: React.FC = () => {
  const { project, loading } = useContext(ProjectContext);

  const { fileContent, filePath } = useFileContent(project);

  const contentBox = useMemo(() => {
    if (loading) {
      return <FileContentSkeleton />;
    } else {
      return <FileContent />;
    }
  }, [fileContent, loading, filePath]);

  return (
    <Grid container className="h-full overflow-hidden">
      <Grid item xs={2} className="border-r h-full overflow-auto no-scrollbar">
        <SourceTree />
      </Grid>

      <Grid item xs={10} className="overflow-auto h-full no-scrollbar">
        {contentBox}

        <CtaButtons />
      </Grid>
    </Grid>
  );
};
