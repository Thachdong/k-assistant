import { designRepository } from "@/database/repositories/design-repository";
import { Box, Stack, Typography } from "@mui/material";
import { CreateDesignButton } from "./_components/create-design-button";
import { DesignTable } from "./_components/design-table";

type TProps = {
  params: {
    projectId: string;
  };
};
export default async function DesignPage({ params }: TProps) {
  const designs = await designRepository.getAll();

  return (
    <Box className="p-3">
      <Stack
        className="mb-3"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3" component="h1">
          Design
        </Typography>

        <CreateDesignButton projectId={params.projectId} />
      </Stack>

      <DesignTable designs={designs} />
    </Box>
  );
}
