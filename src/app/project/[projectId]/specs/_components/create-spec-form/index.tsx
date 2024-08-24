"use client";

import { useForm } from "react-hook-form";
import { TCreateSpec } from "../../spec.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSpecSchema } from "../../spec.schema";
import { useCallback, useState } from "react";
import { Input, Stack, Typography } from "@mui/material";
import { FormInput } from "@/components/molecules/form-input";
import { Button } from "@/components/atoms/button";
import { createSpecAction } from "../../spec.action";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type TProps = {
  onClose: () => void;
  projectId: string;
};

export const CreateSpecForm: React.FC<TProps> = ({ onClose, projectId }) => {
  const { control, handleSubmit, formState } = useForm<TCreateSpec>({
    resolver: yupResolver(createSpecSchema),
  });

  const [file, setFile] = useState<File | null>(null);

  const onSubmit = useCallback(
    async (data: TCreateSpec) => {
      const formdata = new FormData();

      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("file", file as Blob);
      formdata.append("projectId", projectId);

      await createSpecAction(formdata);

      onClose();
    },
    [file, projectId]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setFile(file);
      }
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} justifyContent="center" sx={{ padding: "1rem" }}>
        <FormInput label="Title" name="title" control={control} />

        <FormInput
          label="Description"
          name="description"
          multiline
          rows={5}
          control={control}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          <Typography>{file ? file.name : "Upload file"}</Typography>

          <VisuallyHiddenInput type="file" onChange={handleFileChange} accept=".xlsx" />
        </Button>

        

        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button
            loading={formState.isSubmitting}
            type="button"
            variant="outlined"
            color="warning"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            loading={formState.isSubmitting}
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
