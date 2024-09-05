import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import TarotExperience from './TarotExperience';
import CardImageUpload from './CardImageUpload';

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
    <div className="hot-bar" style={{ fontFamily: 'Garamond, serif' }}>
      <span 
        className="astro-symbol" 
        title="Daily Astrological Symbol"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginLeft: '20px',
          marginRight: 'auto'
        }}
      >
        {astroSymbol}
      </span>
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
      <Link to="/upload-images" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        backgroundColor: '#555',
        borderRadius: '50%',
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
      }}>
        ✏️
      </Link>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="galaxy" style={{ fontFamily: 'Garamond, serif' }}>
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
      <div style={{ fontFamily: 'Garamond, serif' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tarot" element={
            <>
              <HotBar setSelectedSpread={setSelectedSpread} />
              <TarotExperience selectedSpread={selectedSpread} />
            </>
          } />
          <Route path="/upload-images" element={<CardImageUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;