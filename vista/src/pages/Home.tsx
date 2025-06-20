import React from 'react';
import { Navbar } from '../components/Navbar';
import Button from "../components/ui/Button";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a002e] to-[#220044] flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow text-center px-46 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#FFFF] drop-shadow-md">
          CREA UN LOGO MEMORABLE
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-20 text-white/90 leading-relaxed">
          Combina tus preferencias de diseño de logotipos con Inteligencia Artificial para ayudarte a crear un logotipo personalizado que hará que tu marca sea única y relevante.
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Button variant="stylegradient" className="w-68 text-[#FFFF] hover:text-[#FFFFF] transition">Crear mi logo</Button>
          {/* Si tuvieras más botones, asegúrate de que también tengan una clase w-48 o el ancho que desees */}
        </div>
      </main>
    </div>
  );
};