import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <div className="hero-moon"></div>
      <div className="container">
        <div className="hero-content scroll-decoration">
          <h1 className="hero-title">Bienvenue dans mon univers</h1>
          <p className="hero-subtitle">Développeur passionné</p>
          <div className="hero-buttons">
            <Link to="/projects" className="dofus-button">Voir mes projets</Link>
            <Link to="/about" className="dofus-button">À propos de moi</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
