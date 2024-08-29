import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import TarotExperience from './TarotExperience'

function LandingPage() {
  return (
    <div className="galaxy">
      <h1>Welcome to My Galaxy</h1>
      <p>Explore the stars and beyond!</p>
      <Link to="/tarot">
        <button>Enter</button>
      </Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tarot" element={<TarotExperience />} />
      </Routes>
    </Router>
  )
}

export default App