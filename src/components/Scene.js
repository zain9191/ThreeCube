import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Scene = () => {
  console.log('Rendering Scene component');
  
  return (
    <Canvas camera={{ position: [0, 0, 15] }}>
      {console.log('Canvas initialized with camera position: [0, 0, 15]')}
      <ambientLight />
      {console.log('Added ambient light')}
      <pointLight position={[10, 10, 10]} />
      {console.log('Added point light at position: [10, 10, 10]')}
      <Cube />
      {console.log('Added Cube component')}
      <DreiOrbitControls />
      {console.log('Added OrbitControls from Drei')}
    </Canvas>
  );
};

export default Scene;

