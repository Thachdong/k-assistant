import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/molecules/form-input";
import { FormSelect } from "@/components/molecules/form-select";
import { Box, Stack } from "@mui/material";
import { ECompletionType } from "@prisma/client";
import { useForm } from "react-hook-form";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type TProps = {
  containerWidth: string;
};

export type TSearchChatCompletion = {
  type?: ECompletionType;
  searchTerms?: string;
};

export const FillterChatCompletionForm: React.FC<TProps> = ({
  containerWidth,
}) => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<TSearchChatCompletion>({
    defaultValues: {
      type: ECompletionType.ADD_COMPONENT,
      searchTerms: "",
    },
  });

  const chatCompletionOptions = [
    { value: ECompletionType.ADD_COMPONENT, label: "ADD_COMPONENT" },
    { value: ECompletionType.ADD_STORYBOOK, label: "ADD_STORYBOOK" },
    { value: ECompletionType.ADD_UNIT_TEST, label: "ADD_UNIT_TEST" },
    { value: ECompletionType.REFACTOR_COMPONENT, label: "REFACTOR_COMPONENT" },
  ];

  const onSubmit = useCallback((data: TSearchChatCompletion) => {
    const pathname = `${window.location.pathname}?searchTerms=${data.searchTerms || ''}&type=${data.type}`;

    router.push(pathname);
  }, []);

  return (
    <Box
      sx={{ width: containerWidth }}
      className="fixed bg-white shadow-md rounded z-10 top-0 p-4"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" alignItems="center" gap={3}>
          <FormInput
            control={control}
            name="searchTerms"
            label="searching for ..."
            className="w-full"
          />
          <FormSelect
            control={control}
            name="type"
            label="Type"
            options={chatCompletionOptions}
            className="w-full"
          />
          <Box>
            <Button type="submit">
              <FilterAltIcon />
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};
