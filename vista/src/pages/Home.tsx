import { Navbar } from '../components/Navbar';
import Button from "../components/ui/Button";

export const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a002e] to-[#220044] flex flex-col">
      <Navbar />
      
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
              <Button variant="stylegradient">
              Crear mi logo
              </Button>
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
    </div>
  );
};