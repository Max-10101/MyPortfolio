import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content scroll-decoration">
          <h1 className="hero-title">Bienvenue dans mon univers</h1>
          <p className="hero-subtitle">Développeur passionné</p>
          <div className="hero-buttons">
            <button className="dofus-button">Voir mes projets</button>
            <button className="dofus-button">Me contacter</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
