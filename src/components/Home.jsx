import React from "react";
import gauravImg from "../assets/gaurav.webp";

function Home() {
  return (
    <section className="hero-section" id="home">
      <div className="bg-glow-orb"></div>

      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge">Welcome to Logic world</div>
          <h1 className="hero-heading">Hi, I am Gaurav</h1>
          <p className="hero-desc">
            Full Stack Engineer | Python + React Developer
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Let's Connect</a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          <div className="hero-image-frame">
            <img src={gauravImg} alt="Gaurav" className="hero-avatar" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
