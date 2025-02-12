import React from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Details from './components/Details'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/global.css'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/details" element={<Details />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
