import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import TarotExperience from './TarotExperience';

function HotBar({ setSelectedSpread }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const tarotSpreads = [
    "Three Card Spread",
    "Celtic Cross"
  ];

  return (
    <div className="hot-bar">
      <div className="dropdown">
        <button onClick={() => setShowDropdown(!showDropdown)}>Tarot Spreads</button>
        {showDropdown && (
          <div className="dropdown-content">
            {tarotSpreads.map((spread, index) => (
              <a key={index} href="#" onClick={() => setSelectedSpread(spread)}>{spread}</a>
            ))}
          </div>
        )}
      </div>
      <span className="jupiter-symbol">
        \\u2643
      </span>
    </div>
  );
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
  );
}

function App() {
  const [selectedSpread, setSelectedSpread] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tarot" element={
          <>
            <HotBar setSelectedSpread={setSelectedSpread} />
            <TarotExperience selectedSpread={selectedSpread} />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;