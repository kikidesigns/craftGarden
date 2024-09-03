import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TarotDeck from './components/TarotDeck';

interface TarotCard {
  id: number;
  name: string;
  // Add more properties as needed
}

interface CardPosition {
  x: number;
  y: number;
  z: number;
}

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);

  useEffect(() => {
    // Define card positions based on the selected spread
    if (selectedSpread === 'Three Card Spread') {
      setCardPositions([
        { x: -2, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
      ]);
    } else if (selectedSpread === 'Celtic Cross') {
      setCardPositions([
        { x: 0, y: 0, z: 0 },     // Card 1: The Present
        { x: 0, y: 0, z: 0.01 },  // Card 2: The Challenge
        { x: 0, y: -2, z: 0 },    // Card 3: The Past
        { x: 0, y: 2, z: 0 },     // Card 4: The Future
        { x: -2, y: 0, z: 0 },    // Card 5: Above
        { x: 2, y: 0, z: 0 },     // Card 6: Below
        { x: 4, y: -2, z: 0 },    // Card 7: The Self
        { x: 4, y: 0, z: 0 },     // Card 8: External Influences
        { x: 4, y: 2, z: 0 },     // Card 9: Hopes and Fears
        { x: 4, y: 4, z: 0 },     // Card 10: The Outcome
      ]);
    }
    setDrawnCards([]);
  }, [selectedSpread]);

  const handleCardPicked = (card: TarotCard) => {
    if (drawnCards.length < cardPositions.length) {
      setDrawnCards([...drawnCards, card]);
    }
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 60px)', marginTop: '60px' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <TarotDeck onCardPicked={handleCardPicked} />
        {drawnCards.map((card, index) => (
          <AnimatedCard
            key={card.id}
            card={card}
            targetPosition={cardPositions[index]}
          />
        ))}
        <Skybox />
      </Canvas>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontSize: '24px',
        zIndex: 10
      }}>
        Welcome to the Tarot Experience!
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: 'white',
        fontSize: '18px',
        zIndex: 10
      }}>
        Selected Spread: {selectedSpread}
      </div>
    </div>
  );
};

const AnimatedCard: React.FC<{ card: TarotCard; targetPosition: CardPosition }> = ({ card, targetPosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState<[number, number, number]>([6, 4, 0]);

  useFrame(() => {
    if (meshRef.current) {
      const newPosition = meshRef.current.position.lerp(
        new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z),
        0.05
      );
      setPosition([newPosition.x, newPosition.y, newPosition.z]);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial color={0x800020} /> {/* Burgundy color */}
    </mesh>
  );
};

const Skybox: React.FC = () => {
  const { scene } = useThree();
  const loader = new THREE.TextureLoader();

  useEffect(() => {
    const texture = loader.load('/panoramic.jpg', () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(scene.renderer, texture);
      scene.background = rt.texture;
    });

    return () => {
      texture.dispose();
    };
  }, [scene, loader]);

  return null;
};

export default TarotExperience;