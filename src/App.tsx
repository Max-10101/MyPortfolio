import React, { useEffect } from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Details from './components/Details'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

import './styles/global.css'
import './App.css'

const App: React.FC = () => {
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      document.body.classList.add('home');
    } else {
      document.body.classList.remove('home');
    }
  }, []);

  useEffect(() => {
    // Créer les étoiles
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    // Ajouter des étoiles scintillantes
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.setProperty('--twinkle-duration', `${Math.random() * 3 + 1}s`);
      starsContainer.appendChild(star);
    }

    // Ajouter des étoiles filantes
    const addShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 50}%`;
      starsContainer.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 3000);
    };

    // Créer une étoile filante toutes les 8 secondes
    const shootingStarInterval = setInterval(addShootingStar, 8000);

    return () => {
      clearInterval(shootingStarInterval);
      starsContainer.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <div className="sky"></div>
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="moon"></div>
        <div className="moon-crescent"></div>
        <div className="mountain"></div>
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/details" element={<Details />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
