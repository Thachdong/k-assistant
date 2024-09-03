"use client";

import { Grid } from "@mui/material";
import { ChatCompletion, Project } from "@prisma/client";
import { SourceTree } from "../source-tree";
import { useMemo } from "react";
import "./index.scss";
import { FileContent } from "../file-content";
import { useFileContent } from "../../hooks/useFileContent";
import { FileContentSkeleton } from "../drawing-box/file-content-skeleton";
import { CtaButtons } from "../cta-box/cta-buttons";

type TProps = {
  projectDetail: Project;
  chatCompletions: ChatCompletion[];
};

export const SourceCode: React.FC<TProps> = ({
  projectDetail,
  chatCompletions,
}) => {
  const { sourceCode } = projectDetail;

  const { loading, fileContent, onSelectFile, filePath } =
    useFileContent(projectDetail);

  const contentBox = useMemo(() => {
    if (loading) {
      return <FileContentSkeleton />;
    } else {
      return <FileContent filePath={filePath} fileContent={fileContent} />;
    }
  }, [fileContent, loading, filePath]);

  return (
    <Grid container className="h-full overflow-hidden">
      <Grid item xs={2} className="border-r h-full overflow-auto no-scrollbar">
        <SourceTree sourceCode={sourceCode} onSelect={onSelectFile} />
      </Grid>

      <Grid item xs={10} className="overflow-auto h-full no-scrollbar">
        {contentBox}

        <CtaButtons
          filePath={filePath}
          fileContent={fileContent}
          chatCompletions={chatCompletions}
          sourceCode={sourceCode}
          projectDetail={projectDetail}
        />
      </Grid>
    </Grid>
  );
};
