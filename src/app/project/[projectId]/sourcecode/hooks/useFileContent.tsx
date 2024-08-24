import { getRepoFileContent } from "@/utils/github.util";
import { Project } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export const useFileContent = (projectDetail : Project) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [fileContent, setFileContent] = useState<string>("No file selected");

  const [filePath, setFilePath] = useState<string>("");

  const onSelectFile = useCallback((path: string) => {
    setFilePath(path);
  }, [setFilePath]);

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

  return { loading, fileContent, onSelectFile, filePath };
};
