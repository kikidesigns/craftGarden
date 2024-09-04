import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import panoramicImage from './assets/panoramic.jpg';

const DebugBox: React.FC = () => {
  return (
    <mesh position={[0, 0, -2]}>
      <boxGeometry args={[2, 2, 2]} />
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

  return (
    <div style={{ 
      position: 'absolute', 
      top: `${hotbarHeight}px`, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: 'hidden',
      backgroundColor: 'blue'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Suspense fallback={<DebugBox />}>
          <Skybox />
        </Suspense>
        <DebugBox />
      </Canvas>
    </div>
  );
};

export default TarotExperience;