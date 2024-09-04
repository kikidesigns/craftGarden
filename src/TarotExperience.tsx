import React, { useState, useEffect } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';

interface CardPosition {
  x: number;
  y: number;
  z: number;
}

const TarotCard: React.FC<{ position: CardPosition }> = ({ position }) => {
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial color={0x800020} /> {/* Burgundy color */}
    </mesh>
  );
};

const Skybox: React.FC = () => {
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, '/assets/panoramic.jpg');
  
  useEffect(() => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(scene.renderer, texture);
    scene.background = rt.texture;
  }, [scene, texture]);

  return null;
};

const BlackCube: React.FC = () => {
  return (
    <mesh position={[0, -2, 0]}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color={0x000000} />
    </mesh>
  );
};

const RedPlane: React.FC = () => {
  return (
    <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  );
};

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);

  useEffect(() => {
    if (selectedSpread === 'Three Card Spread') {
      setCardPositions([
        { x: -2.5, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 2.5, y: 0, z: 0 },
      ]);
    } else if (selectedSpread === 'Celtic Cross') {
      setCardPositions([
        { x: 0, y: 0, z: 0 },      // Card 1: The Present
        { x: 0, y: 0, z: 0.01 },   // Card 2: The Challenge
        { x: 0, y: -2, z: 0 },     // Card 3: The Past
        { x: 0, y: 2, z: 0 },      // Card 4: The Future
        { x: -2, y: 0, z: 0 },     // Card 5: Above
        { x: 2, y: 0, z: 0 },      // Card 6: Below
        { x: 4, y: -2, z: 0 },     // Card 7: The Self
        { x: 4, y: 0, z: 0 },      // Card 8: External Influences
        { x: 4, y: 2, z: 0 },      // Card 9: Hopes and Fears
        { x: 4, y: 4, z: 0 },      // Card 10: The Outcome
      ]);
    }
  }, [selectedSpread]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Skybox />
        <BlackCube />
        <RedPlane />
        {cardPositions.map((position, index) => (
          <TarotCard key={index} position={position} />
        ))}
      </Canvas>
    </div>
  );
};

export default TarotExperience;