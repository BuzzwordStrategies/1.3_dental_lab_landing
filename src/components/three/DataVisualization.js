import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { useData } from '../../contexts/DataContext';

// Interactive 3D Bar Chart
function BarChart3D({ data, position, onHover }) {
  const groupRef = useRef();
  const [hoveredBar, setHoveredBar] = useState(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {data.map((item, index) => {
        const height = item.value / 10; // Scale down for visualization
        const isHovered = hoveredBar === index;
        
        return (
          <animated.mesh
            key={index}
            position={[index * 1.5 - (data.length * 0.75), height / 2, 0]}
            scale={isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredBar(index);
              onHover?.(item);
            }}
            onPointerOut={() => setHoveredBar(null)}
          >
            <boxGeometry args={[1, height, 1]} />
            <meshStandardMaterial
              color={isHovered ? "#F59E0B" : "#D28C00"}
              emissive={isHovered ? "#F59E0B" : "#D28C00"}
              emissiveIntensity={isHovered ? 0.3 : 0.1}
            />
            
            {/* Label */}
            <Text
              position={[0, height / 2 + 0.5, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="bottom"
            >
              {item.label}
            </Text>
            
            {/* Value */}
            <Text
              position={[0, height / 2 + 1, 0]}
              fontSize={0.2}
              color="#D28C00"
              anchorX="center"
              anchorY="bottom"
            >
              {item.value}%
            </Text>
          </animated.mesh>
        );
      })}
    </group>
  );
}

// Network Graph for Service Connections
function NetworkGraph({ position }) {
  const groupRef = useRef();
  const [connections] = useState([
    { from: [0, 0, 0], to: [2, 1, 0], strength: 0.8 },
    { from: [2, 1, 0], to: [1, 3, 0], strength: 0.6 },
    { from: [1, 3, 0], to: [-1, 2, 0], strength: 0.9 },
    { from: [-1, 2, 0], to: [0, 0, 0], strength: 0.7 },
    { from: [0, 0, 0], to: [1, 3, 0], strength: 0.5 }
  ]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Connection lines */}
      {connections.map((connection, index) => {
        const start = new THREE.Vector3(...connection.from);
        const end = new THREE.Vector3(...connection.to);
        const direction = end.clone().sub(start);
        const length = direction.length();
        
        return (
          <mesh
            key={index}
            position={[
              (start.x + end.x) / 2,
              (start.y + end.y) / 2,
              (start.z + end.z) / 2
            ]}
            rotation={[0, 0, Math.atan2(direction.y, direction.x)]}
          >
            <cylinderGeometry args={[0.02, 0.02, length, 8]} />
            <meshStandardMaterial
              color="#D28C00"
              emissive="#D28C00"
              emissiveIntensity={connection.strength * 0.3}
              transparent
              opacity={connection.strength}
            />
          </mesh>
        );
      })}
      
      {/* Nodes */}
      {[
        { pos: [0, 0, 0], label: "SEO" },
        { pos: [2, 1, 0], label: "Content" },
        { pos: [1, 3, 0], label: "Social" },
        { pos: [-1, 2, 0], label: "Ads" }
      ].map((node, index) => (
        <Float key={index} speed={2} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={node.pos}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#D28C00"
              emissiveIntensity={0.2}
            />
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="bottom"
            >
              {node.label}
            </Text>
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Statistics Display
function StatsDisplay({ stats, position }) {
  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
        {/* Background panel */}
        <mesh>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial
            color="#1F2937"
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Title */}
        <Text
          position={[0, 1, 0.01]}
          fontSize={0.3}
          color="#D28C00"
          anchorX="center"
          anchorY="middle"
        >
          Real Results for Real Labs
        </Text>
        
        {/* Statistics */}
        <Text
          position={[0, 0.3, 0.01]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          71% of people search online
        </Text>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.15}
          color="#9CA3AF"
          anchorX="center"
          anchorY="middle"
        >
          before choosing a dentist
        </Text>
        
        <Text
          position={[0, -0.4, 0.01]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          45% more opportunities
        </Text>
        <Text
          position={[0, -0.7, 0.01]}
          fontSize={0.15}
          color="#9CA3AF"
          anchorX="center"
          anchorY="middle"
        >
          from social selling
        </Text>
        
        {/* Disclaimer */}
        <Text
          position={[0, -1.2, 0.01]}
          fontSize={0.1}
          color="#6B7280"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
        >
          Results may vary and are not guaranteed
        </Text>
      </Float>
    </group>
  );
}

// Main Data Visualization Component
const DataVisualization = ({ interactive = false, showStats = true }) => {
  const { stats, caseStudies } = useData();
  const groupRef = useRef();
  const [hoveredData, setHoveredData] = useState(null);

  // Generate chart data from case studies
  const chartData = useMemo(() => {
    if (!caseStudies.length) {
      return [
        { label: "Traffic", value: 150 },
        { label: "Leads", value: 200 },
        { label: "Engagement", value: 300 },
        { label: "Authority", value: 180 }
      ];
    }
    
    return caseStudies.slice(0, 4).map(study => {
      const match = study.Results.match(/(\d+)%/);
      return {
        label: study.Service.split(' ')[0],
        value: match ? parseInt(match[1]) : 100
      };
    });
  }, [caseStudies]);

  useFrame((state) => {
    if (groupRef.current && !interactive) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[-4, -1, -3]}>
      {/* Main bar chart */}
      <BarChart3D
        data={chartData}
        position={[0, 0, 0]}
        onHover={setHoveredData}
      />
      
      {/* Network graph */}
      <NetworkGraph position={[6, 2, -2]} />
      
      {/* Statistics display */}
      {showStats && (
        <StatsDisplay
          stats={stats}
          position={[-6, 1, 0]}
        />
      )}
      
      {/* Floating particles for ambiance */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={2}>
        <group>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color="#D28C00"
                emissive="#D28C00"
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      </Float>
      
      {/* Hover tooltip */}
      {hoveredData && (
        <Html position={[0, 5, 0]} center>
          <div className="bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm">
            <p className="font-bold">{hoveredData.label}</p>
            <p className="text-amber-400">{hoveredData.value}% increase</p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default DataVisualization;
