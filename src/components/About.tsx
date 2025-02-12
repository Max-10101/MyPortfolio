import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <section className="about-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <Link to="/" className="back-button">
        <span className="back-arrow">←</span> Retour
      </Link>
      <div className="container">
        <div className="about-content scroll-decoration">
          <h1 className="section-title">À Propos de Moi</h1>
          <div className="about-grid">
            <div className="about-item">
              <h2>Qui suis-je ?</h2>
              <p>Un développeur passionné par la création d'expériences web uniques et immersives.</p>
            </div>
            <div className="about-item">
              <h2>Mes Compétences</h2>
              <ul className="skills-list">
                <li>Développement Front-end (React, TypeScript)</li>
                <li>Design UI/UX</li>
                <li>Animations et Interactions</li>
                <li>Performance Web</li>
              </ul>
            </div>
            <div className="about-item">
              <h2>Mon Parcours</h2>
              <p>Découvrez mon parcours dans le développement web et ma passion pour la création d'interfaces innovantes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
