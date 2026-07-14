import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MouseTrail from "./components/MouseTrail";
import WebGLBackground from "./components/WebGLBackground";

function App() {
  return (
    <>
      <WebGLBackground />
      <div className="portfolio-container">
        <NavBar />
        <MouseTrail />
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
