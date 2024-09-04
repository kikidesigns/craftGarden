import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import panoramicImage from './assets/panoramic.jpg';

const TarotCard: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial color={0x800020} /> {/* Burgundy color */}
    </mesh>
  );
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

const Skybox: React.FC = () => {
  const { scene } = useThree();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      panoramicImage,
      (texture) => {
        console.log('Texture loaded successfully');
        try {
          const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
          rt.fromEquirectangularTexture(scene.renderer, texture);
          scene.background = rt.texture;
        } catch (err) {
          console.error('Error creating cube render target:', err);
          setError('Failed to create skybox');
        }
      },
      undefined,
      (err) => {
        console.error('Error loading texture:', err);
        setError('Failed to load skybox texture');
      }
    );
  }, [scene]);

  if (error) {
    return <Environment preset="sunset" background />;
  }

  return null;
};

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
  console.log('Rendering TarotExperience with spread:', selectedSpread);
  console.log('Panoramic image path:', panoramicImage);

  const hotbarHeight = 60;
  const [cardPositions, setCardPositions] = useState<[number, number, number][]>([]);

  useEffect(() => {
    if (selectedSpread === 'Three Card Spread') {
      setCardPositions([
        [-2.5, 0, 0],
        [0, 0, 0],
        [2.5, 0, 0],
      ]);
    } else if (selectedSpread === 'Celtic Cross') {
      setCardPositions([
        [0, 0, 0],      // Card 1: The Present
        [0, 0, 0.01],   // Card 2: The Challenge
        [0, -2, 0],     // Card 3: The Past
        [0, 2, 0],      // Card 4: The Future
        [-2, 0, 0],     // Card 5: Above
        [2, 0, 0],      // Card 6: Below
        [4, -2, 0],     // Card 7: The Self
        [4, 0, 0],      // Card 8: External Influences
        [4, 2, 0],      // Card 9: Hopes and Fears
        [4, 4, 0],      // Card 10: The Outcome
      ]);
    }
  }, [selectedSpread]);

  return (
    <div style={{ 
      position: 'absolute', 
      top: `${hotbarHeight}px`, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: 'hidden',
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Skybox />
        </Suspense>
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