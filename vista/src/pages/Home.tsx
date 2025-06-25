import { useState } from "react";
import logo       from "../assets/logoarieswhite.png";
import logoletra  from "../assets/logoletrawhite.png";
import Button     from "../components/ui/Button";
import RegistroModal from "../components/RegistroModal";

export const Home = () => {
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a002e] to-[#220044] flex flex-col">
      {/* Navbar */}
      <nav className="flex w-full h-[60px] bg-black text-white mt-[20px]">
        {/* Logo */}
        <div className="flex items-center space-x-[10px] pl-[20px]">
          <img src={logo}       alt="Logo"       className="h-full max-h-[34px] w-auto" />
          <img src={logoletra}  alt="Logo Aries" className="h-full max-h-[30px] w-auto" />
        </div>

        {/* Centro */}
        <div className="flex justify-center items-center flex-grow">
          <Button variant="outline">¿Cómo funciona Aries?</Button>
        </div>

        {/* Acciones */}
        <div className="flex items-center space-x-[10px] pr-[20px]">
          <Button
            variant="primary"
            onClick={() => setShowRegistroModal(true)}
          >
            Iniciar sesión
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
            CREA UN LOGO MEMORABLE
          </h1>
          <p className="text-lg sm:text-2xl max-w-3xl mx-auto text-white/90 mt-8">
            Combina tus preferencias de diseño con IA para crear un logotipo que haga tu marca única y relevante.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-white/60">
        © 2025 Creador de logos. Diseña el futuro de tu marca.
      </footer>

      {/* Modal solo-Google */}
      {showRegistroModal && <RegistroModal onClose={() => setShowRegistroModal(false)} />}
    </div>
  );
};
