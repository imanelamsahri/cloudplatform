"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { TextureLoader, RepeatWrapping } from "three";
import { motion } from "framer-motion";
import { Stars } from "@react-three/drei";

// 🟡 **Interface des Props**
interface RotatingGlobeProps {
  onAnimationEnd?: () => void; // ✅ Rend `onAnimationEnd` optionnel
}

// 🌍 **Composant de la Terre en rotation**
function RotatingSphere() {
  const globeRef = useRef<any>(null);
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
const RotatingGlobe: React.FC<RotatingGlobeProps> = ({ onAnimationEnd }) => {
  const [showGlobe, setShowGlobe] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGlobe(false);
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

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
};

export default RotatingGlobe;
