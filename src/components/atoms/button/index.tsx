import { Button as BsButton, ButtonProps } from "@mui/material";

export type TButtonProps = ButtonProps & {
  loading?: boolean;
};

export const Button: React.FC<TButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <BsButton disabled={loading} {...rest}>
      {loading ? "loading ..." : children}
    </BsButton>
  );
};
