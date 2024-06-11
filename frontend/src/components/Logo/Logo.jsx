import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/joy";
import "./Logo.scss";
import { Context } from "../../main";

export default function Logo() {
  const { menuItemActive } = useContext(Context);

  return (
    <div className="logo">
      <Link
        onClick={() => {
          menuItemActive.setActiveItem("home");
        }}
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
