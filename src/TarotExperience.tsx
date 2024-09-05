import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import panoramicImage from './assets/panoramic.jpg';

const TarotCard: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.02]} />
      <meshStandardMaterial color={0x800020} /> {/* Burgundy color */}
    </mesh>
  );
};

const BlackCube: React.FC = () => {
  return (
    <mesh position={[0, -3.5, 0]}>
      <boxGeometry args={[10, 3, 10]} />
      <meshStandardMaterial color={0x000000} />
    </mesh>
  );
};

const GroundPlane: React.FC = () => {
  return (
    <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={0x8B4513} /> {/* Brown color */}
    </mesh>
  );
};

const GrayBox: React.FC = () => {
  return (
    <mesh position={[-4, -1.9, -4]}>
      <boxGeometry args={[1, 0.5, 1.5]} />
      <meshStandardMaterial color={0x808080} /> {/* Gray color */}
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

  const [cardPositions, setCardPositions] = useState<[number, number, number][]>([]);

  useEffect(() => {
    if (selectedSpread === 'Three Card Spread') {
      setCardPositions([
        [-2.5, -1.98, 0],
        [0, -1.98, 0],
        [2.5, -1.98, 0],
      ]);
    } else if (selectedSpread === 'Celtic Cross') {
      setCardPositions([
        [0, -1.98, 0],      // Card 1: The Present
        [0, -1.97, 0],      // Card 2: The Challenge (slightly above Card 1)
        [0, -1.98, -2],     // Card 3: The Past
        [0, -1.98, 2],      // Card 4: The Future
        [-2, -1.98, 0],     // Card 5: Above
        [2, -1.98, 0],      // Card 6: Below
        [4, -1.98, -2],     // Card 7: The Self
        [4, -1.98, 0],      // Card 8: External Influences
        [4, -1.98, 2],      // Card 9: Hopes and Fears
        [4, -1.98, 4],      // Card 10: The Outcome
      ]);
    }
  }, [selectedSpread]);

  return (
    <div style={{ 
      position: 'absolute', 
      top: '60px', // Adjusted to account for the HotBar
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: 'hidden',
    }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Skybox />
        </Suspense>
        <BlackCube />
        <GroundPlane />
        <GrayBox />
        {cardPositions.map((position, index) => (
          <TarotCard key={index} position={position} />
        ))}
      </Canvas>
    </div>
  );
};

export default TarotExperience;