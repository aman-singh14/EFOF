'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface SchoolDistrict {
  name: string;
  state: string;
  coordinates: number[];
  studentPopulation: string;
  type: string;
  isPilotProgram: boolean;
}

interface OutcomesMapComponentProps {
  selectedDistrict: SchoolDistrict | null;
  onDistrictSelect: (district: SchoolDistrict | null) => void;
  schoolDistricts: SchoolDistrict[];
}

function OutcomesMapComponent({ selectedDistrict, onDistrictSelect, schoolDistricts }: OutcomesMapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-98.5795); // Center of continental US
  const [lat, setLat] = useState(39.8283); // Center of continental US
  const [zoom, setZoom] = useState(4); // Appropriate zoom for US view
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const markerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const currentPopupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Debug: Check access token
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN';
    console.log('Mapbox access token:', token);

    if (token === 'YOUR_MAPBOX_ACCESS_TOKEN') {
      console.error('ERROR: Using placeholder token! Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your .env.local file');
      return;
    }

    // Set access token
    mapboxgl.accessToken = token;

    // Define US bounds (roughly continental US) - [west, south, east, north]
    const usBounds = [
      -125.0, // West longitude
      24.0,   // South latitude
      -66.9,  // East longitude
      49.4    // North latitude
    ] as [number, number, number, number];

    // Create map instance with US-focused settings
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Light theme for minimalist look
      center: [lng, lat],
      zoom: zoom,
      minZoom: 3, // Prevent zooming out too far
      maxZoom: 18, // Allow detailed zoom
      maxBounds: usBounds, // Restrict panning to US boundaries
      attributionControl: false
    });

    // Add subtle navigation control
    map.current.addControl(new mapboxgl.NavigationControl({
      showCompass: false, // Remove compass for cleaner look
      showZoom: true
    }), 'top-right');

    // Handle map load
    map.current.on('load', () => {
      console.log('Map loaded successfully');
      setIsMapLoaded(true);

      // Add school district markers
      schoolDistricts.forEach((district) => {
        const [lng, lat] = district.coordinates;

        // Validate coordinates
        if (typeof lng !== 'number' || typeof lat !== 'number' ||
            lng < -180 || lng > 180 || lat < -90 || lat > 90) {
          console.error(`Invalid coordinates for ${district.name}: [${lng}, ${lat}]`);
          console.error(`Coordinates must be [longitude, latitude] where: lng ∈ [-180, 180], lat ∈ [-90, 90]`);
          return;
        }

        // Create enhanced marker element with different styles for pilot programs
        const markerElement = document.createElement('div');
        markerElement.className = 'school-district-marker';
        markerElement.dataset.districtName = district.name;
        markerElement.dataset.isPilotProgram = district.isPilotProgram.toString();
        
        // Different styling for pilot programs vs other districts
        const isPilot = district.isPilotProgram;
        markerElement.style.cssText = `
          width: ${isPilot ? '20px' : '16px'};
          height: ${isPilot ? '20px' : '16px'};
          background-color: ${isPilot ? '#dc2626' : '#1f2937'};
          border: 3px solid #ffffff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
          position: absolute;
          z-index: 10;
          pointer-events: auto;
          transition: all 0.2s ease;
        `;

        // Add CSS-only hover effects using a pseudo-element approach
        const hoverIndicator = document.createElement('div');
        hoverIndicator.className = 'marker-hover-indicator';
        hoverIndicator.style.cssText = `
          position: absolute;
          top: -2px;
          left: -2px;
          width: ${isPilot ? '24px' : '20px'};
          height: ${isPilot ? '24px' : '20px'};
          border: 2px solid ${isPilot ? '#dc2626' : '#059669'};
          border-radius: 50%;
          opacity: 0;
          transition: all 0.2s ease;
          pointer-events: none;
          z-index: 9;
        `;
        markerElement.appendChild(hoverIndicator);

        // Store marker reference for selection management
        markerRefs.current.set(district.name, markerElement);

        // Enhanced hover effects with name label
        markerElement.addEventListener('mouseenter', (e) => {
          // Show hover indicator
          hoverIndicator.style.opacity = '1';
          hoverIndicator.style.transform = 'scale(1.2)';
          markerElement.style.zIndex = '1000';
          markerElement.style.boxShadow = `0 4px 12px rgba(${isPilot ? '220, 38, 38' : '5, 150, 105'}, 0.4)`;

          // Show district name label that follows cursor
          const nameLabel = document.createElement('div');
          nameLabel.className = 'marker-name-label';
          nameLabel.textContent = district.name;
          nameLabel.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1001;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
          `;

          const updateLabelPosition = (e: MouseEvent) => {
            nameLabel.style.left = `${e.clientX}px`;
            nameLabel.style.top = `${e.clientY - 45}px`;
          };

          document.addEventListener('mousemove', updateLabelPosition);
          document.body.appendChild(nameLabel);

          // Store cleanup function
          (markerElement as HTMLElement & { _labelCleanup?: () => void })._labelCleanup = () => {
            document.removeEventListener('mousemove', updateLabelPosition);
            if (nameLabel.parentNode) {
              nameLabel.parentNode.removeChild(nameLabel);
            }
          };
        });

        markerElement.addEventListener('mouseleave', () => {
          // Only reset if this marker is not currently selected
          if (selectedDistrict?.name !== district.name) {
            hoverIndicator.style.opacity = '0';
            hoverIndicator.style.transform = 'scale(1)';
            markerElement.style.zIndex = '10';
            markerElement.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
          }

          // Cleanup label
          const cleanup = (markerElement as HTMLElement & { _labelCleanup?: () => void })._labelCleanup;
          if (cleanup) {
            cleanup();
            delete (markerElement as HTMLElement & { _labelCleanup?: () => void })._labelCleanup;
          }
        });

        // Create detailed popup for clicks
        const popup = new mapboxgl.Popup({
          offset: 30,
          closeButton: true,
          closeOnClick: true,
          className: 'school-district-popup',
          maxWidth: '350px'
        }).setHTML(`
          <div class="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-3 h-3 rounded-full ${isPilot ? 'bg-red-600' : 'bg-gray-700'}"></div>
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                ${isPilot ? 'Pilot Program' : 'School District'}
              </span>
            </div>
            <h3 class="font-bold text-gray-900 text-base mb-2">${district.name}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">State:</span>
                <span class="font-medium text-gray-900">${district.state}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Students:</span>
                <span class="font-medium text-gray-900">${district.studentPopulation}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Type:</span>
                <span class="font-medium text-gray-900">${district.type}</span>
              </div>
            </div>
            <div class="mt-3 pt-2 border-t border-gray-100">
              <p class="text-xs text-gray-500">
                Coordinates: ${lng.toFixed(4)}, ${lat.toFixed(4)}
              </p>
            </div>
          </div>
        `);

        // Create marker with better positioning
        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: 'center',
          pitchAlignment: 'map',
          rotationAlignment: 'map'
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current!);

        // Enhanced click handling with selection management
        markerElement.addEventListener('click', (e) => {
          e.stopPropagation();

          // Close any currently open popup
          if (currentPopupRef.current) {
            currentPopupRef.current.remove();
            currentPopupRef.current = null;
          }

          // Deselect all markers first
          markerRefs.current.forEach((markerEl, districtName) => {
            const hoverInd = markerEl.querySelector('.marker-hover-indicator') as HTMLElement;
            const isMarkerPilot = markerEl.dataset.isPilotProgram === 'true';
            if (hoverInd) {
              hoverInd.style.opacity = '0';
              hoverInd.style.transform = 'scale(1)';
            }
            markerEl.style.backgroundColor = isMarkerPilot ? '#dc2626' : '#1f2937';
            markerEl.style.borderColor = '#ffffff';
            markerEl.style.zIndex = '10';
            markerEl.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
          });

          // Select the clicked marker
          if (selectedDistrict?.name !== district.name) {
            // Select new district
            onDistrictSelect(district);

            // Update visual state for selected marker
            markerElement.style.backgroundColor = isPilot ? '#dc2626' : '#1f2937';
            markerElement.style.borderColor = '#fbbf24'; // Yellow border for selected
            markerElement.style.zIndex = '1000';
            markerElement.style.boxShadow = `0 4px 12px rgba(${isPilot ? '220, 38, 38' : '31, 41, 55'}, 0.4)`;

            // Show permanent selection indicator
            const hoverInd = markerElement.querySelector('.marker-hover-indicator') as HTMLElement;
            if (hoverInd) {
              hoverInd.style.borderColor = '#fbbf24';
              hoverInd.style.opacity = '1';
              hoverInd.style.transform = 'scale(1.3)';
            }

            // Open popup and store reference
            marker.togglePopup();
            currentPopupRef.current = popup;
          } else {
            // Deselect if clicking the same marker
            onDistrictSelect(null);

            // Reset visual state
            markerElement.style.backgroundColor = isPilot ? '#dc2626' : '#1f2937';
            markerElement.style.borderColor = '#ffffff';
            markerElement.style.zIndex = '10';
            markerElement.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';

            const hoverInd = markerElement.querySelector('.marker-hover-indicator') as HTMLElement;
            if (hoverInd) {
              hoverInd.style.borderColor = isPilot ? '#dc2626' : '#059669';
              hoverInd.style.opacity = '0';
              hoverInd.style.transform = 'scale(1)';
            }
          }
        });
      });
    });

    // Handle map errors
    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    // Handle map move events - only update state, don't recreate map
    map.current.on('move', () => {
      if (map.current) {
        setLng(map.current.getCenter().lng);
        setLat(map.current.getCenter().lat);
        setZoom(map.current.getZoom());
      }
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-full h-full">
      <style jsx>{`
        .school-district-popup .mapboxgl-popup-content {
          background: transparent;
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .school-district-popup .mapboxgl-popup-tip {
          display: none;
        }

        .school-district-marker:hover {
          z-index: 1000 !important;
        }
      `}</style>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 z-10">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-red-600 border-2 border-white rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700">Pilot Programs</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-700 border-2 border-white rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-700">School Districts</span>
          </div>
        </div>
      </div>

      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{
          position: 'relative',
          minHeight: '100%'
        }}
      />
    </div>
  );
}

export default OutcomesMapComponent;