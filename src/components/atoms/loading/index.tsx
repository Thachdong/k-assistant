import { CircularProgress, CircularProgressProps } from "@mui/material";

export const Loading: React.FC<CircularProgressProps> = (props) => {
    return <CircularProgress {...props} />;
};