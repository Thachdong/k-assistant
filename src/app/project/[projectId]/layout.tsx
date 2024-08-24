import { Grid } from "@mui/material";
import { Sidebar } from "./_components/sidebar/sidebar";
import { Header } from "./_components/header/header";

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
  return (
    <Grid container className="h-screen overflow-hidden">
      <Grid item xs={12}>
        <Header projectId={params.projectId} />
      </Grid>

      <Grid item xs={2} className="h-[calc(100vh-68px)]">
        <Sidebar />
      </Grid>

      <Grid item xs={10} className="h-[calc(100vh-68px)]">
        {children}
      </Grid>
    </Grid>
  );
}
