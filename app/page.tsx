"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import RotatingGlobe from "../components/RotatingGlobe";

export default function Home() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* 🌍 Animation de la Terre */}
      {!animationFinished && <RotatingGlobe onAnimationEnd={() => setAnimationFinished(true)} />}

      {/* 🌟 Fond étoilé après l'animation */}
      {animationFinished && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas>
            <ambientLight intensity={1.5} />
            <Stars radius={1100} depth={500} count={300100} factor={8} saturation={0} fade />
          </Canvas>
        </div>
      )}

      {/* 📌 Barre de navigation */}
      {animationFinished && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-md text-white px-6 py-3 
                     flex justify-between items-center shadow-md z-50"
        >
          <div className="ml-4 flex items-center">
            <span className="text-lg font-bold text-yellow-400">🟡 MyPlatform</span>
          </div>
          <div className="mr-4 flex gap-8 text-sm font-semibold">
            <a onClick={() => scrollToSection("architecture")} className="hover:text-yellow-300 transition cursor-pointer">Architecture</a>
            <a onClick={() => scrollToSection("cloud-formats")} className="hover:text-yellow-300 transition cursor-pointer">Cloud Formats</a>
          </div>
        </motion.nav>
      )}

      {/* 🌍 Contenu principal */}
      {animationFinished && (
        <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Build with data, instantly.</h1>
          <p className="text-lg text-gray-300 mb-6">
            Code, scale, and ship data workflows of any size.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/workbench")}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToSection("architecture")}
              className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
            >
              View Architecture
            </button>
          </div>
        </div>
      )}

      {/* 🔻 SECTION ARCHITECTURE */}
      {animationFinished && (
        <div id="architecture" className="w-full min-h-screen flex flex-col items-center pt-20 bg-black">
          <h2 className="text-4xl font-bold">Architecture de la Plateforme</h2>

          <img
            src="/architecture-diagram.png"
            alt="Architecture de la plateforme"
            className="w-3/4 max-w-4xl rounded-lg shadow-lg border border-gray-700 mt-10"
          />

          <div className="flex gap-12 mt-10 text-gray-400">
            <span className="text-xl font-semibold">🔹 Cloud Computing</span>
            <span className="text-xl font-semibold">🔹 Big Data</span>
            <span className="text-xl font-semibold">🔹 AI & Machine Learning</span>
          </div>

          <button
            onClick={() => scrollToSection("cloud-formats")}
            className="mt-12 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            Suivant
          </button>
        </div>
      )}

      {/* 🔻 SECTION FORMATS GÉOSPATIAUX */}
      {animationFinished && (
        <div id="cloud-formats" className="w-full min-h-screen flex flex-col items-center pt-20 bg-black">
          <h2 className="text-4xl font-bold mb-8">Cloud-Optimized Geospatial Formats</h2>

          <div className="flex gap-8">
            <div className="w-1/3 bg-gray-800 rounded-lg overflow-hidden">
              <img src="/cog-example.jpg" alt="COG Format" />
              <div className="p-4 text-center">
                <span className="text-xl font-bold">Cloud-Optimized GeoTIFF (COG)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
