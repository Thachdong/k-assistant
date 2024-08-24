"use client";
import { Spec } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TProps = {
  specs: Spec[];
};

export const SpecTable: React.FC<TProps> = ({ specs }) => {
  const columns: GridColDef<Spec>[] = useMemo(
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
    [specs]
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={specs}
        columns={columns}
      />
    </Box>
  );
};
