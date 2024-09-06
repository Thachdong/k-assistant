import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/molecules/form-input";
import { FormSelect } from "@/components/molecules/form-select";
import { Box, Stack } from "@mui/material";
import { ECompletionType } from "@prisma/client";
import { useForm } from "react-hook-form";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const type = searchParams.get("type") as ECompletionType | undefined;
  
  const searchTerms = searchParams.get("searchTerms") || '';

  const { control, handleSubmit, reset } = useForm<TSearchChatCompletion>({
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
    const params = new URLSearchParams();

    params.set("searchTerms", data?.searchTerms || '');

    params.set("type", data.type || '');

    window.history.pushState(null, '', `?${params.toString()}`)
  }, []);

  useEffect(() => {
    console.log(typeof searchTerms)
    reset({
      type: type || undefined,
      searchTerms,
    });
  }, [type, searchTerms]);

  return (
    <Box
      sx={{ width: containerWidth }}
      className="fixed bg-white shadow-md rounded z-10 top-0 right-0 p-4"
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
