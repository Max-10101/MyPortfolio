import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <Link to="/" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="contact-content">
        <h1 className="section-title">Contact</h1>
        <div className="contact-grid">
          <div className="contact-form">
            <h2>Envoyez-moi un message</h2>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Nom" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" rows={6} required></textarea>
              </div>
              <button type="submit" className="submit-button">Envoyer</button>
            </form>
          </div>
          <div className="contact-info">
            <h2>Autres moyens de contact</h2>
            <div className="contact-links">
              <a href="mailto:votre@email.com" className="contact-link">
                <i className="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href="https://linkedin.com/in/votre-profil" className="contact-link">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/votre-profil" className="contact-link">
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
