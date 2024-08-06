import React, { memo, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { DoubleSide, Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';

const CubeFace = ({ position, rotation, Component, isInside, currentSide, index }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.lookAt(new Vector3(0, 0, 0));
    }
  }, []);

  const { color, opacity, scale } = useSpring({
    color: currentSide === index ? "#add8e6" : "white",
    opacity: currentSide === index ? 1 : 0.9,
    scale: currentSide === index ? [1, 1, 1] : [0.9, 0.9, 0.9],
    config: { tension: 170, friction: 126 }
  });

  return (
    <animated.mesh position={position} rotation={rotation} ref={ref} scale={scale}>
      <planeGeometry args={[10, 10]} />
      <animated.meshBasicMaterial
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
          }}
        >
          <Component />
        </div>
      </Html>
    </animated.mesh>
  );
};

export default memo(CubeFace);
