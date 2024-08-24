"use client";
import { Project } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

type TProps = {
  projects: Project[];
};

export const ProjectTable: React.FC<TProps> = ({ projects }) => {
  const router = useRouter();

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 1, sortable: false },
      { field: "title", headerName: "TITLE", flex: 1, sortable: false },
      {
        field: "description",
        headerName: "DESCRIPTION",
        flex: 1,
        sortable: false,
      },
      {
        field: "repoOwner",
        headerName: "SOURCE OWNER",
        flex: 1,
        sortable: false,
      },
      {
        field: "repoBranch",
        headerName: "SOURCE BRANCH",
        flex: 1,
        sortable: false,
      },
      {
        field: "repoName",
        headerName: "REPOSITORY NAME",
        flex: 1,
        sortable: false,
      },
    ],
    [projects]
  );

  const navigateToProject = useCallback((id: string) => {
    router.push(`/project/${id}/sourcecode`);
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={projects}
        columns={columns}
        onRowDoubleClick={({ id }) => {
          navigateToProject(id.toString()); 
        }}
      />
    </Box>
  );
};
