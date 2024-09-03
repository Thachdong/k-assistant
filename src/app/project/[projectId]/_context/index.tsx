"use client";
import { getRepoFileContent } from "@/utils/github.util";
import { Project } from "@prisma/client";
import { createContext, ReactNode, useCallback, useState } from "react";

type TSelectedFile = {
  path: string;
  content: string;
};

export type TProjectContext = {
  project: Project | null;
  loading: boolean;
  selectedFile?: TSelectedFile;
  getSelectedFile?: (path: string, isSync: boolean) => Promise<TSelectedFile | null>;
};

const defaultContextValue: TProjectContext = {
  project: null,
  loading: false
}

const ProjectContext = createContext<TProjectContext>(defaultContextValue);

const ProjectProvider = ({
  children,
  project,
}: {
  children: ReactNode;
  project: Project | null;
}) => {
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<TSelectedFile>();

  const getSelectedFile = useCallback(async (path: string, isSync?: boolean) => {
    if (!path || !project) return null;

    const credential = {
      owner: project.repoOwner,
      repo: project.repoName,
      branch: project.repoBranch,
      token: project.repoToken,
    };

    try {
      setLoading(true);

      const response = await getRepoFileContent(credential, path);

      const file = {
        path,
        content: response
      }

      isSync && setSelectedFile(file);

      return file;
    } finally {
      setLoading(false);

      return null
    }
  }, []);

  return (
    <ProjectContext.Provider value={{ project, loading, selectedFile, getSelectedFile }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
