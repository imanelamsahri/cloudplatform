"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { TextureLoader, RepeatWrapping } from "three";
import { motion } from "framer-motion";
import { Stars } from "@react-three/drei";
import { useRouter } from "next/navigation";

// 🌍 **Terre en rotation**
function RotatingSphere() {
  const globeRef = useRef();
  const texture = useLoader(TextureLoader, "/earth_night.gif");

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);

  let angle = 10;
  const rotationSpeed = 0.01;
  const maxAngle = Math.PI / 6;

  useFrame(() => {
    if (globeRef.current) {
      angle += rotationSpeed;
      globeRef.current.rotation.y = Math.sin(angle) * maxAngle;
    }
  });

  return (
    <mesh ref={globeRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} side={2} />
    </mesh>
  );
}

// 🌍 **Animation d'apparition de la Terre**
function AnimatedGlobe({ onAnimationEnd }: { onAnimationEnd: () => void }) {
  const [showGlobe, setShowGlobe] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowGlobe(false);
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    }, 5000);
  }, []);

  return (
    showGlobe && (
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 4 }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <Stars radius={400} depth={150} count={50000} factor={6} saturation={0} fade />
          <RotatingSphere />
        </Canvas>
      </motion.div>
    )
  );
}


// **🌌 Page principale avec sections Architecture & Cloud-Optimized Geospatial Formats**
export default function Home() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const router = useRouter();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* 🌍 Animation de la Terre avec étoiles */}
      {!animationFinished && <AnimatedGlobe onAnimationEnd={() => setAnimationFinished(true)} />}

      {/* 🌟 Beaucoup d'étoiles dans la page principale (50,000 étoiles) */}
      {animationFinished && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas>
            <ambientLight intensity={1.5} />
            <Stars radius={400} depth={150} count={50000} factor={6} saturation={0} fade />
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
              onClick={() => router.push("http://localhost:3000/workbench")}
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

      {/* 🔻 SECTION ARCHITECTURE (Fond noir sans étoiles) 🔻 */}
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

      {/* 🔻 SECTION CLOUD-OPTIMIZED GEOSPATIAL FORMATS (Fond noir sans étoiles) 🔻 */}
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

            <div className="w-1/3 bg-gray-800 rounded-lg overflow-hidden">
              <img src="/zarr-example.jpg" alt="Zarr Format" />
              <div className="p-4 text-center">
                <span className="text-xl font-bold">Zarr Format</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
