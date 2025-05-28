import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

// 3D Map Visualization Component
function MapVisualization3D({ competitors }) {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Map base */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial
            color="#1F2937"
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Competitor markers */}
        {competitors.slice(0, 10).map((competitor, index) => {
          const x = (Math.random() - 0.5) * 7;
          const y = (Math.random() - 0.5) * 5;
          
          return (
            <group key={index} position={[x, y, 0.1]}>
              <mesh>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial
                  color="#EF4444"
                  emissive="#EF4444"
                  emissiveIntensity={0.3}
                />
              </mesh>
              
              <Text
                position={[0, 0.3, 0]}
                fontSize={0.1}
                color="#ffffff"
                anchorX="center"
                anchorY="bottom"
                maxWidth={1}
              >
                {competitor.name}
              </Text>
            </group>
          );
        })}
        
        {/* Title */}
        <Text
          position={[0, 3.5, 0.1]}
          fontSize={0.3}
          color="#D28C00"
          anchorX="center"
          anchorY="middle"
        >
          Competitors in Your Area
        </Text>
      </group>
    </Float>
  );
}

const CompetitorFinder = () => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5000); // 5km default
  const [searchQuery, setSearchQuery] = useState('dental lab');
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'demo-key',
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        // Default to center of North America
        const defaultLocation = { lat: 39.8283, lng: -98.5795 };
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultLocation,
          zoom: 4,
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#1f2937"}]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#ffffff"}]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#374151"}]
            }
          ]
        });

        setMap(mapInstance);
        setPlacesService(new google.maps.places.PlacesService(mapInstance));

        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setUserLocation(location);
              mapInstance.setCenter(location);
              mapInstance.setZoom(10);
            },
            (error) => {
              console.log('Geolocation error:', error);
            }
          );
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initializeMap();
  }, []);

  const searchCompetitors = () => {
    if (!placesService || !userLocation) {
      alert('Please allow location access or enter a location manually');
      return;
    }

    setLoading(true);
    setCompetitors([]);

    const request = {
      location: userLocation,
      radius: searchRadius,
      keyword: searchQuery,
      type: 'health'
    };

    placesService.nearbySearch(request, (results, status) => {
      setLoading(false);
      
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const competitorData = results.map(place => ({
          id: place.place_id,
          name: place.name,
          rating: place.rating || 'N/A',
          address: place.vicinity,
          location: place.geometry.location,
          types: place.types,
          priceLevel: place.price_level || 'N/A'
        }));

        setCompetitors(competitorData);

        // Clear existing markers
        if (map) {
          // Add markers to map
          competitorData.forEach(competitor => {
            const marker = new window.google.maps.Marker({
              position: competitor.location,
              map: map,
              title: competitor.name,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#EF4444" stroke="#ffffff" stroke-width="2"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(20, 20)
              }
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="color: black;">
                  <h3>${competitor.name}</h3>
                  <p>Rating: ${competitor.rating}</p>
                  <p>${competitor.address}</p>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          });
        }
      } else {
        alert('No competitors found in this area. Try expanding your search radius.');
      }
    });
  };

  const handleLocationSearch = (address) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        setUserLocation({
          lat: location.lat(),
          lng: location.lng()
        });
        map.setCenter(location);
        map.setZoom(10);
      }
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Find Your Competitors
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover dental labs and practices in your area. Know your competition to stay ahead.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Search Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Search Location</label>
                  <input
                    type="text"
                    placeholder="Enter city, state, or address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleLocationSearch(e.target.value);
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Search Type</label>
                  <select
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="dental lab">Dental Labs</option>
                    <option value="dental office">Dental Offices</option>
                    <option value="orthodontist">Orthodontists</option>
                    <option value="oral surgeon">Oral Surgeons</option>
                    <option value="prosthodontist">Prosthodontists</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Search Radius: {(searchRadius / 1000).toFixed(1)} km
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={searchCompetitors}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-lg disabled:opacity-50"
                  >
                    {loading ? 'Searching...' : 'Find Competitors'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShow3D(!show3D)}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg"
                  >
                    {show3D ? '2D Map' : '3D View'}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {competitors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Found {competitors.length} Competitors
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {competitors.slice(0, 5).map((competitor, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{competitor.name}</p>
                        <p className="text-gray-400 text-sm">{competitor.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400">★ {competitor.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Map Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {show3D ? (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-96 bg-gray-900 rounded-2xl overflow-hidden"
                >
                  <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#D28C00" />
                    <MapVisualization3D competitors={competitors} />
                  </Canvas>
                </motion.div>
              ) : (
                <motion.div
                  key="2d"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-96 bg-gray-800 rounded-2xl overflow-hidden"
                >
                  <div ref={mapRef} className="w-full h-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-12"
        >
          <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Outrank Your Competitors?
            </h3>
            <p className="text-gray-300 mb-6">
              Get a custom marketing strategy designed to help you dominate your local market.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full"
              onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Competitive Analysis
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitorFinder;
