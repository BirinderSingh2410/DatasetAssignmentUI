import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Loader() {
  const count = [1, 2, 3];
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}
    >
      {count.map((i) => (
        <Box
          sx={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "350px",
            flexWrap: "wrap",
          }}
          key={i}
        >
          <Skeleton variant="rectangular" width="100%" height={400} />
          <Skeleton width="100%" height={50} />
          <Skeleton width="100%" height={50} />
        </Box>
      ))}
    </Box>
  );
}

export default Loader;
