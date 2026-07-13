import React from "react";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MouseTrail from "./components/MouseTrail";

function App() {
  return (
    <div className="portfolio-container">
      <NavBar />
      <MouseTrail />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
