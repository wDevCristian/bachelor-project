import React from "react";

// MUI components
import Sheet from "@mui/joy/Sheet";

export default function Footer() {
  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{
        position: "absolute",
        bottom: "0px",
        padding: "2em 0",
        textAlign: "center",
        width: "100%",
      }}
    >
      © ADAPTM 2024
    </Sheet>
  );
}
