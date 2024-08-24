"use client";

import { getRepoFileContent } from "@/utils/github.util";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";

type TProps = {
  projectDetail: Project;
  filePath: string;
};

export const FileContent: React.FC<TProps> = ({ projectDetail, filePath }) => {
  const [fileContent, setFileContent] = useState<string>("No file selected");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!filePath) return "";

      const credential = {
        owner: projectDetail.repoOwner,
        repo: projectDetail.repoName,
        branch: projectDetail.repoBranch,
        token: projectDetail.repoToken,
      };

      try {
        setLoading(true);

        const response = await getRepoFileContent(credential, filePath);

        setFileContent(response);
      } finally {
        setLoading(false);
      }
    })();
  }, [filePath]);

  if (loading) {
    return (
      <Box className="flex flex-col h-2/3 w-2/3 justify-around mx-auto">
        {new Array(10).fill(0).map((_, index) => (
          <Skeleton key={index} className="p-2" />
        ))}
      </Box>
    );
  }
  return (
    <Stack className="pl-2">
      {filePath && (
        <Typography className="p-2 border-b font-bold">
          path: {filePath}
        </Typography>
      )}

      <pre>{fileContent}</pre>
    </Stack>
  );
};
