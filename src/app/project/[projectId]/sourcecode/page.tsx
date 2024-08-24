import { projectRepository } from "@/database/repositories/project-repository";
import { Grid } from "@mui/material";
import { SourceTree } from "./_components/source-tree";
import { ECompletionType, Project } from "@prisma/client";
import { SourceCode } from "./_components/sourcecode";
import { chatCompletionRepository } from "@/database/repositories/chat-completion-repository";

type TProps = {
  params: {
    projectId: string;
  };
  searchParams: {
    searchTerms: string;
    type: string;
  };
};
export default async function SourcecodePage({
  params: { projectId },
  searchParams,
}: TProps) {
  const projectDetail = await projectRepository.getById(projectId);

  const chatCompletions = await chatCompletionRepository.search({
    searchTerms: searchParams.searchTerms,
    type: searchParams.type as ECompletionType,
  });

  return (
    <SourceCode
      projectDetail={projectDetail as Project}
      chatCompletions={chatCompletions}
    />
  );
}
