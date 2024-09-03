import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Create a yellow box (tarot deck)
    const deckGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const deckMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.set(3, 3, 0); // Move to upper right
    scene.add(deck);

    // Create three burgundy boxes for the three card spread
    const cardGeometry = new THREE.BoxGeometry(1, 1.5, 0.1);
    const cardMaterial = new THREE.MeshBasicMaterial({ color: 0x800020 }); // Burgundy color

    const threeCardSpread = new THREE.Group();
    const card1 = new THREE.Mesh(cardGeometry, cardMaterial);
    card1.position.set(-2, 0, 0);
    const card2 = new THREE.Mesh(cardGeometry, cardMaterial);
    card2.position.set(0, 0, 0);
    const card3 = new THREE.Mesh(cardGeometry, cardMaterial);
    card3.position.set(2, 0, 0);
    threeCardSpread.add(card1, card2, card3);
    scene.add(threeCardSpread);

    // Create a forest green sphere for the Celtic cross
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Forest green color
    const celticCross = new THREE.Mesh(sphereGeometry, sphereMaterial);
    celticCross.position.set(0, -2, 0);
    scene.add(celticCross);

    // Add skybox
    const skyboxGeometry = new THREE.SphereGeometry(500, 60, 40);
    const skyboxMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/panoramic.jpg'),
      side: THREE.BackSide
    });
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    camera.position.z = 5;

    // Function to update visibility based on selected spread
    const updateSpreadVisibility = () => {
      threeCardSpread.visible = selectedSpread === 'Three Card Spread';
      celticCross.visible = selectedSpread === 'Celtic Cross';
    };

    updateSpreadVisibility();

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
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

export default TarotExperience;