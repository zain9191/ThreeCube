import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Scene = () => {
  console.log('Rendering Scene component');
  
  return (
    <Canvas camera={{ position: [0, 0, 80] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <Cube />
      <DreiOrbitControls />
    </Canvas>
  );
};

export default Scene;
