import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Compass, Globe2, ExternalLink, Info, Map as MapIcon } from 'lucide-react';
import L from 'leaflet';

export default function HabitatMap({ species }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const latitude = species?.latitude ?? -1.2921;
  const longitude = species?.longitude ?? 36.8219;
  const commonName = species?.common_name ?? 'East African Bird Habitat';
  const scientificName = species?.scientific_name ?? 'Aves';
  const sampleCount = species?.sample_count ?? 1;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 7,
        zoomControl: true,
        attributionControl: false,
      });

      // 100% Free OpenStreetMap Standard Tiles (No API key required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Smooth pan to coordinates
    map.setView([latitude, longitude], 7);

    // Create crisp illustrative marker pin matching the palette
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          width: 34px; 
          height: 34px; 
          border-radius: 50%; 
          background: #81A6C6; 
          border: 3.5px solid #FFFFFF; 
          box-shadow: 0 4px 14px rgba(129, 166, 198, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #FAF6F0;"></div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: inherit; padding: 6px; min-width: 190px;">
        <span style="font-size: 11px; font-weight: 800; color: #81A6C6; text-transform: uppercase;">Natural Bio-Habitat</span>
        <h4 style="font-size: 15px; font-weight: 800; color: #223344; margin: 3px 0;">${commonName}</h4>
        <p style="font-size: 12px; font-style: italic; color: #586E84; margin: 0 0 6px 0;">${scientificName}</p>
        <div style="font-size: 11px; color: #4A5D70; font-weight: 700; border-top: 1.5px solid #EADFD4; padding-top: 5px;">
          GPS Coordinates: ${latitude.toFixed(4)}&deg;, ${longitude.toFixed(4)}&deg;
        </div>
      </div>
    `).openPopup();

    markerRef.current = marker;

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [latitude, longitude, commonName, scientificName]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="illustrative-card p-6 sm:p-8 bg-white border border-[#E5D9CC] shadow-sm w-full">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#EADFD4]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#AACDDC]/30 text-[#5E88AC] border border-[#81A6C6]/30 shadow-sm">
            <Globe2 className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#223344] m-0">
              Geographic Habitat &amp; Field Observation Map
            </h3>
            <p className="text-xs text-[#586E84] m-0 font-medium">
              East African bioacoustic range distribution &bull; Large geographic terrain explorer
            </p>
          </div>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#F3E3D0] border border-[#D2C4B4] text-xs font-bold text-[#3D6385] transition-all shadow-sm"
        >
          <span>Open Coordinates in Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5 text-[#81A6C6]" />
        </a>
      </div>

      {/* Coordinate Telemetry Grid with Palette Styling */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        {/* Latitude */}
        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] shadow-sm">
          <div className="text-[11px] font-bold text-[#586E84] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-[#81A6C6]" />
            Latitude
          </div>
          <div className="text-xl font-mono font-extrabold text-[#223344] mt-1">
            {latitude > 0 ? `${latitude.toFixed(4)}° N` : `${Math.abs(latitude).toFixed(4)}° S`}
          </div>
        </div>

        {/* Longitude */}
        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] shadow-sm">
          <div className="text-[11px] font-bold text-[#586E84] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-[#5E88AC]" />
            Longitude
          </div>
          <div className="text-xl font-mono font-extrabold text-[#223344] mt-1">
            {longitude > 0 ? `${longitude.toFixed(4)}° E` : `${Math.abs(longitude).toFixed(4)}° W`}
          </div>
        </div>

        {/* Region */}
        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] shadow-sm">
          <div className="text-[11px] font-bold text-[#586E84] uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="h-4 w-4 text-[#81A6C6]" />
            Bio-Region
          </div>
          <div className="text-sm font-bold text-[#223344] mt-1.5 truncate">
            East African Rift Valley
          </div>
        </div>

        {/* Field Records */}
        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EADFD4] shadow-sm">
          <div className="text-[11px] font-bold text-[#586E84] uppercase tracking-wider flex items-center gap-1.5">
            <Info className="h-4 w-4 text-[#B8A593]" />
            Field Records
          </div>
          <div className="text-sm font-bold text-[#223344] mt-1.5">
            {sampleCount} Geo-tagged audio clips
          </div>
        </div>
      </div>

      {/* Large Expansive Map Container (Height 480px for full visibility) */}
      <div className="h-[480px] w-full rounded-2xl overflow-hidden border-2 border-[#E5D9CC] shadow-inner relative">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
    </div>
  );
}
