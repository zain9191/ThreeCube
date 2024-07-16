import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { DoubleSide } from 'three';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import Component5 from './Component5';
import Component6 from './Component6';

const Cube = () => {
  const ref = useRef();
  const { gl, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState([0, 0]);
  const [cubeRotation, setCubeRotation] = useState([0, 0]);

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setInitialMousePosition([event.clientX, event.clientY]);
    event.target.setPointerCapture(event.pointerId); // Capture the mouse
  };

  const handlePointerUp = (event) => {
    setIsDragging(false);
    event.target.releasePointerCapture(event.pointerId); // Release the pointer mouse
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const deltaX = (event.clientX - initialMousePosition[0]) / gl.domElement.clientWidth * 2 * Math.PI;
      const deltaY = (event.clientY - initialMousePosition[1]) / gl.domElement.clientHeight * 2 * Math.PI;
      setCubeRotation((prevRotation) => [
        prevRotation[0] + deltaY,
        prevRotation[1] + deltaX
      ]);
      setInitialMousePosition([event.clientX, event.clientY]);
    }
  };

  const handleKeyDown = (event) => {
    const rotationStep = 0.05; //  rotation steps
    switch (event.key) {
      case 'ArrowUp':
        camera.rotation.x -= rotationStep;
        break;
      case 'ArrowDown':
        camera.rotation.x += rotationStep;
        break;
      case 'ArrowLeft':
        camera.rotation.y -= rotationStep;
        break;
      case 'ArrowRight':
        camera.rotation.y += rotationStep;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.set(cubeRotation[0], cubeRotation[1], 0);
    }
  });

  const components = [
    <Component1 key={1} />,
    <Component2 key={2} />,
    <Component3 key={3} />,
    <Component4 key={4} />,
    <Component5 key={5} />,
    <Component6 key={6} />,
  ];

  const positions = [
    [0, 0, 5],  // f
    [5, 0, 0],  // r
    [0, 0, -5], // b
    [-5, 0, 0], // l
    [0, 5, 0],  // t
    [0, -5, 0], // b
  ];

  const rotations = [
    [0, 0, 0],            // f
    [0, -Math.PI / 2, 0], // r
    [0, Math.PI, 0],      // b
    [0, Math.PI / 2, 0],  // l
    [Math.PI / 2, 0, 0],  // t
    [-Math.PI / 2, 0, 0], // b
  ];

  return (
    <group
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {components.map((Component, index) => (
        <mesh key={index} position={positions[index]} rotation={rotations[index]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#fff" side={DoubleSide} />
          <Html transform>
            {Component}
          </Html>
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
};

export default Scene;
