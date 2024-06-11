import React from "react";

import { IconButton } from "@mui/joy";

import { KeyboardArrowUpOutlined as KeyboardArrowUpOutlinedIcon } from "@mui/icons-material";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function ScrollButton() {
  return (
    <IconButton
      variant="outlined"
      color="neutral"
      sx={{
        position: "fixed",
        bottom: 80,
        right: 35,
        zIndex: 30,
        backgroundColor: "white",
      }}
      onClick={scrollToTop}
    >
      <KeyboardArrowUpOutlinedIcon />
    </IconButton>
  );
}
