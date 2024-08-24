"use client";
import { Button } from "@/components/atoms/button";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useState } from "react";
import { CreateProjectForm } from "../create-project-form";

export const CreateProjectButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button onClick={onOpen} variant="outlined">
        Create
      </Button>

      <Dialog open={open}>
        <Box sx={{ width: "576px"}}>
          <DialogTitle>Create Project</DialogTitle>

          <DialogContent>
            <CreateProjectForm onClose={onClose} />
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};
