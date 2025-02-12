import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <section className="about-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <Link to="/" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="about-content">
        <h1 className="section-title">À Propos de Moi</h1>
        <div className="about-grid">
          <div className="about-item">
            <h2>Qui suis-je ?</h2>
            <p>Un développeur passionné par la création d'expériences web uniques et immersives.</p>
            <Link to="/details" className="details-button">En savoir plus</Link>
          </div>
          <div className="about-item">
            <h2>Mes Projets</h2>
            <p>Découvrez mes réalisations et les technologies que j'utilise pour donner vie à mes idées.</p>
            <Link to="/projects" className="details-button">Voir les projets</Link>
          </div>
          <div className="about-item">
            <h2>Contact</h2>
            <p>Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter de vos projets.</p>
            <Link to="/contact" className="details-button">Me contacter</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
