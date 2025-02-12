import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <Link to="/">Ice Portfolio</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/projects">Projets</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isAuthenticated && (
              <>
                <li><Link to="/admin">Admin</Link></li>
                <li><button onClick={logout} className="logout-button">Logout</button></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
