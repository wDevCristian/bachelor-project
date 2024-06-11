import { Box, Typography } from "@mui/joy";
import React from "react";

export default function NoPageError() {
  return (
    <Box marginTop={40} textAlign="center">
      <Typography level="h1" component="p" fontSize={56}>
        404
      </Typography>
      <Typography level="body-lg" component="p">
        Page not found
      </Typography>
    </Box>
  );
}
