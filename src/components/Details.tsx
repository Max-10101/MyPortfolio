import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Details.css';

const Details: React.FC = () => {
  return (
    <section className="details-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <Link to="/about" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="details-content">
        <h1 className="section-title">Qui suis-je ?</h1>
        <div className="details-grid">
          <div className="details-item">
            <h2>Mon Parcours</h2>
            <p>Découvrez mon parcours dans le développement web et ma passion pour la création d'interfaces innovantes.</p>
            <p>Je suis constamment en quête d'apprentissage et d'amélioration, cherchant à repousser les limites de ce qui est possible dans le développement web.</p>
          </div>
          <div className="details-item">
            <h2>Mes Compétences</h2>
            <div className="skills-categories">
              <div className="skills-category">
                <h3>Front-end</h3>
                <ul className="skills-list">
                  <li>React & TypeScript</li>
                  <li>HTML5 & CSS3</li>
                  <li>JavaScript ES6+</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div className="skills-category">
                <h3>Design</h3>
                <ul className="skills-list">
                  <li>UI/UX Design</li>
                  <li>Animations CSS</li>
                  <li>Design System</li>
                  <li>Prototypage</li>
                </ul>
              </div>
              <div className="skills-category">
                <h3>Outils</h3>
                <ul className="skills-list">
                  <li>Git & GitHub</li>
                  <li>VS Code</li>
                  <li>Figma</li>
                  <li>NPM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
