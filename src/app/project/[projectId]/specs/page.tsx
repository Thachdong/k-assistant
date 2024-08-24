import { Box, Stack, Typography } from "@mui/material";
import { CreateSpecButton } from "./_components/create-spec-button";
import { specRepository } from "@/database/repositories/spec-repository";
import { SpecTable } from "./_components/spec-table";

export default async function SpecsPage() {
  const specs = await specRepository.findMany();

  return (
    <Box className="p-3">
      <Stack className="mb-3" direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" component="h1">
          Specs
        </Typography>

        <CreateSpecButton />
      </Stack>

      <SpecTable specs={specs} />
    </Box>
  );
}
