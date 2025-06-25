import { useState } from "react";
import { X } from "lucide-react";
import { registrarConGoogle } from "../../../controlador/auth.controller";

interface RegistroFormProps {
  onClose?: () => void;
}

// Componente de icono de Google personalizado
const GoogleIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "0.5rem" }}
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Componente spinner de carga
const Spinner = () => (
  <div
    style={{
      width: "18px",
      height: "18px",
      border: "2px solid transparent",
      borderTop: "2px solid currentColor",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "0.5rem",
    }}
  />
);

// Modal de Términos y Condiciones independiente
const TerminosModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{modalStyles}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          zIndex: 50,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "600px",
            maxHeight: "80vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#6B7280",
              cursor: "pointer",
              background: "none",
              border: "none",
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          <div style={{ 
            textAlign: "center", 
            padding: "40px 30px 20px 30px",
            borderBottom: "1px solid #E5E7EB"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
              Términos y Condiciones
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "0.25rem" }}>
              Aries - Generador de Logotipos IA
            </p>
          </div>

          <div style={{
            padding: "20px 30px 30px 30px",
            overflowY: "auto",
            flex: 1,
            lineHeight: "1.6"
          }}>
            <div style={{ fontSize: "0.875rem", color: "#374151" }}>
              <p style={{ marginBottom: "16px", fontSize: "0.8rem", color: "#6B7280" }}>
                <strong>Última actualización:</strong> Junio 2025
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                1. Descripción del Servicio
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Aries es una plataforma de inteligencia artificial especializada en la generación de logotipos únicos 
                utilizando tecnología de redes generativas adversariales condicionales (cGANs). Nuestro servicio permite 
                a los usuarios crear diseños originales de manera automatizada.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                2. Modelo Freemium y Créditos
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Aries opera bajo un modelo freemium que otorga 5 generaciones diarias gratuitas. Los créditos no utilizados 
                se acumulan automáticamente. En caso de indisponibilidad del servicio, los créditos se preservan para uso posterior.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                3. Derechos de Propiedad Intelectual
              </h3>
              <p style={{ marginBottom: "12px" }}>
                <strong>Derechos del Usuario:</strong> Los usuarios registrados obtienen plenos derechos de autor sobre 
                todas las imágenes generadas por el modelo cGANs, sin limitaciones de uso comercial o personal.
              </p>
              <p style={{ marginBottom: "16px" }}>
                <strong>Derechos de Aries:</strong> No nos reservamos derechos de autor sobre los logos generados. 
                Únicamente almacenamos las imágenes creadas para el entrenamiento continuo de nuestro modelo de IA.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                4. Originalidad y Garantías
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Garantizamos que todos los logos generados son originales y únicos. Nuestro modelo ha sido entrenado 
                exclusivamente con diseños que no replican logos registrados o existentes en internet, asegurando 
                la originalidad de cada creación.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                5. Recopilación y Uso de Datos
              </h3>
              <p style={{ marginBottom: "12px" }}>
                <strong>Datos Recopilados:</strong>
              </p>
              <ul style={{ marginBottom: "12px", paddingLeft: "20px" }}>
                <li>Nombre de empresa (formulario de registro)</li>
                <li>Dirección de correo electrónico o cuenta de Google (autenticación)</li>
                <li>Logos generados (exclusivamente para entrenamiento del modelo)</li>
              </ul>
              <p style={{ marginBottom: "16px" }}>
                <strong>Compromiso de Privacidad:</strong> No compartimos datos personales con terceros. 
                Toda la información se utiliza únicamente para operar el servicio y mejorar nuestro modelo de IA.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                6. Jurisdicción y Ley Aplicable
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Estos términos se rigen por las leyes de Bolivia. Cualquier disputa será resuelta en los tribunales 
                competentes de Bolivia, aunque el servicio esté disponible globalmente vía web.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                7. Limitación de Responsabilidad
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Aries proporciona el servicio "tal como está". Aunque garantizamos la originalidad de nuestras creaciones, 
                el usuario es responsable del uso final de los logos generados. No nos hacemos responsables por el uso 
                indebido o ilegal de los diseños creados.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                8. Modificaciones
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
                en vigor inmediatamente tras su publicación en la plataforma.
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                9. Contacto
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Para consultas sobre estos términos o el servicio, puedes contactarnos a través de los canales 
                oficiales disponibles en la plataforma Aries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RegistroModal: React.FC<RegistroFormProps> = ({ onClose }) => {
  const [mensajeError, setMensajeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTerminos, setShowTerminos] = useState(false);

  const handleGoogleRegister = async () => {
    console.log("🔄 Iniciando carga..."); // Debug
    setIsLoading(true);
    setMensajeError(""); // Limpiar errores anteriores
    
    try {
      // Delay mínimo para asegurar que se vea el estado de carga
      const [resultado] = await Promise.all([
        registrarConGoogle(),
        new Promise(resolve => setTimeout(resolve, 1000)) // 1 segundo mínimo
      ]);
      
      console.log("✅ Resultado:", resultado); // Debug
      if (!resultado.ok) {
        setMensajeError(resultado.error || "No se pudo autenticar con Google");
      }
    } catch (error) {
      console.log("❌ Error:", error); // Debug
      setMensajeError("Error de conexión. Intenta nuevamente.");
    } finally {
      console.log("🏁 Finalizando carga..."); // Debug
      setIsLoading(false);
    }
  };

  const modalStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .google-button {
      width: 100%;
      height: 40px;
      background: linear-gradient(135deg, #007ed3, #3cb0ff);
      border: none;
      color: white;
      font-weight: 600;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 126, 211, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .google-button:hover:not(:disabled) {
      background: white;
      color: black;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .google-button:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 6px rgba(0, 126, 211, 0.4);
    }
    
    .google-button:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  `;

  // Si se muestran los términos, mostrar solo ese modal
  if (showTerminos) {
    return <TerminosModal onClose={() => setShowTerminos(false)} />;
  }

  return (
    <>
      <style>{modalStyles}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          zIndex: 50,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "380px",
            padding: "40px 30px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#6B7280",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            <X size={20} />
          </button>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Iniciar sesión</h2>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "0.25rem" }}>
              Elje una cuenta para registrarte o iniciar sesion y disfruta la experiencia de Aries
            </p>
            {mensajeError && (
              <p style={{ color: "#DC2626", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {mensajeError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="google-button"
          >
            {isLoading ? <Spinner /> : <GoogleIcon size={18} />}
            {isLoading ? "Registrando..." : "Registrarse con Google"}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#6B7280" }}>
            Al registrarte, aceptas nuestros{" "}
            <button
              onClick={() => setShowTerminos(true)}
              style={{ 
                color: "#3B82F6", 
                fontWeight: 500, 
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0
              }}
            >
              términos y condiciones
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistroModal;