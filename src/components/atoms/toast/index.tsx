import { Snackbar, SnackbarProps } from "@mui/material";

export type TToastProps = SnackbarProps;

export const Toast: React.FC<TToastProps> = (props) => {
  return <Snackbar { ...props} />;
};