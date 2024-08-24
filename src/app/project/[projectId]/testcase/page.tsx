import { Box, Grid, Stack, Typography } from "@mui/material";
import { specRepository } from "@/database/repositories/spec-repository";
import { CreateTestcaseButton } from "./_components/create-testcase-button";
import { testcaseRepository } from "@/database/repositories/testcase-repository";
import { TestcaseCard } from "./_components/testcase-card";

export default async function TestcasePage() {
  const specs = await specRepository.findMany();

  const testcases = await testcaseRepository.findMany();

  return (
    <Box className="p-3">
      <Stack
        className="mb-3"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3" component="h1">
          Testcases
        </Typography>

        <CreateTestcaseButton specs={specs} />
      </Stack>

      <Grid container>
        {testcases.map((testcase) => (
          <Grid key={testcase.id} item xs={12} sm={6} className="p-4">
            <TestcaseCard testcase={testcase} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
