import { Box, Skeleton } from "@mui/material";

export const FileContentSkeleton: React.FC = () => {
  return (
    <Box className="flex flex-col h-2/3 w-2/3 justify-around mx-auto">
      {new Array(10).fill(0).map((_, index) => (
        <Skeleton key={index} className="p-2" />
      ))}
    </Box>
  );
};
