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
    <Grid container>
      <Grid item xs={12}>
        <Header projectId={params.projectId} />
      </Grid>

      <Grid item xs={2}>
        <Sidebar />
      </Grid>

      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  );
}
