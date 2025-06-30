//pages/Dashboard.tsx
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Plus, User, PanelLeftClose, PanelLeft } from "lucide-react";
import { dashboardStyles } from "../styles/dashboardStyles";
import logoletra  from "../assets/logoletrawhite.png";
import logoisotipo from "../assets/logoarieswhite.png";
import { MultiStepForm } from "../components/MultiStepForm";

// Tipos para los props del Sidebar
interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  user: any; // se puede usar un tipo más específico como User de Supabase
  onLogout: () => void;
  onNewProject: () => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}

// Componente Sidebar reutilizable
const Sidebar = ({ isExpanded, onToggle, user, onLogout, onNewProject, sidebarRef }: SidebarProps) => {
  return (
    <div ref={sidebarRef} className={dashboardStyles.sidebar.container(isExpanded)}>
      <div className={dashboardStyles.common.flexCol + " h-full"}>
        {/* Header */}
        <div className={dashboardStyles.sidebar.header(isExpanded)}>
          {isExpanded && (
            <div className="flex-1 ml-4">
              <img 
                src={logoletra}
                className={dashboardStyles.sidebar.logo}
              />
            </div>
          )}
          <button
            onClick={onToggle}
            className={dashboardStyles.sidebar.toggleButton}
            aria-label={isExpanded ? "Minimizar menú" : "Expandir menú"}
          >
            {isExpanded ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* New Project Button */}
        <div className={isExpanded ? "px-[33px] py-4" : "px-1 py-4 flex justify-center"}>
          <button
            onClick={onNewProject}
            className={dashboardStyles.sidebar.newProjectButton(isExpanded)}
            aria-label="Nuevo proyecto"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            {isExpanded && (
              <span className="ml-2">Nuevo Proyecto</span>
            )}
          </button>
        </div>

        {/* Projects Section */}
        <div className={dashboardStyles.sidebar.projectsSection(isExpanded)}>
          {isExpanded && (
            <div>
              <h3 className={dashboardStyles.sidebar.projectsTitle}>
                Proyectos
              </h3>
              <div className={dashboardStyles.sidebar.noProjects}>
                No hay proyectos aún...
              </div>
            </div>
          )}
        </div>

        {/* User Footer */}
        <div className={dashboardStyles.sidebar.userFooter(isExpanded)}>
          <button
            onClick={onLogout}
            className={dashboardStyles.sidebar.userButton(isExpanded)}
            aria-label={isExpanded ? `Cerrar sesión - ${user?.email}` : "Usuario"}
          >
            <User className="w-4 h-4 flex-shrink-0" />
            {isExpanded && user?.email && (
              <span className={"ml-3 text-sm " + dashboardStyles.common.textTruncate}>
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
  const [currentPage, setCurrentPage] = useState(1); // control del paso
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  // Efecto para manejar clicks fuera del sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node) && 
          sidebarExpanded) {
        setSidebarExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarExpanded]);

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
      <div className={dashboardStyles.main.loading}>
        <div className={dashboardStyles.main.loadingText}>Cargando...</div>
      </div>
    );
  }

  //Estados y lógica de navegación del formulario
  const goToNextPage = () => {
  if (currentPage < 5) {
    setCurrentPage(prev => prev + 1);
  }
};

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(prev => prev - 1);
  }
};

  return (
    <div className="min-h-screen bg-[#1a002e] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
        user={user}
        onLogout={handleLogout}
        onNewProject={handleNewProject}
        sidebarRef={sidebarRef}
      />

      {/* Header */}
      <div className={dashboardStyles.header.container(sidebarExpanded)}>
        <div className={dashboardStyles.header.content}>
          <img 
            src={logoisotipo} 
            className={dashboardStyles.header.logo}
            alt="Logo"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={dashboardStyles.main.container(sidebarExpanded)}>
        <div>
          <MultiStepForm
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            user={user} 
          />
        </div>
      </div>

      {/* Overlay para móviles cuando el sidebar está expandido */}
      {sidebarExpanded && (
        <div 
          className={dashboardStyles.main.overlay}
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}