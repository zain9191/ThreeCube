import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import Component5 from './Component5';
import Component6 from './Component6';
import CubeFace from './CubeFace';

const Cube = () => {
  const ref = useRef();
  const { gl, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const initialMousePosition = useRef([0, 0]);
  const [targetRotation, setTargetRotation] = useState(new Euler(0, 0, 0));
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 0, 15));
  const [currentSide, setCurrentSide] = useState(0);
  const [isInside, setIsInside] = useState(false);

  const handleWheel = useCallback((event) => {
    console.log('Wheel event:', event);
  }, []);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;

    gl.domElement.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      gl.domElement.removeEventListener('wheel', handleWheel);
      controls.dispose();
    };
  }, [camera, gl.domElement, handleWheel]);

  const rotations = useMemo(() => [
    new Euler(0, 0, 0),                  // Front
    new Euler(0, Math.PI / 2, 0),        // Right
    new Euler(0, Math.PI, 0),            // Back
    new Euler(0, -Math.PI / 2, 0),       // Left
    new Euler(-Math.PI / 2, 0, 0),       // Top
    new Euler(Math.PI / 2, 0, 0),        // Bottom
  ], []);

  const positions = useMemo(() => [
    new Vector3(0, 0, 15),                   // Component 1
    new Vector3(0, 0, -15),                  // Component 2
    new Vector3(0, 0, 15),                   // Component 3
    new Vector3(0, 0, -15),                  // Component 4
    new Vector3(0, 0, -15),                  // Component 5
    new Vector3(0, 0, -15),                  // Component 6
  ], []);

  const handlePointerDown = useCallback((event) => {
    setIsDragging(true);
    initialMousePosition.current = [event.clientX, event.clientY];
    event.target.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerUp = useCallback((event) => {
    setIsDragging(false);
    event.target.releasePointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (isDragging) {
      const deltaX = ((event.clientX - initialMousePosition.current[0]) / gl.domElement.clientWidth) * 2 * Math.PI;
      const deltaY = ((event.clientY - initialMousePosition.current[1]) / gl.domElement.clientHeight) * 2 * Math.PI;
      setTargetRotation(new Euler(
        targetRotation.x + deltaY,
        targetRotation.y + deltaX,
        0
      ));
      initialMousePosition.current = [event.clientX, event.clientY];
    }
  }, [isDragging, gl.domElement.clientWidth, gl.domElement.clientHeight, targetRotation]);

  const changeSide = useCallback((direction) => {
    const newSide = (currentSide + direction + positions.length) % positions.length;
    setCurrentSide(newSide);
    setTargetRotation(rotations[newSide]);
    setTargetPosition(positions[newSide]);

    // Animate camera position and rotation for the new side
    gsap.to(camera.position, {
      duration: 2, // Duration of the animation in seconds
      x: positions[newSide].x,
      y: positions[newSide].y,
      z: positions[newSide].z,
      onUpdate: () => {
        camera.lookAt(ref.current.position);
      }
    });

    if (ref.current) {
      gsap.to(ref.current.rotation, {
        duration: 2, // Duration of the animation in seconds
        x: rotations[newSide].x,
        y: rotations[newSide].y,
        z: rotations[newSide].z,
        onUpdate: () => {
          ref.current.rotation.setFromVector3(new Vector3(
            rotations[newSide].x,
            rotations[newSide].y,
            rotations[newSide].z
          ));
        }
      });
    }

    // Log the camera position
    console.log('Camera position:', camera.position);
  }, [currentSide, rotations, positions, camera]);

  useEffect(() => {
    const handleAdjustCubeRotation = (event) => {
      if (event.detail === 'next') {
        changeSide(1);
      } else if (event.detail === 'previous') {
        changeSide(-1);
      }
    };

    window.addEventListener('adjustCubeRotation', handleAdjustCubeRotation);
    return () => {
      window.removeEventListener('adjustCubeRotation', handleAdjustCubeRotation);
    };
  }, [changeSide]);

  useEffect(() => {
    const checkIfInside = () => {
      const cubeSize = 5;
      const position = new Vector3();
      camera.getWorldPosition(position);
      const isInsideCube = (
        position.x >= -cubeSize && position.x <= cubeSize &&
        position.y >= -cubeSize && position.y <= cubeSize &&
        position.z >= -cubeSize && position.z <= cubeSize
      );
      setIsInside(isInsideCube);
    };

    checkIfInside();
  }, [camera]);

  // Expose the camera globally for debugging
  useEffect(() => {
    window.camera = camera;
  }, [camera]);

  const components = [
    Component1,
    Component2,
    Component3,
    Component4,
    Component5,
    Component6,
  ];

  const cubePositions = useMemo(() => [
    new Vector3(0, 0, 5),  // Front
    new Vector3(5, 0, 0),  // Right
    new Vector3(0, 0, -5), // Back
    new Vector3(-5, 0, 0), // Left
    new Vector3(0, 5, 0),  // Top
    new Vector3(0, -5, 0), // Bottom
  ], []);

  return (
    <group
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      position={[0, 0, 0]}
    >
      {components.map((Component, index) => (
        <CubeFace
          key={index}
          position={cubePositions[index]}
          rotation={rotations[index]}
          Component={Component}
          isInside={isInside}
          currentSide={currentSide}
          index={index}
        />
      ))}
    </group>
  );
};

export default Cube;
