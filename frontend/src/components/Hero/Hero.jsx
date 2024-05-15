import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/joy/Button";
import "../../common.scss";
import "./Hero.scss";

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <h2 className="hero-content__title">Imbrățișează Timișoara</h2>
          <p className="hero-content__description">
            Descoperă Timișoara in compania unor persoane dornice de a impărtăși
            frumosul cu tine.
          </p>
          <Button
            size="lg"
            variant="soft"
            color="warning"
            sx={{
              marginTop: "1.75rem",
            }}
            component="a"
            href="#about"
          >
            Despre noi
          </Button>
        </div>
      </div>
    </div>
  );
}
