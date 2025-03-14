"use client";

import { useState } from "react";
import MapComponent from "@/components/MapComponent";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Link from "next/link";

export default function Workbench() {
  const [code, setCode] = useState(""); // Contenu du code écrit
  const [resultMessage, setResultMessage] = useState("Les résultats apparaîtront ici.");
  const [loading, setLoading] = useState(false);
  const [mapKey, setMapKey] = useState(0); // Permet de rafraîchir la carte

  const executeCode = async () => {
    setLoading(true);
    setResultMessage("🟡 Exécution en cours...");

    try {
      const response = await fetch("https://xyz123.execute-api.us-east-1.amazonaws.com/process-ndvi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, image: "s3://ndvi-bucket/original.tif" }),
      });

      const data = await response.json();
      setResultMessage(`✅ Résultat : ${data.body}`);

      // Rafraîchir la carte pour charger la nouvelle image NDVI
      setMapKey((prevKey) => prevKey + 1);
    } catch (error) {
      setResultMessage("❌ Erreur lors du traitement.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col">
      {/* 🔝 Barre de navigation */}
      <div className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white px-6 py-3 flex items-center shadow-md z-50">
        <span className="text-2xl font-bold text-yellow-400">🟡 MyPlatform</span>
      </div>

      {/* 🌟 Arrière-plan étoilé */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        </Canvas>
      </div>

      {/* 🟡 Conteneur principal */}
      <div className="relative z-10 flex w-full mt-12 h-screen">
        {/* 🟡 Barre latérale */}
        <div className="w-1/5 bg-black/30 p-4 border-r border-gray-700">
          <button className="w-full bg-yellow-500 text-black py-2 rounded mb-2">+ Add UDF</button>
          <button className="w-full bg-yellow-500 text-black py-2 rounded">Catalogue</button>
        </div>

        {/* 📝 Éditeur de Code + Map & Résultats */}
        <div className="flex flex-grow">
          {/* 📌 Code Editor prend la moitié gauche */}
          <div className="w-1/2 p-4 border-r border-gray-700 flex flex-col">
            {/* 🟡 Bouton Exécuter au-dessus du Code Editor */}
            <button
              onClick={executeCode}
              className="bg-yellow-500 text-black py-2 px-4 rounded w-full mb-2"
              disabled={loading}
            >
              {loading ? "Exécution en cours..." : "Exécuter"}
            </button>

            {/* Éditeur de Code */}
            <h2 className="text-sm font-semibold mb-2">Code Editor</h2>
            <textarea
              className="w-full h-full bg-black text-white p-2 rounded border border-gray-600"
              placeholder="Écrivez votre code ici..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </div>

          {/* 📌 Map + Résultats en split vertical */}
          <div className="w-1/2 p-4 flex flex-col">
            {/* Map en haut */}
            <div className="flex-grow border-b border-gray-700">
              <h2 className="text-sm font-semibold mb-2">Map</h2>
              <div className="relative h-full">
                <MapComponent key={mapKey} />
              </div>
            </div>

            {/* Résultats en bas */}
            <div className="h-1/3 bg-black p-4 mt-2">
              <h2 className="text-sm font-semibold">Résultats</h2>
              <div className="bg-gray-800 p-3 rounded mt-2">{resultMessage}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Préchargement pour accélérer la navigation vers Workbench */}
      <Link href="/workbench" prefetch={true} className="hidden" />
    </div>
  );
}
