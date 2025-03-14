"use client";

import { useRouter } from "next/navigation";

export default function Architecture() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* 📌 Barre de navigation */}
      <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white px-6 py-3 
                      flex justify-between items-center shadow-md z-50">
        <div className="ml-4 flex items-center">
          <span className="text-lg font-bold text-yellow-400 cursor-pointer" onClick={() => router.push("/")}>
            🟡 MyPlatform
          </span>
        </div>
        <div className="mr-4 flex gap-8 text-sm font-semibold">
          <a href="/product" className="hover:text-yellow-300 transition">Product</a>
          <a href="/resources" className="hover:text-yellow-300 transition">Resources</a>
          <a href="/docs" className="hover:text-yellow-300 transition">Docs</a>
          <a href="/architecture" className="hover:text-yellow-300 transition">Architecture</a>
        </div>
      </nav>

      {/* 🎯 Titre principal */}
      <h2 className="text-4xl font-bold mt-20">Architecture de la Plateforme</h2>

      {/* 🏗️ Image d'architecture */}
      <img
        src="/architecture-diagram.png"  // Remplace avec ton image
        alt="Architecture de la plateforme"
        className="w-3/4 max-w-4xl rounded-lg shadow-lg border border-gray-700 mt-10"
      />

      {/* 🔹 Technologies sous l'image */}
      <div className="flex gap-12 mt-10 text-gray-400">
        <span className="text-xl font-semibold">🔹 Cloud Computing</span>
        <span className="text-xl font-semibold">🔹 Big Data</span>
        <span className="text-xl font-semibold">🔹 AI & Machine Learning</span>
      </div>

      {/* 🔙 Retour */}
      <button onClick={() => router.push("/")} className="mt-12 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
        Retour à l'accueil
      </button>
    </div>
  );
}
