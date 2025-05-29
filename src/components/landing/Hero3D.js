import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Text, 
  MeshDistortMaterial, 
  Environment,
  Html,
  useProgress
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import FloatingTooth from '../three/FloatingTooth';
import DataVisualization from '../three/DataVisualization';

// Loading component for 3D scene
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-32 h-32 mb-4">
          <svg viewBox="0 0 100 100" className="animate-spin">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#D28C00" 
              strokeWidth="2" 
              strokeDasharray="280" 
              strokeDashoffset={280 - (progress / 100) * 280}
            />
          </svg>
        </div>
        <p>{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

// Dynamic lighting that follows mouse
function DynamicLight() {
  const lightRef = useRef();
  const { mouse } = useThree();
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 10;
      lightRef.current.position.y = mouse.y * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={lightRef} intensity={1} color="#D28C00" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />
    </>
  );
}

// Glassmorphism plane
function GlassPlane() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

// Holographic text
function HolographicText() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Text
        position={[0, 2, 0]}
        fontSize={1.5}
        color="#D28C00"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        BUZZWORD
        <meshStandardMaterial
          emissive="#D28C00"
          emissiveIntensity={0.3}
        />
      </Text>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        STRATEGIES
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </Text>
    </Float>
  );
}

// Particle system
function ParticleField() {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 2] = 1;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene
function Scene3D() {
  return (
    <>
      <DynamicLight />
      <Environment preset="night" />
      
      {/* Background elements */}
      <GlassPlane />
      <ParticleField />
      
      {/* Main 3D elements */}
      <HolographicText />
      <FloatingTooth />
      <DataVisualization />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

const Hero3D = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
          }}
        >
          <Suspense fallback={<Loader />}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphic Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                Your Dental Lab Deserves
              </span>
              <br />
              <span className="text-white">Better Than Word-of-Mouth</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              According to the National Association of Dental Laboratories, 73% of labs rely solely on referrals 
              while digital-first labs are capturing 3x more cases. Stop hoping for growth. Start engineering it.
            </motion.p>

            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(210, 140, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all glass-button"
                onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Free Marketing Audit
              </motion.button>
              
              <motion.a
                href="https://bundle.buzzwordstrategies.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all glass-button"
              >
                Build Your Custom Bundle
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero3D;
