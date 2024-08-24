import { Backdrop, CircularProgress } from "@mui/material";

export default async function PageLoading() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
