import React, { useState } from "react";
import "./Header.scss";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";

export default function Header({ toAuthPage }) {
  const [menuItem, setMenuItem] = useState("home");

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Logo setMenuItem={setMenuItem} />
          <Navbar
            menuItem={menuItem}
            setMenuItem={setMenuItem}
            onPageChange={toAuthPage}
          />
        </div>
      </div>
    </header>
  );
}

{
}
