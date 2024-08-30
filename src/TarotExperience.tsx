import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
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
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Changed to yellow
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Create blue spheres for the selected tarot spread
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue color

    const positions = {
      "Three Card Spread": [
        { x: -1.5, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1.5, y: 0, z: 0 }
      ],
      "Celtic Cross": [
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: -1, z: 0 }
      ],
      "Horseshoe Spread": [
        { x: -1.5, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1.5, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: -1, z: 0 }
      ],
      "Relationship Spread": [
        { x: -1, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 }
      ],
      "Career Path Spread": [
        { x: -1.5, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1.5, y: 0, z: 0 }
      ]
    };

    const addSpheres = (spread: string) => {
      const spreadPositions = positions[spread];
      if (spreadPositions) {
        spreadPositions.forEach(pos => {
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          sphere.position.set(pos.x, pos.y, pos.z);
          scene.add(sphere);
        });
      }
    };

    addSpheres(selectedSpread);

    // Add skybox (placeholder)
    const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const skyboxMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }),
    ];
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
    scene.add(skybox);

    camera.position.set(5, 0, 5);
    camera.lookAt(0, 0, 0);

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [selectedSpread]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)', marginTop: '60px', display: 'flex', justifyContent: 'flex-start' }}>
      <div ref={mountRef} style={{ width: '80%', height: '100%' }} />
    </div>
  );
};

export default TarotExperience;