import { Input, TInputProps } from "@/components/atoms/input";
import { TControllerProps } from "@/types/react-hook-form.type";
import { useCallback } from "react";
import {
  Controller,
} from "react-hook-form";

export type TFormInput = Omit<TControllerProps, "render"> & TInputProps;

export const FormInput: React.FC<TFormInput> = ({
  control,
  name,
  ...inputProps
}) => {
  const render: TControllerProps["render"] = useCallback(
    (params) => {
      const {
        field: { value = '', ref, ...restField },
        fieldState: { invalid, error },
      } = params;

      return (
        <Input
          {...inputProps}
          value={value}
          {...restField}
          error={invalid}
          helperText={error?.message}
        />
      );
    },
    [inputProps]
  );

  return <Controller control={control} name={name} render={render} />;
};
