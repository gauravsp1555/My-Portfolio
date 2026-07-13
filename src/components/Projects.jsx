import React from "react";
import { ExternalLink, Code } from "lucide-react";
import todoImg from "../assets/todo.png";
import resumeImg from "../assets/resume.png";
import newsImg from "../assets/news.png";

function Projects() {
  const projects = [
    {
      title: "To‑Do App – React + Hooks",
      description: "A functional and aesthetic To-Do list application built with React and Hooks for managing daily tasks efficiently.",
      image: todoImg,
      link: "https://github.com/gauravsp1555/React-Todo-App",
      tags: ["React", "Hooks", "CSS"]
    },
    {
      title: "AI Resume Analyzer",
      description: "An intelligent tool that analyzes resumes using AI to provide insights, scoring, and improvement suggestions.",
      image: resumeImg,
      link: "https://github.com/gauravsp1555/AI_RESUME_ANALYZER-",
      tags: ["AI", "Python", "NLP"]
    },
    {
      title: "AI News Anchor",
      description: "A virtual news anchor application powered by AI that can synthesize news articles into video presentations.",
      image: newsImg,
      link: "https://github.com/gauravsp1555/AI_New_Anchor",
      tags: ["AI", "Video Synthesis", "API"]
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-header">I Make Incredible Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  <ExternalLink size={20} />
                  <span>View Project</span>
                </a>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span className="project-tag" key={i}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-github-link">
                  <Code size={20} />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
