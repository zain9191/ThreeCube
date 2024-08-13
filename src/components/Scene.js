import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Scene = React.memo(() => {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 80]);

  useEffect(() => {
    const updateCameraPosition = () => {
      if (window.innerWidth <= 768) { 
        setCameraPosition([0, 0, 120]); //  camera further away on mobile
      } else {
        setCameraPosition([0, 0, 80]); // Default position 
      }
    };

    window.addEventListener('resize', updateCameraPosition);
    updateCameraPosition(); 

    return () => {
      window.removeEventListener('resize', updateCameraPosition);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: cameraPosition, near: 100, far: 1000 }}
      dpr={[1, 2]}
      antialias="true"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} castShadow />
      <Cube />
      <DreiOrbitControls />
    </Canvas>
  );
});

export default Scene;
