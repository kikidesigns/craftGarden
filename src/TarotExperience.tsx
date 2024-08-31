import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [blueDots, setBlueDots] = useState<THREE.Vector3[]>([]);
  const [isPlacingDots, setIsPlacingDots] = useState(false);

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

    // Create a yellow box
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add skybox
    const skyboxGeometry = new THREE.SphereGeometry(500, 60, 40);
    const skyboxMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/panoramic.jpg'),
      side: THREE.BackSide
    });
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    camera.position.z = 5;

    // Function to add blue dots
    const addBlueDot = (position: THREE.Vector3) => {
      const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(position);
      scene.add(sphere);
      setBlueDots(prevDots => [...prevDots, position]);
    };

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Event listener for mouse clicks
    const onMouseClick = (event: MouseEvent) => {
      if (!isPlacingDots) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        addBlueDot(intersectionPoint);
      }
    };

    window.addEventListener('click', onMouseClick);

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
      window.removeEventListener('click', onMouseClick);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [isPlacingDots]);

  const toggleDotPlacement = () => {
    setIsPlacingDots(!isPlacingDots);
  };

  const saveDotPositions = () => {
    console.log('Blue dot positions:', blueDots);
    // Here you can implement the logic to save the positions
  };

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
      <button
        onClick={toggleDotPlacement}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          zIndex: 10
        }}
      >
        {isPlacingDots ? 'Stop Placing Dots' : 'Start Placing Dots'}
      </button>
      <button
        onClick={saveDotPositions}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '200px',
          zIndex: 10
        }}
      >
        Save Dot Positions
      </button>
    </div>
  );
};

export default TarotExperience;