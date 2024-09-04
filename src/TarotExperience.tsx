import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import panoramicImage from './assets/panoramic.jpg';

const DebugBox: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  );
};

const Skybox: React.FC = () => {
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, panoramicImage, 
    undefined, 
    (error) => {
      console.error('An error occurred while loading the texture:', error);
    }
  );
  
  useEffect(() => {
    if (texture) {
      console.log('Texture loaded successfully');
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(scene.renderer, texture);
      scene.background = rt.texture;
    }
  }, [scene, texture]);

  return null;
};

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
  console.log('Rendering TarotExperience with spread:', selectedSpread);

  const hotbarHeight = 60; // Adjust this value to match your hotbar's actual height

  return (
    <div style={{ 
      position: 'absolute', 
      top: `${hotbarHeight}px`, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: 'hidden'
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