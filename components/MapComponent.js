"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function MapComponent() {
  const mapContainerRef = useRef(null); // Référence pour l'élément div contenant la carte
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapboxToken) {
      console.error("❌ Erreur : NEXT_PUBLIC_MAPBOX_TOKEN est manquant !");
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Utilisation de useRef pour garantir l'accès à l'élément
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-100, 40],
      zoom: 3,
      attributionControl: false,
    });

    return () => {
      if (map) map.remove(); // Vérification avant suppression
    };
  }, [mapboxToken]); // Dépendance sur le token pour éviter un bug en cas de changement dynamique

  return <div ref={mapContainerRef} className="w-full h-96 bg-gray-700 rounded"></div>;
}
