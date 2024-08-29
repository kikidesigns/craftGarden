import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TarotExperience: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a simple cube as a placeholder for the tarot card
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Render the scene
    renderer.render(scene, camera);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)', marginTop: '60px' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
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
    </div>
  );
};

export default TarotExperience;