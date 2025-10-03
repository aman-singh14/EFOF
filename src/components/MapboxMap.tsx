'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

import 'mapbox-gl/dist/mapbox-gl.css';

interface SchoolDistrict {
  name: string;
  state: string;
  coordinates: number[];
  description: string;
}

interface MapboxMapProps {
  selectedDistrict: SchoolDistrict | null;
  onDistrictSelect: (district: SchoolDistrict | null) => void;
  schoolDistricts: SchoolDistrict[];
}

// Import MapComponent directly (not dynamic)
import MapComponent from './MapComponent';

export default function MapboxMap({ selectedDistrict, onDistrictSelect, schoolDistricts }: MapboxMapProps) {
  const [popupInfo, setPopupInfo] = useState<SchoolDistrict | null>(null);

  const handleMarkerClick = useCallback((district: SchoolDistrict | null) => {
    onDistrictSelect(district);
    setPopupInfo(district);
  }, [onDistrictSelect]);

  return (
    <div className="relative w-full h-full">
      <MapComponent
        selectedDistrict={selectedDistrict}
        onDistrictSelect={handleMarkerClick}
        schoolDistricts={schoolDistricts}
      />
    </div>
  );
}
