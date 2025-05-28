import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingTooth = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={[3, 1, -2]} scale={[0.8, 0.8, 0.8]}>
        {/* Tooth-like geometry */}
        <cylinderGeometry args={[0.3, 0.5, 1.5, 8]} />
        <MeshDistortMaterial
          color="#ffffff"
          distort={0.1}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={[3, 1, -2]} scale={[1.2, 1.2, 1.2]}>
        <cylinderGeometry args={[0.36, 0.6, 1.8, 8]} />
        <meshBasicMaterial
          color="#D28C00"
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
};

export default FloatingTooth;
