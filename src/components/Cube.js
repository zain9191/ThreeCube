import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import SideOne from './sideOne';
import SideTwo from './sideTwo';
import SideThree from './sideThree';
import SideFour from './sideFour';
import SideFive from './SideFive';
import sideSix from './sideSix';
import CubeFace from './CubeFace';
import { useTheme } from '../Context/ThemeContext'; 

const Cube = () => {
  const { theme } = useTheme(); // Use the theme context
  const ref = useRef();
  const { gl, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const initialMousePosition = useRef([0, 0]);
  const [targetRotation, setTargetRotation] = useState(new Euler(0, 0, 0));
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 0, 15));
  const [currentSide, setCurrentSide] = useState(0);
  const [isInside, setIsInside] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = window.innerWidth <= 768;


  // Handle visibility events
  useEffect(() => {
    const handleShowCube = () => {
      console.debug('Cube shown');
      setIsVisible(true);
    };
  
    const handleHideCube = () => {
      console.debug('Cube hidden');
      setIsVisible(false);
    };
  
    window.addEventListener('showCube', handleShowCube);
    window.addEventListener('hideCube', handleHideCube);
  
    return () => {
      window.removeEventListener('showCube', handleShowCube);
      window.removeEventListener('hideCube', handleHideCube);
    };
  }, []);
  
  const handleWheel = useCallback((event) => {
    // console.debug('Wheel event', event);
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
    new Vector3(0, 0, isMobile ? 120 : 80),  // Further away for mobile
    new Vector3(0, 0, isMobile ? -120 : -80),
    new Vector3(0, 0, isMobile ? 120 : 80),
    new Vector3(0, 0, isMobile ? -120 : -80),
    new Vector3(0, 0, isMobile ? -120 : -80),
    new Vector3(0, 0, isMobile ? -120 : -80),
  ], [isMobile]);
  

  const handlePointerDown = useCallback((event) => {
    setIsDragging(true);
    initialMousePosition.current = [event.clientX, event.clientY];
    event.target.setPointerCapture(event.pointerId);
    // console.debug('Pointer down at:', initialMousePosition.current);
  }, []);

  const handlePointerUp = useCallback((event) => {
    setIsDragging(false);
    event.target.releasePointerCapture(event.pointerId);
    // console.debug('Pointer up');
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (isDragging) {
      const deltaX = ((event.clientX - initialMousePosition.current[0]) / gl.domElement.clientWidth) * 2 * Math.PI;
      const deltaY = ((event.clientY - initialMousePosition.current[1]) / gl.domElement.clientHeight) * 2 * Math.PI;
      // console.debug('Pointer move delta:', { deltaX, deltaY });

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

    // console.debug(`Changing to side: ${newSide}`);

    gsap.to(camera.position, {
      duration: 2, //  animation in seconds
      x: positions[newSide].x,
      y: positions[newSide].y,
      z: positions[newSide].z,
      ease: 'power2.out',
      onUpdate: () => {
        camera.lookAt(ref.current.position);
      },
      onComplete: () => {
        // console.debug('Camera animation complete');
      }
    });

    if (ref.current) {
      gsap.to(ref.current.rotation, {
        duration: 2, //  animation in seconds
        x: rotations[newSide].x,
        y: rotations[newSide].y,
        z: rotations[newSide].z,
        onUpdate: () => {
          ref.current.rotation.setFromVector3(new Vector3(
            rotations[newSide].x,
            rotations[newSide].y,
            rotations[newSide].z
          ));
        },
        onComplete: () => {
          // console.debug('Cube rotation animation complete');
        }
      });
    }
  }, [currentSide, rotations, positions, camera]);

  useEffect(() => {
    const handleAdjustCubeRotation = (event) => {
      // console.debug('Adjusting cube rotation:', event.detail);
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
      // console.debug('Is inside cube:', isInsideCube);
    };

    checkIfInside();
  }, [camera]);

  useEffect(() => {
    window.camera = camera;
    // console.debug('Camera set globally:', camera);
  }, [camera]);

  const components = [
    SideOne,
    SideTwo,
    SideThree,
    SideFour,
    SideFive,
    sideSix,
  ];

  const cubePositions = useMemo(() => [
    new Vector3(0, 0, 30),  // Front
    new Vector3(30, 0, 0),  // Right
    new Vector3(0, 0, -30), // Back
    new Vector3(-30, 0, 0), // Left
    new Vector3(0, 30, 0),  // Top
    new Vector3(0, -30, 0), // Bottom
  ], []);

  return (
    <group
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      position={[0, 0, 0]}
      style={{ color: theme === 'dark' ? 'white' : 'black' }} // Apply theme
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