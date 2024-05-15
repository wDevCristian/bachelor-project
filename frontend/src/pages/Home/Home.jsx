import React from "react";
import Hero from "../../components/Hero/Hero";
import "../../common.scss";
import "./Home.scss";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="about container" id="about">
        <div className="about-content">
          <div className="about-content__text">
            <h2 className="about-content__title">Despre noi</h2>
            <p className="about-content__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              illum voluptatem debitis cumque ducimus quia ullam consectetur,
              sint pariatur ipsum ipsam, totam, commodi eveniet quis laudantium
              quaerat maiores quidem! Accusamus aperiam vitae totam harum ex
              quam pariatur assumenda, commodi deserunt.
            </p>
          </div>
          <img src="./src/assets/img/about-img.jpeg" alt="about" />
        </div>
      </div>
    </>
  );
}
