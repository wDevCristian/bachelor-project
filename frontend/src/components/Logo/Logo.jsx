import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/joy";
import "./Logo.scss";

export default function Logo({ setMenuItem }) {
  return (
    <div className="logo">
      <Link
        onClick={() => setMenuItem("home")}
        style={{ textDecoration: "none" }}
        to="/"
      >
        <Typography level="h2" component="h1">
          ADAPTM
        </Typography>
      </Link>
    </div>
  );
}
