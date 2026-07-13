import React from "react";
import { 
  Code2, 
  Globe, 
  BrainCircuit, 
  ScanEye, 
  BarChart3, 
  Wrench 
} from "lucide-react";

function About() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 className="skill-icon" />,
      skills: ["Python (Advanced)", "SQL", "JavaScript", "TypeScript"],
    },
    {
      title: "Web & Full Stack",
      icon: <Globe className="skill-icon" />,
      skills: ["Django", "FastAPI", "Flask", "REST APIs", "React", "HTML", "CSS", "Vite", "MUI"],
    },
    {
      title: "ML/DL & AI",
      icon: <BrainCircuit className="skill-icon" />,
      skills: ["Scikit-learn", "TensorFlow", "PyTorch", "NLP", "Hugging Face", "LangChain", "RAG", "LLMs (Gemini, OpenAI)", "Prompt Engineering"],
    },
    {
      title: "Computer Vision",
      icon: <ScanEye className="skill-icon" />,
      skills: ["OpenCV", "YOLOv8", "Object Detection", "OCR"],
    },
    {
      title: "Data Science & Analytics",
      icon: <BarChart3 className="skill-icon" />,
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA", "Feature Engineering", "Data Preprocessing"],
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench className="skill-icon" />,
      skills: ["Git", "GitHub", "MySQL", "Jupyter", "VS Code", "Linux/Bash", "Agile Workflows"],
    }
  ];

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
          <h3 className="skills-title">Technical Expertise</h3>
          <div className="skills-grid">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="skill-category-card">
                <div className="skill-category-header">
                  <div className="skill-icon-wrapper">
                    {category.icon}
                  </div>
                  <h4 className="skill-category-title">{category.title}</h4>
                </div>
                <div className="skills-list">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
