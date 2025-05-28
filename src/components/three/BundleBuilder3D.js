import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Box, 
  Text, 
  Float, 
  Html, 
  OrbitControls,
  Environment,
  MeshDistortMaterial
} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useData } from '../../contexts/DataContext';

// 3D Service Card Component
function ServiceCard3D({ 
  position, 
  service, 
  tier, 
  isSelected, 
  onSelect, 
  onHover,
  index 
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const { scale, color } = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : isSelected ? [1.1, 1.1, 1.1] : [1, 1, 1],
    color: isSelected ? '#D28C00' : hovered ? '#F59E0B' : '#ffffff',
    config: { tension: 400, friction: 25 }
  });

  useFrame((state) => {
    if (meshRef.current && !hovered && !isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    }
  });

  const serviceColors = {
    'Social Posts': '#3B82F6',
    'Content': '#10B981',
    'Backlinks': '#8B5CF6',
    'GBP Ranker': '#EF4444',
    'SEO': '#F59E0B',
    'TikTok Ads': '#EC4899',
    'Google Ads': '#FBBF24',
    'Meta Ads': '#3B82F6'
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <animated.mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover?.(service);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(service);
        }}
      >
        <boxGeometry args={[2, 2.5, 0.2]} />
        <animated.meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.8}
          emissive={serviceColors[service.Service] || '#ffffff'}
          emissiveIntensity={isSelected ? 0.3 : hovered ? 0.2 : 0.1}
        />
        
        {/* Service name text */}
        <Text
          position={[0, 0.8, 0.11]}
          fontSize={0.2}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {service.Service}
        </Text>
        
        {/* Tier text */}
        <Text
          position={[0, 0.4, 0.11]}
          fontSize={0.15}
          color="#666666"
          anchorX="center"
          anchorY="middle"
        >
          {tier}
        </Text>
        
        {/* Price text */}
        <Text
          position={[0, -0.2, 0.11]}
          fontSize={0.25}
          color="#D28C00"
          anchorX="center"
          anchorY="middle"
        >
          ${service['Final Monthly Price After Discounts']}
        </Text>
        
        {/* Features */}
        <Text
          position={[0, -0.6, 0.11]}
          fontSize={0.1}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {service['Feature Line 1']}
        </Text>
      </animated.mesh>
    </Float>
  );
}

// 3D Bundle Display
function BundleDisplay3D({ selectedServices, totalPrice, savings }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      {/* Bundle container */}
      <Box args={[4, 1, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1F2937"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.5}
        />
      </Box>
      
      {/* Total price display */}
      <Text
        position={[0, 0.2, 0.11]}
        fontSize={0.3}
        color="#D28C00"
        anchorX="center"
        anchorY="middle"
      >
        Total: ${totalPrice}
      </Text>
      
      {/* Savings display */}
      <Text
        position={[0, -0.2, 0.11]}
        fontSize={0.2}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
      >
        Savings: ${savings}
      </Text>
      
      {/* Selected services count */}
      <Text
        position={[0, -0.5, 0.11]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {selectedServices.length} Services Selected
      </Text>
    </group>
  );
}

// Subscription Length Slider 3D
function SubscriptionSlider3D({ value, onChange }) {
  const sliderRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  
  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  
  return (
    <group position={[0, -3, 0]}>
      {/* Slider track */}
      <Box args={[6, 0.1, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      
      {/* Slider handle */}
      <Box 
        ref={sliderRef}
        args={[0.3, 0.5, 0.3]} 
        position={[(value - 12) / 4, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <meshStandardMaterial 
          color="#D28C00" 
          emissive="#D28C00"
          emissiveIntensity={isDragging ? 0.3 : 0.1}
        />
      </Box>
      
      {/* Labels */}
      <Text
        position={[-3, -0.8, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
      >
        3 months
      </Text>
      <Text
        position={[3, -0.8, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
      >
        24 months
      </Text>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color="#D28C00"
        anchorX="center"
      >
        {value} months
      </Text>
    </group>
  );
}

// Main 3D Scene
function BundleScene3D({ 
  services, 
  selectedServices, 
  onServiceSelect, 
  subscriptionLength,
  onSubscriptionChange,
  totalPrice,
  savings
}) {
  const [hoveredService, setHoveredService] = useState(null);
  
  // Arrange services in a circle
  const servicePositions = useMemo(() => {
    const radius = 5;
    return services.map((_, index) => {
      const angle = (index / services.length) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.3,
        Math.sin(angle) * radius * 0.5
      ];
    });
  }, [services]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D28C00" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />
      
      <Environment preset="night" />
      
      {/* Service cards */}
      {services.map((service, index) => (
        <ServiceCard3D
          key={`${service.Service}-${service.Tier}`}
          position={servicePositions[index]}
          service={service}
          tier={service.Tier}
          isSelected={selectedServices.some(s => 
            s.name === service.Service && s.tier === service.Tier
          )}
          onSelect={onServiceSelect}
          onHover={setHoveredService}
          index={index}
        />
      ))}
      
      {/* Bundle display */}
      {selectedServices.length > 0 && (
        <BundleDisplay3D
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          savings={savings}
        />
      )}
      
      {/* Subscription slider */}
      <SubscriptionSlider3D
        value={subscriptionLength}
        onChange={onSubscriptionChange}
      />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxDistance={15}
        minDistance={5}
      />
    </>
  );
}

// Main BundleBuilder3D Component
const BundleBuilder3D = () => {
  const { pricingData, calculateBundlePrice, isLoading } = useData();
  const [selectedServices, setSelectedServices] = useState([]);
  const [subscriptionLength, setSubscriptionLength] = useState(3);
  const [selectedTier, setSelectedTier] = useState('Base');
  
  // Filter services by selected tier
  const filteredServices = useMemo(() => {
    return pricingData.filter(service => service.Tier === selectedTier);
  }, [pricingData, selectedTier]);
  
  // Calculate pricing
  const pricing = useMemo(() => {
    return calculateBundlePrice(selectedServices);
  }, [selectedServices, calculateBundlePrice]);

  const handleServiceSelect = (service) => {
    const serviceKey = `${service.Service}-${service.Tier}`;
    const isSelected = selectedServices.some(s => 
      s.name === service.Service && s.tier === service.Tier
    );
    
    if (isSelected) {
      setSelectedServices(prev => 
        prev.filter(s => !(s.name === service.Service && s.tier === service.Tier))
      );
    } else {
      setSelectedServices(prev => [...prev, {
        name: service.Service,
        tier: service.Tier,
        subscriptionLength,
        price: service['Final Monthly Price After Discounts']
      }]);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading Bundle Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Tier Selection */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-2">
          {['Base', 'Standard', 'Premium'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTier === tier
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-screen">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true }}
        >
          <BundleScene3D
            services={filteredServices}
            selectedServices={selectedServices}
            onServiceSelect={handleServiceSelect}
            subscriptionLength={subscriptionLength}
            onSubscriptionChange={setSubscriptionLength}
            totalPrice={pricing.total}
            savings={pricing.savings}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center"
        >
          <h3 className="text-white text-xl font-bold mb-2">
            Your Custom Bundle
          </h3>
          <p className="text-gray-300 mb-4">
            {selectedServices.length} services selected
          </p>
          
          {selectedServices.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full"
              onClick={() => {
                // Navigate to checkout or next step
                console.log('Proceeding with bundle:', selectedServices);
              }}
            >
              Continue to Checkout - ${pricing.total}
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BundleBuilder3D;
