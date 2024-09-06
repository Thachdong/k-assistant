"use client";
import { useCallback, useContext, useMemo } from "react";
import { useModal } from "@/hooks/useModal";
import { Dialog, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "@/components/molecules/form-input";
import { UploadButton } from "@/components/atoms/upload-button";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { addComponentSchema } from "../../../sourcecode.schema";
import { useFile } from "@/hooks/useFile";
import { Button } from "@/components/atoms/button";
import { FormSelect } from "@/components/molecules/form-select";
import { TAddComponent } from "../../../sourcecode.type";
import { ProjectContext } from "@/app/project/[projectId]/_context";

type TProps = {
  onComponent: (data: FormData) => Promise<void>;
};

export const AddComponentBtn: React.FC<TProps> = ({ onComponent }) => {
  const { project, getSelectedFile } = useContext(ProjectContext);

  const { sourceCode = "" } = project || {};

  const { control, handleSubmit } = useForm<TAddComponent>({
    resolver: yupResolver(addComponentSchema),
    defaultValues: {
      dependencies: [],
    },
  });

  const { open, onClose, onOpen } = useModal();

  const { file, onFileChange } = useFile();

  const onSubmit = useCallback(
    async (formState: TAddComponent) => {
      if (file) {
        const formData = new FormData();

        formData.append("design", file);

        formData.append("componentName", formState.componentName);

        formData.append("content", formState.content);

        const fileList = formState?.dependencies || [];

        const dependencies = await Promise.all(
          fileList.map(async (path) => {

            const content = await getSelectedFile?.(path, false);

            return content;
          })
        );

        formData.append("dependencies", JSON.stringify(dependencies));

        onComponent(formData);

        onClose();
      }
    },
    [file, onComponent]
  );

  const options = useMemo(() => {
    if (!sourceCode) return [];

    try {
      const fileList = JSON.parse(sourceCode);

      const components = fileList.filter(
        (file: any) => file.path.includes("/components") && file.type === "blob"
      );

      return components.map((file: any) => ({
        value: file.path,
        label: file.path,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [sourceCode]);

  return (
    <>
      <PostAddIcon onClick={onOpen} />

      <Dialog open={open} onClose={onClose}>
        <Typography variant="h4" className="text-center p-4">
          Add Component
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[576px] px-4 py-8">
          <Stack spacing={4}>
            <FormInput
              control={control}
              name="componentName"
              label="Component Name"
            />

            <FormSelect
              control={control}
              name="dependencies"
              label="Dependencies"
              options={options}
              multiple
            />

            <FormInput
              multiline
              rows={5}
              control={control}
              name="content"
              label="Content"
            />

            <UploadButton file={file} onFileChange={onFileChange} />

            <Stack direction="row-reverse" gap={3}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button
                onClick={onClose}
                type="button"
                variant="outlined"
                color="warning"
              >
                Close
              </Button>
            </Stack>
          </Stack>
        </form>
      </Dialog>
    </>
  );
};
