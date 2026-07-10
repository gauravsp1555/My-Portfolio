import React, { useEffect, useRef, useState } from "react";

// Scroll reveal wrapper component
function RevealCard({ children }) {
  const cardRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target); // Only trigger once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`reveal-card ${isIntersecting ? "reveal-visible" : "reveal-hidden"}`}
    >
      {children}
    </div>
  );
}

function Experience() {
  // SVG Logos Custom Designed directly in code
  const qSpidersLogo = (
    <svg className="company-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#f97316" fillOpacity="0.1" stroke="#f97316" strokeWidth="4" />
      <path d="M50 20C40 35 40 65 50 80" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 20C60 35 60 65 50 80" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 50C35 40 65 40 80 50" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 50C35 60 65 60 80 50" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="10" fill="#f97316" />
    </svg>
  );

  const techTechLogo = (
    <svg className="company-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="90" height="90" rx="20" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="4" />
      <path d="M30 35H70M50 35V75" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
      <path d="M40 45H60M50 45V65" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  const sureTrustLogo = (
    <svg className="company-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="4" />
      <path d="M50 25C50 25 30 45 30 60C30 71 39 80 50 80C61 80 70 71 70 60C70 45 50 25 50 25Z" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="4" />
      <path d="M50 40V70" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 55C45 52 50 55 50 55" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
      <path d="M62 55C55 52 50 55 50 55" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  const experiences = [
    {
      company: "Tech Tech",
      companyFull: "Tech Tech",
      type: "Present Internship",
      duration: "June 2025 – Present",
      durationDetail: "Active",
      location: "India · On-site",
      link: "https://www.techtech.in/",
      logo: techTechLogo,
      isNested: false,
      role: "Application Intern",
      descriptionList: [
        "Assist in testing and monitoring software applications to ensure smooth performance.",
        "Provide basic technical support to users and help resolve application-related issues.",
        "Document bugs, errors, and system issues, and report them to the development team.",
        "Support application installation, configuration, and maintenance activities."
      ],
      skills: ["Software Testing", "Technical Support", "Bug Tracking", "App Configuration", "Maintenance"]
    },
    {
      company: "QSpiders",
      companyFull: "QSpiders - Software Testing Training Institute",
      type: "Completed Internship",
      duration: "Feb 2026 – Jun 2026",
      durationDetail: "5 mos",
      location: "Pune Magarpatta IT Park · On-site",
      link: "https://www.qspiders.com/",
      logo: qSpidersLogo,
      isNested: false,
      role: "Full Stack Developer With Data Analytics",
      description: "Full stack development with React frontend, backend microservices, and data analytics workflows.",
      skills: ["React.js", "Python", "Data Science", "SQL", "Software Testing", "REST APIs"]
    },
    {
      company: "SURE Trust",
      companyFull: "SURE Trust",
      type: "Completed Internship",
      duration: "Nov 2025 – Apr 2026",
      durationDetail: "6 mos",
      location: "India · Remote",
      link: "https://www.suretrustforruralyouth.com/",
      logo: sureTrustLogo,
      isNested: false,
      role: "Airtificial Intelligence & Machine Learning",
      description: "Python programming, EDA, ML workflows, project management tasks.",
      skills: ["Python", "Machine Learning", "Data Analysis", "NumPy", "Pandas", "Scikit-Learn"]
    },
    {
      company: "NIK Enterprises Limited",
      companyFull: "NIK Enterprises Limited",
      type: "Completed Internship",
      duration: "Aug 2022 – Oct 2022",
      durationDetail: "3 mos",
      location: "Jalgaon, Maharashtra, India · On-site",
      link: null,
      logo: null,
      isNested: false,
      role: "Junior Frontend Developer",
      description: "Developed Result Management System using MySQL, HTML, CSS, JS, PHP.",
      skills: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "UI/UX Design"]
    }
  ];

  // SVG briefcase fallback icon
  const briefcaseIcon = (
    <svg className="exp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );

  return (
    <section className="experience-section" id="experience">
      <div className="experience-header-wrapper">
        <h2 className="experience-section-header">Work Experience</h2>
        <p className="experience-section-subtitle">
          My professional journey and internships in software development, AI/ML, and tech support
        </p>
      </div>

      <div className="experience-timeline-container">
        <div className="timeline-line"></div>

        {experiences.map((exp, idx) => (
          <div className="timeline-item" key={idx}>
            {/* Timeline node marker */}
            <div className="timeline-node">
              <div className="node-glow"></div>
              {briefcaseIcon}
            </div>

            {/* Timeline content card wrapped in Scroll Reveal */}
            <RevealCard>
              <div className="experience-card">
                <div className="card-top-accent"></div>

                {/* Company Logo and Header Info */}
                <div className="exp-card-header">
                  <div className="exp-header-left">
                    {exp.logo ? (
                      <div className="exp-company-logo-wrapper">
                        {exp.logo}
                      </div>
                    ) : (
                      <div className="exp-company-logo-wrapper no-logo">
                        <span>{exp.company.substring(0, 2)}</span>
                      </div>
                    )}

                    <div className="exp-title-group">
                      <h3 className="exp-role">
                        <span className="meta-emoji">👨‍💻</span> {exp.role}
                      </h3>
                      <h4 className="exp-company">
                        {exp.companyFull}
                        <span className="exp-type-badge">{exp.type}</span>
                      </h4>
                    </div>
                  </div>

                  <div className="exp-meta-group">
                    <div className="exp-meta-item">
                      <span className="meta-emoji">⏳</span>
                      <span>{exp.duration} <span className="duration-pill">{exp.durationDetail}</span></span>
                    </div>
                    <div className="exp-meta-item">
                      <span className="meta-emoji">📍</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="exp-card-body">
                  {exp.description && <p className="exp-desc">{exp.description}</p>}

                  {exp.descriptionList && (
                    <ul className="exp-desc-list">
                      {exp.descriptionList.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Skills Tags */}
                  {exp.skills && (
                    <div className="exp-skills-tags">
                      {exp.skills.map((skill, kIdx) => (
                        <span className="exp-skill-tag" key={kIdx}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Clickable Company Website Link */}
                {exp.link && (
                  <div className="exp-card-footer">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-company-link"
                    >
                      Visit Company Website
                      <svg className="link-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </RevealCard>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
