"use client";
import { useCallback } from "react";
import { useModal } from "@/hooks/useModal";
import { Dialog, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "@/components/molecules/form-input";
import BiotechIcon from "@mui/icons-material/Biotech";

import { addUnitTestSchema } from "../../../sourcecode.schema";
import { Button } from "@/components/atoms/button";
import { FormSelect } from "@/components/molecules/form-select";
import { TCreateUnitTest } from "../../../sourcecode.type";

const testRunnerOptions = [
  { value: "Jest", label: "Jest" },
  { value: "Mocha", label: "Mocha" },
  { value: "Jasmine", label: "Jasmine" },
  { value: "Cypress", label: "Cypress" },
  { value: "TestCafe", label: "TestCafe" },
];

const testUtilityOptions = [
  { value: "React Testing Library", label: "React Testing Library" },
  { value: "Enzyme", label: "Enzyme" },
  { value: "Chai", label: "Chai" },
  { value: "Supertest", label: "Supertest" },
  { value: "Cheerio", label: "Cheerio" },
];

type TProps = {
  onUnitTest: (data: TCreateUnitTest) => void;
};

export const UnitTestBtn: React.FC<TProps> = ({ onUnitTest }) => {
  const { control, handleSubmit } = useForm<TCreateUnitTest>({
    resolver: yupResolver(addUnitTestSchema),
  });

  const { open, onClose, onOpen } = useModal();

  const onSubmit = useCallback(
    async (formState: TCreateUnitTest) => {
      onUnitTest(formState);

      onClose();
    },
    [onUnitTest]
  );

  return (
    <>
      <BiotechIcon onClick={onOpen} />

      <Dialog open={open} onClose={onClose}>
        <Typography variant="h4" className="text-center p-4">
          Generate Unit Test
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[576px] px-4 py-8">
          <Stack spacing={4}>
            <FormSelect
              control={control}
              name="testRunner"
              label="Test Runner"
              options={testRunnerOptions}
            />

            <FormSelect
              control={control}
              name="testUtility"
              label="Test Utility"
              options={testUtilityOptions}
            />

            <FormSelect
              control={control}
              name="configFiles"
              label="configFiles"
              options={[]}
            />

            <FormInput
              multiline
              rows={5}
              control={control}
              name="instructions"
              label="Instructions"
            />

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
