import { projectRepository } from "@/database/repositories/project-repository";
import { Grid } from "@mui/material";
import { SourceTree } from "./_components/source-tree";
import { Project } from "@prisma/client";
import { SourceCode } from "./_components/sourcecode";

type TProps = {
  params: {
    projectId: string;
  };
};
export default async function SourcecodePage({
  params: { projectId },
}: TProps) {
  const projectDetail = await projectRepository.getById(projectId);

  return (
    <SourceCode projectDetail={projectDetail as Project} />
  );
}
