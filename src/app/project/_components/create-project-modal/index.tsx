"use client";
import { Button } from "@/components/atoms/button";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateProjectForm } from "../create-project-form";
import { useModal } from "@/hooks/useModal";

export const CreateProjectButton: React.FC = () => {
  const { open, onOpen, onClose } = useModal();
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
