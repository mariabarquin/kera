import React from "react";
import heroVideo from "../assets/video_kera.mp4"; 

function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video-bg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
        Tu navegador no soporta vídeos en HTML5.
      </video>

      <div className="hero-content">
        <p className="hero-label">KERA — NATURAL COSMETICS</p>

        <h1>
          Formulas made
          <br />
          with intention.
        </h1>

        <p className="hero-text">
          Thoughtfully crafted skincare inspired by the origin of every
          ingredient.
        </p>

        <a href="#products" className="hero-button">
          EXPLORE OUR FORMULAS
        </a>
      </div>
    </section>
  );
}

export default Hero;