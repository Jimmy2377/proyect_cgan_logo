import React from 'react';
import logo from "../assets/logoarieswhite.png";
import logoletra from "../assets/logoletrawhite.png";
import Button from "../components/ui/Button";

export const Navbar = () => {
  return (
    <nav className="flex w-full h-[60px] bg-black text-white mt-[20px]">
      {/* Sección izquierda - el logo y el texto Aries */}
      <div className="flex items-center space-x-[10px] pl-[20px]"> {/* Añadido pl-[20px] para padding izquierdo */}
        <img src={logo} alt="Logo" className="h-full max-h-[34px] w-auto object-contain" />
        <img src={logoletra} alt="Logoletra" className="h-full max-h-[30px] w-auto object-contain" />
      </div>

      {/* Sección central - Como funciona */}
      <div className="flex justify-center items-center flex-grow"> {/* flex-grow hará que este div ocupe el espacio restante */}
        <Button variant="outline" className="text-[#FFFF] hover:text-[#FFFFF] transition">¿Como funciona Aries?</Button>
      </div>

      {/* Sección derecha - Botones de acción */}
      <div className="flex items-center space-x-[10px] pr-[20px]"> {/* Añadido pr-[20px] para padding derecho */}
        <Button variant="secondary" className="text-[#FFFF] hover:text-[#FFFFF] transition">Iniciar Sesion</Button>
        <Button variant="primary" className="text-[#FFFF] hover:text-[#FFFFF] transition">Registrarse</Button>
      </div>
    </nav>
  );
};
