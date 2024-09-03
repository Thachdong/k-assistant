"use client";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Testcase } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

type TProps = {
  testcase: Testcase;
};

export const TestcaseCard: React.FC<TProps> = ({ testcase }) => {
  const router = useRouter();

  const isSuccessful = useMemo(
    () => testcase.status === "SUCCESS",
    [testcase.status]
  );

  return (
    <Card>
      <CardHeader title={testcase.title} className="border-b" />

      <CardContent className="pb-0">
        <Typography className="mb-4">
          Description: {testcase.description}
        </Typography>

        <Typography className="mb-4">SpecId: {testcase.specId}</Typography>

        <Stack direction="row" spacing={2}>
          <Typography className="text-sm">
            Created at:
            {testcase.createdAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false, // Use `true` for 12-hour format, `false` for 24-hour format
            })}{" "}
            {testcase.createdAt.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Typography>

          <Typography className="text-sm">
            Updated at:{" "}
            {testcase.updatedAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false, // Use `true` for 12-hour format, `false` for 24-hour format
            })}{" "}
            {testcase.updatedAt.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Typography>
        </Stack>

        <CardActions className="justify-between pb-0">
          <Button>{testcase.status}</Button>
          <Button disabled={isSuccessful} onClick={() => router.refresh()}>
            Check
          </Button>
          <a href={testcase?.file as string}>
            <Button disabled={!isSuccessful}>Download</Button>
          </a>
        </CardActions>
      </CardContent>
    </Card>
  );
};
