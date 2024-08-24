"use client";
import { Design } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Box } from "@mui/material";
import Link from "next/link";

type TProps = {
  designs: Design[];
};

export const DesignTable: React.FC<TProps> = ({ designs }) => {
  const columns: GridColDef<Design>[] = useMemo(
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
        field: "file",
        headerName: "FILE PATH",
        flex: 1,
        sortable: false,
        renderCell: (params) => <Link href={params.value}>{params.value}</Link>,
      },
      {
        field: "createdAt",
        headerName: "CREATED AT",
        flex: 1,
        sortable: false,
      }
    ],
    [designs]
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={designs}
        columns={columns}
      />
    </Box>
  );
};
