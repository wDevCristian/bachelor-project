import React from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

export default function Logo() {
  return (
    <div className="logo">
      <Link style={{ textDecoration: "none" }} to="/">
        <h1>ADAPTM</h1>
      </Link>
    </div>
  );
}
