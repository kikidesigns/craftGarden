import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import TarotExperience from './TarotExperience'

function HotBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const tarotSpreads = [
    "Three Card Spread",
    "Celtic Cross",
    "Horseshoe Spread",
    "Relationship Spread",
    "Career Path Spread"
  ];

  return (
    <div className="hot-bar">
      <div className="dropdown">
        <button onClick={() => setShowDropdown(!showDropdown)}>Tarot Spreads</button>
        {showDropdown && (
          <div className="dropdown-content">
            {tarotSpreads.map((spread, index) => (
              <a key={index} href="#">{spread}</a>
            ))}
          </div>
        )}
      </div>
      <span className="welcome-message">Welcome to Tarot Experience</span>
      <span className="jupiter-symbol">
        \\u2643
      </span>
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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tarot" element={
          <>
            <HotBar />
            <TarotExperience />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App