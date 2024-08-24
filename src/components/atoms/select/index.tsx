import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  SelectProps,
} from "@mui/material";
import MuiSelect from "@mui/material/Select";
import React, { useMemo } from "react";

export type TSelectProps = SelectProps & {
  options: {
    value: string | number;
    label: string;
  }[];
  label: string;
  errorMessage?: string;
};

export const Select: React.FC<TSelectProps> = ({
  options,
  label,
  errorMessage,
  ...selectProps
}) => {
  const selectItems = useMemo(
    () =>
      options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      )),
    [options]
  );

  return (
    <FormControl size="small" fullWidth error={!!errorMessage}>
      <InputLabel id={selectProps.id}>{label}</InputLabel>

      <MuiSelect labelId={selectProps.id} label={label} {...selectProps}>
        {selectItems}
      </MuiSelect>

      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
