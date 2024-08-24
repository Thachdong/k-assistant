'use client'
import { FormInput } from "@/components/molecules/form-input";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { TCreateProjectForm } from "../../project.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "../../project.schema";
import { Stack } from "@mui/material";
import { Button } from "@/components/atoms/button";
import { createProjectAction } from "../../project.action";

type TProps = {
  onClose: () => void;
};

// const author = "Thachdong";
// const token = "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";
// const repo = "ESTI_V2";
// const branch = "main";

export const CreateProjectForm: React.FC<TProps> = ({ onClose }) => {
  const { control, handleSubmit, formState } = useForm<TCreateProjectForm>({
    resolver: yupResolver(createProjectSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(async(data: TCreateProjectForm) => {
    await createProjectAction(data);

    onClose();
  }, [])

  console.log('formState', formState);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        justifyContent="center"
        sx={{ padding: "1rem" }}
      >
        <FormInput label="Project Title" name="title" control={control} />

        <FormInput
          label="Github Repository"
          name="repoName"
          control={control}
        />

        <FormInput label="Github Owner" name="repoOwner" control={control} />

        <FormInput label="Github Branch" name="repoBranch" control={control} />

        <FormInput label="Github Token" name="repoToken" control={control} />

        <FormInput
          label="Project Description"
          name="description"
          multiline
          rows={5}
          control={control}
        />

        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button loading={formState.isSubmitting} type="button" variant="outlined" color="warning" onClick={onClose}>
            Cancel
          </Button>

          <Button loading={formState.isSubmitting} type="submit" variant="contained">Create</Button>
        </Stack>
      </Stack>
    </form>
  );
};
