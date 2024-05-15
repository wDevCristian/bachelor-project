import React from "react";
import "./Header.scss";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";

export default function Header({ toAuthPage }) {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Logo />
          <Navbar onPageChange={toAuthPage} />
        </div>
      </div>
    </header>
  );
}

{
}
