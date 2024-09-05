import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TarotExperience from './TarotExperience';
import HotBar from './HotBar';
import CardImageUpload from './CardImageUpload';
import './App.css';

const App: React.FC = () => {
  const [selectedSpread, setSelectedSpread] = useState<string>('Three Card Spread');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <HotBar onSpreadChange={setSelectedSpread} />
              <TarotExperience selectedSpread={selectedSpread} />
            </>
          } />
          <Route path="/upload-images" element={<CardImageUpload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;