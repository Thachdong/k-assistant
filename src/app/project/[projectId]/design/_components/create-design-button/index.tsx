"use client"

import { Button } from "@/components/atoms/button";
import { useModal } from "@/hooks/useModal";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateSpecForm } from "../create-design-form";

type TProps = {
  projectId: string;
}

export const CreateDesignButton: React.FC<TProps> = ({ projectId }) => {
    const { open, onOpen, onClose } = useModal();

    return (
      <>
        <Button onClick={onOpen} variant="outlined">
          Create
        </Button>
  
        <Dialog open={open}>
          <Box sx={{ width: "576px"}}>
            <DialogTitle>Create Design</DialogTitle>
  
            <DialogContent>
              <CreateSpecForm onClose={onClose} projectId={projectId} />
            </DialogContent>
          </Box>
        </Dialog>
      </>
    );
}