import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import TarotExperience from './TarotExperience'

function LandingPage() {
  return (
    <div className="galaxy">
      <div className="galaxy-content">
        <h1>Welcome to My Galaxy</h1>
        <p>Explore the stars and beyond!</p>
        <Link to="/tarot">
          <button>Enter</button>
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tarot" element={<TarotExperience />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App