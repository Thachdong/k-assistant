import { projectRepository } from "@/database/repositories/project-repository";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { Button } from "@/components/atoms/button";

type TProps = {
  projectId: string;
};
export async function Header({ projectId }: TProps) {
  const projectDetail = await projectRepository.getById(projectId);

  return (
    <Stack spacing={2} direction="row" className="border-b p-4">
      <Box className="w-1/4 border-r">
        <Link href="/project">
          <Button>
            <FirstPageIcon /> Back
          </Button>
        </Link>
      </Box>
      <Typography className="w-1/4 border-r">
        Project Name: {projectDetail?.title}
      </Typography>
      <Typography className="w-1/4 border-r">
        Repo Name: {projectDetail?.repoName}
      </Typography>
      <Typography>Owner: {projectDetail?.repoOwner}</Typography>
    </Stack>
  );
}
