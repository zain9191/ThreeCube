import React, { memo, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { DoubleSide, Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useTheme } from '../Context/ThemeContext'; // Import the useTheme hook

const CubeFace = ({ position, rotation, Component, isInside, currentSide, index }) => {
  const { theme } = useTheme(); // Use the theme context
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.lookAt(new Vector3(0, 0, 0));
    }
  }, [index]);

  const { color, opacity, scale } = useSpring({
    color: currentSide === index ? (theme === 'dark' ? '#58a6ff' : '#6699cc') : 'white',
    opacity: currentSide === index ? 1 : 0.2,
    scale: currentSide === index ? [1, 1, 1] : [0.9, 0.9, 0.9],
    config: { tension: 170, friction: 150 }
  });

  return (
    <animated.mesh position={position} rotation={rotation} ref={ref} scale={scale}>
      <planeGeometry args={[10, 10]} />
      <animated.meshPhongMaterial
        color={color}
        side={DoubleSide}
        transparent={true}
        opacity={opacity}
        polygonOffset={true}
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
      <Html position={[0, 0, 0.1]} transform>
        <div
          className={`content-wrapper component${index + 1} ${currentSide === index ? 'active-side' : ''}`}
          style={{
            transform: 'scale(-1, 1)',
            opacity: currentSide === index ? 1 : 0.5,
            // color: theme === 'dark' ? '#f0f6fc' : '#555555', // Theme-based text color
            // backgroundColor: theme === 'dark' ? '#0d1117' : '#f2f2f2' // Theme-based background color
          }}
        >
          <Component />
        </div>
      </Html>
    </animated.mesh>
  );
};

export default memo(CubeFace);
