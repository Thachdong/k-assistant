import { Select, TSelectProps } from "@/components/atoms/select";
import { TControllerProps } from "@/types/react-hook-form.type";
import { useCallback } from "react";
import {
  Controller,
} from "react-hook-form";

export type TFormSelect = Omit<TControllerProps, "render"> & TSelectProps;

export const FormSelect: React.FC<TFormSelect> = ({
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
        <Select
          {...inputProps}
          value={value}
          {...restField}
          error={invalid}
          errorMessage={error?.message}
        />
      );
    },
    [inputProps]
  );

  return <Controller control={control} name={name} render={render} />;
};
