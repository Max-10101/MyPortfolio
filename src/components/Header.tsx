import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <h1>Portfolio</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#about">À propos</a></li>
            <li><a href="#skills">Compétences</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
