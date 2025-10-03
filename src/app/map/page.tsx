'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MapboxMap from '../../components/MapboxMap';

// School district data with coordinates
const schoolDistricts: Array<{
  name: string;
  state: string;
  coordinates: number[];
  description: string;
}> = [
  {
    name: 'Mount Tabor/Forsyth County',
    state: 'North Carolina',
    coordinates: [-80.2442, 36.0999], // [lng, lat]
    description: 'Located in Winston-Salem, North Carolina'
  },
  {
    name: 'South Washington County Schools',
    state: 'Minnesota',
    coordinates: [-92.8904, 44.9537], // [lng, lat] - FIXED
    description: 'Serving Washington County, Minnesota'
  },
  {
    name: 'Katy Independent School District',
    state: 'Texas',
    coordinates: [-95.8244, 29.7858], // [lng, lat] - FIXED
    description: 'Located in Katy, Texas'
  },
  {
    name: 'San Ramon Valley Unified School District',
    state: 'California',
    coordinates: [-121.9780, 37.7799], // [lng, lat] - FIXED
    description: 'Serving San Ramon Valley, California'
  },
  {
    name: 'Plano Independent School District',
    state: 'Texas',
    coordinates: [-96.6989, 33.0198], // [lng, lat] - FIXED
    description: 'Located in Plano, Texas'
  },
  {
    name: 'Millburn Township Public Schools',
    state: 'New Jersey',
    coordinates: [-74.3015, 40.7245], // [lng, lat] - FIXED
    description: 'Located in Millburn, New Jersey'
  },
  {
    name: 'Des Moines Public Schools',
    state: 'Iowa',
    coordinates: [-93.6250, 41.5868], // [lng, lat] - FIXED
    description: 'Serving Des Moines, Iowa'
  },
  {
    name: 'Leander Independent School District',
    state: 'Texas',
    coordinates: [-97.8531, 30.5788], // [lng, lat] - FIXED
    description: 'Located in Leander, Texas'
  }
];


export default function MapPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<typeof schoolDistricts[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our School Districts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the locations of our partner school districts across the United States
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 h-[700px] relative overflow-hidden shadow-sm">
              {!mapLoaded ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
                    <p className="text-sm text-gray-500">Loading map...</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <MapboxMap 
                    selectedDistrict={selectedDistrict} 
                    onDistrictSelect={setSelectedDistrict}
                    schoolDistricts={schoolDistricts}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* District List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-3"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">School Districts</h2>
              <p className="text-sm text-gray-500">Click to explore each location</p>
            </div>
            
            <div className="space-y-2">
              {schoolDistricts.map((district, index) => (
                <motion.button
                  key={district.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                    selectedDistrict?.name === district.name
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDistrict(district)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${
                        selectedDistrict?.name === district.name ? 'text-white' : 'text-black'
                      }`}>
                        {district.name}
                      </h3>
                      <p className={`text-sm ${
                        selectedDistrict?.name === district.name ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {district.state}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ml-3 mt-1 ${
                      selectedDistrict?.name === district.name ? 'bg-white' : 'bg-gray-400'
                    }`}></div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Selected District Details */}
        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {selectedDistrict.name}
                    </h3>
                    <p className="text-gray-600">
                      {selectedDistrict.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Close details"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">State</div>
                    <div className="font-medium text-black">{selectedDistrict.state}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Latitude</div>
                    <div className="font-medium text-black">{selectedDistrict.coordinates[0]}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Longitude</div>
                    <div className="font-medium text-black">{selectedDistrict.coordinates[1]}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}