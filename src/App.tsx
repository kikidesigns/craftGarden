import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import TarotExperience from './TarotExperience'

function HotBar() {
  return (
    <div className="hot-bar">
      <Link to="/">Home</Link>
      <Link to="/tarot">Tarot</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
  )
}

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
        <HotBar />
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