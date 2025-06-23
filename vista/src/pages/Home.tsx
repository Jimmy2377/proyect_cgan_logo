import logo from "../assets/logoarieswhite.png";
import logoletra from "../assets/logoletrawhite.png";
import Button from "../components/ui/Button";
import RegistroModal from "../components/RegistroModal";
import { useState } from "react";

export const Home = () => {

  const [showRegistroModal, setShowRegistroModal] = useState(false);

  const handleOpenModal = () => {
    setShowRegistroModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistroModal(false);
  };

  const handleRegister = (email: string, password: string) => {
    console.log('Datos de registro:', { email, password });
    // Aquí puedes agregar la lógica para enviar los datos al backend
    // Por ejemplo: registrarUsuario(email, password);
    handleCloseModal(); // Cerrar modal después del registro exitoso
  };

  const handleGoogleRegister = () => {
    console.log('Registro con Google iniciado');
    // Aquí puedes agregar la lógica para el registro con Google
    // Por ejemplo: iniciarRegistroGoogle();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a002e] to-[#220044] flex flex-col">
      {/* Navbar */}
      <nav className="flex w-full h-[60px] bg-black text-white mt-[20px]">
        {/* Sección izquierda - el logo y el texto Aries */}
        <div className="flex items-center space-x-[10px] pl-[20px]">
          <img src={logo} alt="Logo" className="h-full max-h-[34px] w-auto object-contain" />
          <img src={logoletra} alt="Logoletra" className="h-full max-h-[30px] w-auto object-contain" />
        </div>

        {/* Sección central - Como funciona */}
        <div className="flex justify-center items-center flex-grow">
          <Button variant="outline" className="text-[#FFFF] hover:text-[#FFFFF] transition">
            ¿Como funciona Aries?
          </Button>
        </div>

        {/* Sección derecha - Botones de acción */}
        <div className="flex items-center space-x-[10px] pr-[20px]">
          <Button variant="secondary">Iniciar Sesion</Button>
          <Button variant="primary" onClick={handleOpenModal}>Registrarse</Button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center py-16 sm:py-20 lg:py-24 w-full">
          {/* Hero Section */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20 xl:space-y-24 flex flex-col justify-center min-h-[60vh]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg leading-tight">
              CREA UN LOGO MEMORABLE
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto text-white/90 leading-relaxed font-light px-4">
              Combina tus preferencias de diseño con IA para crear un logotipo que haga tu marca única y relevante.
            </p>

            {/* CTA Section */}
            <div className="pt-8 sm:pt-12 lg:pt-16 xl:pt-20 justify-items-center">
              <Button variant="stylegradient">Crear mi logo</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm sm:text-base text-white/60">
            © 2025 Creador de logos. Diseña el futuro de tu marca.
          </p>
        </div>
      </footer>

      {/* Modal de Registro */}
      {showRegistroModal && (
        <RegistroModal
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onGoogleRegister={handleGoogleRegister}
        />
      )}
    </div>
  );
};
