import React, { useEffect, useRef } from 'react';
import { Navigation, Compass, Globe2, ExternalLink, Info } from 'lucide-react';
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

    // Create crisp illustrative marker pin matching palette (#FF8C52 & #FFF0C5)
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          width: 32px; 
          height: 32px; 
          border-radius: 50%; 
          background: #FF8C52; 
          border: 3px solid #FFFFFF; 
          box-shadow: 0 3px 12px rgba(255, 140, 82, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #FFF0C5;"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: inherit; padding: 5px; min-width: 180px;">
        <span style="font-size: 10px; font-weight: 800; color: #FF8C52; text-transform: uppercase;">Natural Bio-Habitat</span>
        <h4 style="font-size: 14px; font-weight: 800; color: #163333; margin: 2px 0;">${commonName}</h4>
        <p style="font-size: 12px; font-style: italic; color: #359FA0; margin: 0 0 5px 0; font-weight: 700;">${scientificName}</p>
        <div style="font-size: 11px; color: #4B6B6C; font-weight: 700; border-top: 1px solid #EDE4D2; padding-top: 4px;">
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
    <div className="illustrative-card p-6 sm:p-7 bg-white w-full">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#F0E6D4]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#8AD6D1]/25 text-[#359FA0] border border-[#8AD6D1]/40">
            <Globe2 className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#163333] m-0">
              Geographic Habitat &amp; Field Observation Map
            </h3>
            <p className="text-xs text-[#4B6B6C] m-0 font-medium">
              East African bioacoustic range distribution &bull; Large geographic terrain explorer
            </p>
          </div>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFBF2] hover:bg-[#FFF0C5] border border-[#EDE4D2] text-xs font-bold text-[#1F6263] transition-all"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5 text-[#FF8C52]" />
        </a>
      </div>

      {/* Coordinate Telemetry Grid with Sleek Corners */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {/* Latitude */}
        <div className="p-3.5 rounded-xl bg-[#FFFBF2] border border-[#F0E6D4]">
          <div className="text-[11px] font-bold text-[#4B6B6C] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[#359FA0]" />
            Latitude
          </div>
          <div className="text-lg font-mono font-extrabold text-[#163333] mt-1">
            {latitude > 0 ? `${latitude.toFixed(4)}° N` : `${Math.abs(latitude).toFixed(4)}° S`}
          </div>
        </div>

        {/* Longitude */}
        <div className="p-3.5 rounded-xl bg-[#FFFBF2] border border-[#F0E6D4]">
          <div className="text-[11px] font-bold text-[#4B6B6C] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[#FF8C52]" />
            Longitude
          </div>
          <div className="text-lg font-mono font-extrabold text-[#163333] mt-1">
            {longitude > 0 ? `${longitude.toFixed(4)}° E` : `${Math.abs(longitude).toFixed(4)}° W`}
          </div>
        </div>

        {/* Region */}
        <div className="p-3.5 rounded-xl bg-[#FFFBF2] border border-[#F0E6D4]">
          <div className="text-[11px] font-bold text-[#4B6B6C] uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="h-3.5 w-3.5 text-[#359FA0]" />
            Bio-Region
          </div>
          <div className="text-sm font-bold text-[#163333] mt-1 truncate">
            East African Rift Valley
          </div>
        </div>

        {/* Field Records */}
        <div className="p-3.5 rounded-xl bg-[#FFFBF2] border border-[#F0E6D4]">
          <div className="text-[11px] font-bold text-[#4B6B6C] uppercase tracking-wider flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-[#FF8C52]" />
            Field Records
          </div>
          <div className="text-sm font-bold text-[#163333] mt-1">
            {sampleCount} Geo-tagged audio clips
          </div>
        </div>
      </div>

      {/* Large Expansive Map Container (Height 480px for full visibility, clean border) */}
      <div className="h-[460px] sm:h-[480px] w-full rounded-xl overflow-hidden border border-[#EDE4D2] relative">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
    </div>
  );
}
