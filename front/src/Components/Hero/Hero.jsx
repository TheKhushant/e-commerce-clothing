import React from "react";
import "./Hero.css";
import arrowIcon from "../Assets/arrow.png"; // Correct path to arrow.png

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>URBAN EDGE</h1>
        <h2>
          Jackets for the
          <br />
          Modern Man
        </h2>
        <div className="hero-discovery-btn">
          <span>Discovery Now</span>
          <img src={arrowIcon} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
