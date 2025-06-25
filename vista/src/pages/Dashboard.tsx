import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Plus, User } from "lucide-react";

// Tipos para los props del Sidebar
interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  user: any; // O puedes usar un tipo más específico como User de Supabase
  onLogout: () => void;
  onNewProject: () => void;
}

// Componente Sidebar reutilizable
const Sidebar = ({ isExpanded, onToggle, user, onLogout, onNewProject }: SidebarProps) => {
  return (
    <div className={`
      fixed left-0 top-0 h-full bg-purple-900 text-white transition-all duration-300 ease-in-out z-50
      ${isExpanded ? 'w-64' : 'w-16'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-purple-700">
          <div className="flex items-center justify-between">
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-purple-800 transition-colors"
              aria-label={isExpanded ? "Minimizar menú" : "Expandir menú"}
            >
              {isExpanded ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
            
            {isExpanded && (
              <div className="flex-1 ml-4">
                <img 
                  src="https://via.placeholder.com/120x40/6366f1/ffffff?text=LOGO" 
                  alt="Logo" 
                  className="h-8 w-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* New Project Button */}
        <div className="p-4">
          <button
            onClick={onNewProject}
            className={`
              bg-purple-600 hover:bg-purple-700 transition-colors rounded-full
              flex items-center justify-center
              ${isExpanded ? 'w-full px-4 py-3' : 'w-12 h-12'}
            `}
            aria-label="Nuevo proyecto"
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <span className="ml-2 font-medium">Nuevo Proyecto</span>
            )}
          </button>
        </div>

        {/* Projects Section */}
        <div className="flex-1 px-4">
          {isExpanded && (
            <div>
              <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wider">
                Proyectos
              </h3>
              <div className="text-purple-300 text-sm italic">
                No hay proyectos aún...
              </div>
            </div>
          )}
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-purple-700">
          <button
            onClick={onLogout}
            className={`
              bg-purple-600 hover:bg-purple-700 transition-colors rounded-full
              flex items-center w-full
              ${isExpanded ? 'px-4 py-3 justify-start' : 'w-12 h-12 justify-center'}
            `}
            aria-label={isExpanded ? `Cerrar sesión - ${user?.email}` : "Usuario"}
          >
            <User className="w-5 h-5 flex-shrink-0" />
            {isExpanded && user?.email && (
              <span className="ml-3 text-sm truncate">
                {user.email}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Dashboard principal
export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) console.error("Error al obtener el usuario:", error);
      if (!user) {
        navigate("/");
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNewProject = () => {
    console.log("Creando nuevo proyecto...");
    // Lógica para crear nuevo proyecto
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
        user={user}
        onLogout={handleLogout}
        onNewProject={handleNewProject}
      />

      {/* Main Content */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${sidebarExpanded ? 'ml-64' : 'ml-16'}
      `}>
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard
            </h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ¡Bienvenido, {user?.email}!
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para móviles cuando el sidebar está expandido */}
      {sidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}