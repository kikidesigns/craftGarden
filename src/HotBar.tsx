import React from 'react';
import { Link } from 'react-router-dom';

interface HotBarProps {
  onSpreadChange: (spread: string) => void;
}

const HotBar: React.FC<HotBarProps> = ({ onSpreadChange }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 20px',
    }}>
      <button onClick={() => onSpreadChange('Three Card Spread')}>Three Card Spread</button>
      <button onClick={() => onSpreadChange('Celtic Cross')}>Celtic Cross</button>
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
      }}>
        ✏️
      </Link>
    </div>
  );
};

export default HotBar;