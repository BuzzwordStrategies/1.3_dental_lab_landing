import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ToothModel = ({ position, scale = 1 }) => {
  const meshRef = useRef();
  
  // Create a simple tooth-like geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Create tooth crown shape
    shape.moveTo(0, -1);
    shape.quadraticCurveTo(-0.5, -0.8, -0.6, -0.4);
    shape.quadraticCurveTo(-0.7, 0, -0.6, 0.4);
    shape.quadraticCurveTo(-0.5, 0.8, 0, 1);
    shape.quadraticCurveTo(0.5, 0.8, 0.6, 0.4);
    shape.quadraticCurveTo(0.7, 0, 0.6, -0.4);
    shape.quadraticCurveTo(0.5, -0.8, 0, -1);
    
    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <MeshDistortMaterial
          color="#F59E0B"
          attach="material"
          distort={0.1}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          opacity={0.3}
          transparent
        />
      </mesh>
    </Float>
  );
};

const CrownModel = ({ position, scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <cylinderGeometry args={[0.5, 0.7, 0.8, 8]} />
        <MeshDistortMaterial
          color="#FBBF24"
          attach="material"
          distort={0.05}
          speed={1}
          roughness={0.1}
          metalness={0.9}
          opacity={0.25}
          transparent
        />
      </mesh>
    </Float>
  );
};

const GeometricShape = ({ position, scale = 1, color = "#F59E0B" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          opacity={0.2}
          transparent
          wireframe
        />
      </mesh>
    </Float>
  );
};

const FloatingDentalModels = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#F59E0B" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 5, 15]} />
      
      {/* Floating dental models */}
      <ToothModel position={[-3, 2, -2]} scale={0.8} />
      <ToothModel position={[4, -1, -3]} scale={0.6} />
      <ToothModel position={[-2, -2, -4]} scale={0.7} />
      
      <CrownModel position={[3, 1, -2]} scale={0.7} />
      <CrownModel position={[-4, 0, -3]} scale={0.5} />
      
      {/* Geometric shapes for visual interest */}
      <GeometricShape position={[2, -3, -5]} scale={0.4} />
      <GeometricShape position={[-3, 3, -4]} scale={0.3} color="#FBBF24" />
      <GeometricShape position={[0, 0, -6]} scale={0.5} />
      <GeometricShape position={[5, 2, -3]} scale={0.35} color="#FB923C" />
      <GeometricShape position={[-5, -2, -4]} scale={0.45} />
      
      {/* Additional small particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            -Math.random() * 5 - 2
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={0.5}
            opacity={0.6}
            transparent
          />
        </mesh>
      ))}
    </>
  );
};

export default FloatingDentalModels;
