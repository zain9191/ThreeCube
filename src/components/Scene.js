import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Scene = React.memo(() => {
  useEffect(() => {
    // console.debug('Scene mounted');
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 80], near: 100, far: 1000 }}
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
