import { Grid } from "@mui/material";
import { Sidebar } from "./_components/sidebar/sidebar";
import { Header } from "./_components/header/header";
import { ProjectProvider } from "./_context";
import { projectRepository } from "@/database/repositories/project-repository";

type TProps = {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
};

export default async function ProjectDetailLayout({
  children,
  params,
}: TProps) {
  const project = await projectRepository.getById(params.projectId);

  return (
    <Grid container className="h-screen overflow-hidden">
      <Grid item xs={12}>
        <Header projectId={params.projectId} />
      </Grid>

      <Grid item xs={2} className="h-[calc(100vh-68px)]">
        <Sidebar />
      </Grid>

      <Grid item xs={10} className="h-[calc(100vh-68px)]">
        <ProjectProvider project={project}>{children}</ProjectProvider>
      </Grid>
    </Grid>
  );
}
