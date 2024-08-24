import { Box, Stack, Typography } from "@mui/material";
import { CreateProjectButton } from "./_components/create-project-modal";
import { ProjectTable } from "./_components/project-table";
import { projectRepository } from "@/database/repositories/project-repository";

export default async function ProjectPage() {
  const projects = await projectRepository.getAll();

  return (
    <Box sx={{ maxWidth: "lg", padding: "2rem 0", margin: "0 auto" }}>
      <Stack
        className="mb-4"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3" component="h1">
          Projects
        </Typography>

        <CreateProjectButton />
      </Stack>

      <ProjectTable projects={projects} />
    </Box>
  );
}
