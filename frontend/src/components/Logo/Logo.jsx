import React from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

export default function Logo({ setMenuItem }) {
  return (
    <div className="logo">
      <Link
        onClick={() => setMenuItem("home")}
        style={{ textDecoration: "none" }}
        to="/"
      >
        <h1>ADAPTM</h1>
      </Link>
    </div>
  );
}
