import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';

const Projects: React.FC = () => {
  return (
    <section className="projects-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <Link to="/" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="projects-content">
        <h1 className="section-title">Mes Projets</h1>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">
              <img src="/project1.jpg" alt="Project 1" />
            </div>
            <div className="project-info">
              <h3>Portfolio</h3>
              <p>Site web personnel développé avec React et TypeScript</p>
              <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>CSS</span>
              </div>
              <div className="project-links">
                <a href="#" className="project-link">Voir le site</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          </div>
          {/* Ajoutez d'autres projets ici */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
