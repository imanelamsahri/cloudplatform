"use client"; // Ajouté en première ligne

import RotatingGlobe from "../components/RotatingGlobe";
import MapComponent from "../components/MapComponent"
import { useState } from "react";

export default function Home() {
  const [showGlobe, setShowGlobe] = useState(true);

  return (
    <div>
      {showGlobe ? (
        <RotatingGlobe onAnimationEnd={() => setShowGlobe(false)} />
      ) : (
        <h1 className="text-center text-3xl font-bold">Bienvenue sur la plateforme !</h1>
      )}
    </div>
  );
}
