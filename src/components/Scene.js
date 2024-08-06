import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Scene = () => {
  
  return (
<Canvas
  camera={{ position: [0, 0, 80], near: 0.1, far: 500 }}
  dpr={[1, 2]} 
  antialias
>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} castShadow/>
      <Cube />
      <DreiOrbitControls />
    </Canvas>
  );
};

export default Scene;
