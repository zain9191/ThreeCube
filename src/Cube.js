import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { DoubleSide } from 'three';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import Component5 from './Component5';
import Component6 from './Component6';

const Cube = () => {
  const ref = useRef();
  const { gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState([0, 0]);
  const [targetRotation, setTargetRotation] = useState([0, 0]);

  const handlePointerDown = useCallback((event) => {
    setIsDragging(true);
    setInitialMousePosition([event.clientX, event.clientY]);
    event.target.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerUp = useCallback((event) => {
    setIsDragging(false);
    event.target.releasePointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (isDragging) {
      const deltaX = ((event.clientX - initialMousePosition[0]) / gl.domElement.clientWidth) * 2 * Math.PI;
      const deltaY = ((event.clientY - initialMousePosition[1]) / gl.domElement.clientHeight) * 2 * Math.PI;
      setTargetRotation((prevRotation) => [
        prevRotation[0] + deltaY,
        prevRotation[1] + deltaX,
      ]);
      setInitialMousePosition([event.clientX, event.clientY]);
    }
  }, [isDragging, initialMousePosition, gl.domElement.clientWidth, gl.domElement.clientHeight]);

  const quantizeRotation = (rotation) => {
    const x = Math.round(rotation[0] / (Math.PI / 2)) * (Math.PI / 2);
    const y = Math.round(rotation[1] / (Math.PI / 2)) * (Math.PI / 2);
    return [x, y];
  };

  const adjustRotation = (direction) => {
    const rotationStep = Math.PI / 2;
    const currentRotation = quantizeRotation([ref.current.rotation.x, ref.current.rotation.y]);

    switch (direction) {
      case 'up':
        setTargetRotation([currentRotation[0] - rotationStep, currentRotation[1]]);
        break;
      case 'down':
        setTargetRotation([currentRotation[0] + rotationStep, currentRotation[1]]);
        break;
      case 'left':
        setTargetRotation([currentRotation[0], currentRotation[1] - rotationStep]);
        break;
      case 'right':
        setTargetRotation([currentRotation[0], currentRotation[1] + rotationStep]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleAdjustCubeRotation = (event) => {
      adjustRotation(event.detail);
    };
    
    window.addEventListener('adjustCubeRotation', handleAdjustCubeRotation);
    return () => {
      window.removeEventListener('adjustCubeRotation', handleAdjustCubeRotation);
    };
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += (targetRotation[0] - ref.current.rotation.x) * 0.1;
      ref.current.rotation.y += (targetRotation[1] - ref.current.rotation.y) * 0.1;
    }
  });

  const components = [
    Component1,
    Component2,
    Component3,
    Component4,
    Component5,
    Component6,
  ];

  const positions = [
    [0, 0, 5],  // Front
    [5, 0, 0],  // Right
    [0, 0, -5], // Back
    [-5, 0, 0], // Left
    [0, 5, 0],  // Top
    [0, -5, 0], // Bottom
  ];

  const rotations = [
    [0, 0, 0],            // Front
    [0, Math.PI / 2, 0],  // Right
    [0, Math.PI, 0],      // Back
    [0, -Math.PI / 2, 0], // Left
    [-Math.PI / 2, 0, 0], // Top
    [Math.PI / 2, 0, 0],  // Bottom
  ];

  return (
    <group
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      position={[0, 0, 0]}
    >
      {components.map((Component, index) => (
        <mesh key={index} position={positions[index]} rotation={rotations[index]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#fff" side={DoubleSide} />
          <Html transform>
            <div className={`content-wrapper component${index + 1}`}>
              <Component />
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
