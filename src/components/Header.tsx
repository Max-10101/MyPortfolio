import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <Link to="/">Ice Porftolio</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/projects">Projets</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
