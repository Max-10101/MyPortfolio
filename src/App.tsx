import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/global.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
