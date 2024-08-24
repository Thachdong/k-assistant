"use client";
import { useModal } from "@/hooks/useModal";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import { Dialog, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { TAddComponent } from "../../add-component.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { addComponentSchema } from "../../add-component.schema";
import { FormInput } from "@/components/molecules/form-input";
import { Button } from "@/components/atoms/button";
import { useState } from "react";
import { UploadButton } from "@/components/atoms/upload-button";

type TProps = {
  onComponent: () => void;
};

export const AddComponentBtn: React.FC<TProps> = ({ onComponent }) => {
  const { control } = useForm<TAddComponent>({
    resolver: yupResolver(addComponentSchema),
  });

  const { open, onClose, onOpen } = useModal();

  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <FileCopyIcon onClick={onOpen} />

      <Dialog open={open} onClose={onClose}>
        <Typography variant="h4" className="text-center p-4">Add Component</Typography>

        <form className="w-[576px] px-4 py-8">
          <Stack spacing={4}>
            <FormInput
              control={control}
              name="componentName"
              label="Component Name"
            />

            <FormInput
              control={control}
              name="dependencies"
              label="Dependencies"
            />

            <FormInput control={control} name="design" label="Design" />

            <FormInput multiline rows={5} control={control} name="content" label="Content" />

            <UploadButton file={file} onFileChange={(file) => setFile(file)} />
          </Stack>
        </form>
      </Dialog>
    </>
  );
};
