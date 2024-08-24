import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export type TInputProps = TextFieldProps;

export const Input: React.FC<TInputProps> = (props) => {
    return <TextField size="small" {...props} />;
}