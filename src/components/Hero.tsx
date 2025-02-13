import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleMoonClick = () => {
    setIsLoginVisible(!isLoginVisible);
    if (!isLoginVisible) {
      setUsername('');
      setPassword('');
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setIsLoginVisible(false);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-stars"></div>
      <div className="hero-stars-2"></div>
      <div className="hero-stars-3"></div>
      <button 
        className="round-button" 
        onClick={handleMoonClick}
        aria-label="Round button"
      ></button>
      <div className={`login-form ${isLoginVisible ? 'visible' : ''}`}>
        <form onSubmit={handleSubmit} className="login-form-inner">
          <div className="login-inputs">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">→</button>
          </div>
          {error && <span className="login-error">{error}</span>}
        </form>
      </div>
      
      <div className="container">
        <div className="hero-content scroll-decoration">
          <h1 className="hero-title">Bienvenue dans mon univers</h1>
          
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
