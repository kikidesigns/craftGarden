import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const TarotExperience: React.FC<{ selectedSpread: string }> = ({ selectedSpread }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedObject, setSelectedObject] = useState<THREE.Mesh | null>(null);

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

    // Add skybox
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/src/assets/panorama.jpg');
    const skyboxGeometry = new THREE.SphereGeometry(500, 60, 40);
    const skyboxMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    camera.position.set(5, 0, 5);
    camera.lookAt(0, 0, 0);

    // Raycaster for object selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Event listener for object selection
    const onMouseClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject instanceof THREE.Mesh) {
          setSelectedObject(clickedObject);
        }
      } else {
        setSelectedObject(null);
      }
    };

    window.addEventListener('click', onMouseClick);

    // Keyboard controls for moving objects
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedObject) {
        const speed = 0.1;
        switch (event.key) {
          case 'ArrowLeft':
            selectedObject.position.x -= speed;
            break;
          case 'ArrowRight':
            selectedObject.position.x += speed;
            break;
          case 'ArrowUp':
            selectedObject.position.y += speed;
            break;
          case 'ArrowDown':
            selectedObject.position.y -= speed;
            break;
          case 'PageUp':
            selectedObject.position.z -= speed;
            break;
          case 'PageDown':
            selectedObject.position.z += speed;
            break;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

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
      window.removeEventListener('keydown', onKeyDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [selectedSpread]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)', marginTop: '60px', display: 'flex', justifyContent: 'flex-start' }}>
      <div ref={mountRef} style={{ width: '80%', height: '100%' }} />
      <div style={{ width: '20%', padding: '20px' }}>
        <h3>Controls:</h3>
        <p>Click on an object to select it.</p>
        <p>Use arrow keys to move the selected object left, right, up, and down.</p>
        <p>Use Page Up and Page Down to move the selected object forward and backward.</p>
        <p>Use mouse to look around and zoom.</p>
      </div>
    </div>
  );
};

export default TarotExperience;