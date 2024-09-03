import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface TarotCard {
  id: number;
  name: string;
  // Add more properties as needed
}

const TAROT_CARDS: TarotCard[] = [
  // Add all 78 tarot cards here
  { id: 0, name: 'The Fool' },
  { id: 1, name: 'The Magician' },
  // ... add the rest of the cards
];

interface TarotDeckProps {
  onCardPicked: (card: TarotCard) => void;
}

const TarotDeck: React.FC<TarotDeckProps> = ({ onCardPicked }) => {
  const [remainingCards, setRemainingCards] = useState<TarotCard[]>(TAROT_CARDS);
  const meshRef = useRef<Mesh>(null);

  const pickCard = () => {
    if (remainingCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      const pickedCard = remainingCards[randomIndex];
      setRemainingCards(remainingCards.filter(card => card.id !== pickedCard.id));
      onCardPicked(pickedCard);
    }
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Rotate the deck
    }
  });

  return (
    <mesh ref={meshRef} onClick={pickCard} position={[0, 1, 0]}>
      <boxGeometry args={[1, 1.5, 0.5]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
};

export default TarotDeck;