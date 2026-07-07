import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="portfolio-container">
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
