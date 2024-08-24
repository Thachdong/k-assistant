"use client"

import { Button } from "@/components/atoms/button";
import { useModal } from "@/hooks/useModal";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Spec } from "@prisma/client";
import { CreateTestcaseForm } from "../create-testcase-form";

type TProps = {
  specs: Spec[];
}

export const CreateTestcaseButton: React.FC<TProps> = ({ specs }) => {
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
              <CreateTestcaseForm onClose={onClose} specs={specs} />
            </DialogContent>
          </Box>
        </Dialog>
      </>
    );
}