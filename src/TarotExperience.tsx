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
    deck.position.set(6, 4, 0); // Move to upper right
    scene.add(deck);

    // Create card geometry and material
    const cardGeometry = new THREE.BoxGeometry(1, 1.5, 0.1);
    const cardMaterial = new THREE.MeshBasicMaterial({ color: 0x800020 }); // Burgundy color

    // Function to create a card
    const createCard = (x: number, y: number, z: number) => {
      const card = new THREE.Mesh(cardGeometry, cardMaterial);
      card.position.set(x, y, z);
      return card;
    };

    // Create Three Card Spread
    const threeCardSpread = new THREE.Group();
    threeCardSpread.add(createCard(-2, 0, 0));
    threeCardSpread.add(createCard(0, 0, 0));
    threeCardSpread.add(createCard(2, 0, 0));
    scene.add(threeCardSpread);

    // Create Celtic Cross Spread
    const celticCross = new THREE.Group();
    celticCross.add(createCard(0, 0, 0));     // Card 1: The Present
    celticCross.add(createCard(0, 0, 0.01));  // Card 2: The Challenge
    celticCross.add(createCard(0, -2, 0));    // Card 3: The Past
    celticCross.add(createCard(0, 2, 0));     // Card 4: The Future
    celticCross.add(createCard(-2, 0, 0));    // Card 5: Above
    celticCross.add(createCard(2, 0, 0));     // Card 6: Below
    celticCross.add(createCard(4, -2, 0));    // Card 7: The Self
    celticCross.add(createCard(4, 0, 0));     // Card 8: External Influences
    celticCross.add(createCard(4, 2, 0));     // Card 9: Hopes and Fears
    celticCross.add(createCard(4, 4, 0));     // Card 10: The Outcome
    scene.add(celticCross);

    // Add skybox
    const skyboxGeometry = new THREE.SphereGeometry(500, 60, 40);
    const skyboxMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/panoramic.jpg'),
      side: THREE.BackSide
    });
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    camera.position.z = 10;

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