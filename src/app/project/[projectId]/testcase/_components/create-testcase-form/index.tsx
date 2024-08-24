"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import { Stack } from "@mui/material";
import { FormInput } from "@/components/molecules/form-input";
import { Button } from "@/components/atoms/button";
import { Spec } from "@prisma/client";
import { TCreateTestcase } from "../../testcase.type";
import { createTestcaseSchema } from "../../testcase.schema";
import { FormSelect } from "@/components/molecules/form-select";
import { createTestcaseAction } from "../../testcase.action";

type TProps = {
  onClose: () => void;
  specs: Spec[];
};

export const CreateTestcaseForm: React.FC<TProps> = ({
  onClose,
  specs,
}) => {

  const { control, handleSubmit, formState } = useForm<TCreateTestcase>({
    resolver: yupResolver(createTestcaseSchema),
  });

  const onSubmit = useCallback(
    async (data: TCreateTestcase) => {
      await createTestcaseAction(data);

      onClose();
    },
    []
  );

  const specOptions = useMemo(
    () =>
      specs.map(({ id, title }) => ({
        value: id,
        label: title,
      })),
    [specs]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} justifyContent="center" sx={{ padding: "1rem" }}>
        <FormSelect label="Spec" control={control} name="specId" options={specOptions} />

        <FormInput label="Title" name="title" control={control} />

        <FormInput
          label="Description"
          name="description"
          multiline
          rows={5}
          control={control}
        />

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
