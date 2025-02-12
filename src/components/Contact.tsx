import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Préparer le sujet et le corps du message
    const subject = encodeURIComponent(`Message de ${formData.name} via Portfolio`);
    const body = encodeURIComponent(
      `Message de: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `${formData.message}`
    );

    // Ouvrir Gmail dans une nouvelle fenêtre avec les informations pré-remplies
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=mchoiselle@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );

    // Réinitialiser le formulaire
    setFormData({ name: '', email: '', message: '' });
  };

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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom" 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message" 
                  rows={6} 
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Envoyer via Gmail
              </button>
            </form>
          </div>
          <div className="contact-info">
            <h2>Autres moyens de contact</h2>
            <div className="contact-links">
              <div className="contact-link email-container">
                <i className="fas fa-envelope"></i>
                <span className="typing-container">
                  <span className="default-text">Email</span>
                  <span className="hover-content">
                    {'mchoiselle@gmail.com'.split('').map((char, index) => (
                      <span 
                        key={index} 
                        className="typing-letter"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
              <a href="https://linkedin.com/in/votre-profil" className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Max-10101" className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
                <span className="typing-container">
                  <span className="default-text">GitHub</span>
                  <span className="hover-content">
                    {'Max-10101'.split('').map((char, index) => (
                      <span 
                        key={index} 
                        className="typing-letter"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
