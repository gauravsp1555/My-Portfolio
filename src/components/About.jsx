import React from "react";

function About() {
  const skills = ["Python", "React", "NumPy", "Pandas", "AI/ML"];

  return (
    <section className="about-section" id="about">
      <h2 className="section-header">About Me</h2>
      <div className="about-card">
        <p className="about-text">
          I am a passionate Computer Engineering student in my final year, specializing in software development, 
          web applications, and data science. I love building responsive user interfaces and robust backends 
          to solve real-world problems.
        </p>
        
        <div className="skills-wrapper">
          <h3 className="skills-title">Core Skills</h3>
          <div className="skills-list">
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
