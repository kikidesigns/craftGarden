import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import TarotExperience from './TarotExperience';

function HotBar({ setSelectedSpread }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [astroSymbol, setAstroSymbol] = useState('');

  const tarotSpreads = [
    "Three Card Spread",
    "Celtic Cross"
  ];

  useEffect(() => {
    const updateAstroSymbol = () => {
      const day = new Date().getDay();
      const symbols = {
        0: '☉', // Sun (Sunday)
        1: '☽', // Moon (Monday)
        2: '♂', // Mars (Tuesday)
        3: '☿', // Mercury (Wednesday)
        4: '♃', // Jupiter (Thursday)
        5: '♀', // Venus (Friday)
        6: '♄', // Saturn (Saturday)
      };
      setAstroSymbol(symbols[day]);
    };

    updateAstroSymbol();
    const timer = setInterval(updateAstroSymbol, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

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
      <span 
        className="astro-symbol" 
        title="Daily Astrological Symbol"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginLeft: 'auto',
          marginRight: '20px'
        }}
      >
        {astroSymbol}
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