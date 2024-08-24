"use client"

import { Button } from "@/components/atoms/button";
import { useModal } from "@/hooks/useModal";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateSpecForm } from "../create-spec-form";

type TProps = {

}

export const CreateSpecButton: React.FC<TProps> = () => {
    const { open, onOpen, onClose } = useModal();

    return (
      <>
        <Button onClick={onOpen} variant="outlined">
          Create
        </Button>
  
        <Dialog open={open}>
          <Box sx={{ width: "576px"}}>
            <DialogTitle>Create Spec</DialogTitle>
  
            <DialogContent>
              <CreateSpecForm onClose={onClose} />
            </DialogContent>
          </Box>
        </Dialog>
      </>
    );
}