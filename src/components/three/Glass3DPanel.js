import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Advanced 3D Glass Material Component
const GlassMaterial = ({ opacity = 0.15, roughness = 0.05, transmission = 0.9 }) => {
  const materialRef = useRef();
  
  useEffect(() => {
    if (materialRef.current) {
      // Animate material properties for dynamic effects
      gsap.to(materialRef.current, {
        opacity: opacity + 0.05,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }, [opacity]);

  return (
    <meshPhysicalMaterial
      ref={materialRef}
      color={0xffffff}
      opacity={opacity}
      transparent={true}
      roughness={roughness}
      metalness={0}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      ior={1.4} // Index of refraction for glass
      thickness={0.5}
      transmission={transmission}
      side={THREE.DoubleSide}
    />
  );
};

// Individual Glass Panel Component
const GlassPanel = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  width = 2,
  height = 3,
  depth = 0.2,
  children,
  interactive = true,
  glowColor = "#64b5f6"
}) => {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { mouse, viewport } = useThree();

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Subtle rotation based on time
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      meshRef.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime * 0.2) * 0.01;
      
      // Mouse interaction - tilt based on mouse position
      if (interactive && hovered) {
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        
        meshRef.current.rotation.y = rotation[1] + x * 0.1;
        meshRef.current.rotation.x = rotation[0] + y * 0.1;
      }
    }

    // Glow effect animation
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered ? 0.3 : 0.1;
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  // Handle hover effects
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    
    // GSAP hover animation
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: scale[0] * 1.05,
        y: scale[1] * 1.05,
        z: scale[2] * 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
    
    // Return to original scale
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: scale[0],
        y: scale[1],
        z: scale[2],
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
    
    // Click ripple effect
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: scale[0] * 0.95,
        y: scale[1] * 0.95,
        z: scale[2] * 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <group position={position}>
      {/* Main glass panel */}
      <mesh
        ref={meshRef}
        rotation={rotation}
        scale={scale}
        onPointerOver={interactive ? handlePointerOver : undefined}
        onPointerOut={interactive ? handlePointerOut : undefined}
        onClick={interactive ? handleClick : undefined}
      >
        <boxGeometry args={[width, height, depth]} />
        <GlassMaterial opacity={hovered ? 0.25 : 0.15} />
      </mesh>

      {/* Glow effect */}
      <mesh
        ref={glowRef}
        position={[0, 0, -0.01]}
        rotation={rotation}
      >
        <boxGeometry args={[width * 1.1, height * 1.1, depth * 0.1]} />
        <meshBasicMaterial
          color={glowColor}
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Reflection highlights */}
      <mesh
        position={[-width * 0.3, height * 0.2, depth * 0.51]}
        rotation={[0, 0, Math.PI / 6]}
      >
        <planeGeometry args={[width * 0.1, height * 0.6]} />
        <meshBasicMaterial
          color={0xffffff}
          transparent={true}
          opacity={hovered ? 0.4 : 0.2}
        />
      </mesh>

      {/* Content overlay */}
      {children && (
        <group position={[0, 0, depth * 0.6]}>
          {children}
        </group>
      )}
    </group>
  );
};

// Glass Panel System Manager
const Glass3DPanelSystem = ({ 
  panels = [],
  cameraPosition = [0, 0, 5],
  ambientLightIntensity = 0.4,
  directionalLightIntensity = 1,
  backgroundColor = "#000011"
}) => {
  const sceneRef = useRef();

  // Environment setup
  const Environment = () => {
    const { scene } = useThree();
    
    useEffect(() => {
      // Set background
      scene.background = new THREE.Color(backgroundColor);
      
      // Add fog for depth
      scene.fog = new THREE.Fog(backgroundColor, 1, 20);
    }, [scene]);

    return (
      <>
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={directionalLightIntensity}
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#64b5f6" />
      </>
    );
  };

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Environment />
      
      {/* Render all panels */}
      {panels.map((panel, index) => (
        <GlassPanel
          key={index}
          position={panel.position}
          rotation={panel.rotation}
          scale={panel.scale}
          width={panel.width}
          height={panel.height}
          depth={panel.depth}
          interactive={panel.interactive}
          glowColor={panel.glowColor}
        >
          {panel.content}
        </GlassPanel>
      ))}
    </Canvas>
  );
};

// React Hook for managing glass panels
export const useGlassPanels = () => {
  const [panels, setPanels] = useState([]);

  const addPanel = (panelConfig) => {
    setPanels(prev => [...prev, { id: Date.now(), ...panelConfig }]);
  };

  const removePanel = (id) => {
    setPanels(prev => prev.filter(panel => panel.id !== id));
  };

  const updatePanel = (id, updates) => {
    setPanels(prev => prev.map(panel => 
      panel.id === id ? { ...panel, ...updates } : panel
    ));
  };

  const animatePanel = (id, animation) => {
    const panel = panels.find(p => p.id === id);
    if (panel) {
      gsap.to(panel, {
        ...animation,
        duration: animation.duration || 1,
        ease: animation.ease || "power2.out"
      });
    }
  };

  return {
    panels,
    addPanel,
    removePanel,
    updatePanel,
    animatePanel
  };
};

// Preset panel configurations
export const glassPresets = {
  heroPanel: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    width: 4,
    height: 3,
    depth: 0.2,
    interactive: true,
    glowColor: "#64b5f6"
  },
  
  serviceCard: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    width: 2.5,
    height: 3.5,
    depth: 0.15,
    interactive: true,
    glowColor: "#4fc3f7"
  },
  
  statsPanel: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    width: 3,
    height: 2,
    depth: 0.1,
    interactive: false,
    glowColor: "#29b6f6"
  },
  
  calculatorPanel: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    width: 5,
    height: 4,
    depth: 0.25,
    interactive: true,
    glowColor: "#03a9f4"
  }
};

export { GlassPanel, Glass3DPanelSystem };
export default Glass3DPanelSystem;
