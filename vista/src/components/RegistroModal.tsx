import { useState } from "react";
import { X, Mail, Globe } from "lucide-react";
import { registrarConEmail, registrarConGoogle } from "../../../controlador/auth.controller";

interface RegistroFormProps {
  onClose?: () => void;
}

const RegistroModal: React.FC<RegistroFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleSubmit = async () => {
    if (!email) return;
    setIsLoading(true);
    const resultado = await registrarConEmail(email);
    setIsLoading(false);

    if (!resultado.ok) {
      setMensajeError(resultado.error || "Ha ocurrido un error");
    } else {
      setMensajeError("");
      alert("Se ha enviado un enlace de acceso a tu correo electrónico.");
      onClose?.();
    }
  };

  const handleGoogleRegister = async () => {
    const resultado = await registrarConGoogle();
    if (!resultado.ok) {
      setMensajeError(resultado.error || "No se pudo autenticar con Google");
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
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Crear cuenta</h2>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "0.25rem" }}>
              Únete para disfrutar la experiencia
            </p>
            {mensajeError && (
              <p style={{ color: "#DC2626", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {mensajeError}
              </p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Mail
                size={20}
                style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  paddingLeft: "3rem",
                  paddingRight: "1rem",
                  height: "40px",
                  borderRadius: "9999px",
                  backgroundColor: "#f9fafb",
                  color: "#111827",
                  border: "1px solid #D1D5DB",
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !email}
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "9999px",
              background: "linear-gradient(to right, #A0C3FF, #D2A8FF)",
              color: "white",
              fontWeight: "600",
              border: "none",
              cursor: isLoading || !email ? "not-allowed" : "pointer",
              opacity: isLoading || !email ? 0.5 : 1,
              transform: "scale(1)",
              transition: "all 0.2s",
            }}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    marginRight: "0.5rem",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                Enviando...
              </div>
            ) : (
              "Registrarse con correo"
            )}
          </button>

          <div style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
              <div style={{ width: "100%", borderTop: "1px solid #D1D5DB" }}></div>
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.875rem",
                color: "#6B7280",
                backgroundColor: "white",
                padding: "0 1rem",
              }}
            >
              o
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "white",
              border: "1px solid #D1D5DB",
              color: "#374151",
              fontWeight: 600,
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <Globe size={18} style={{ marginRight: "0.5rem" }} />
            Registrarse con Google
          </button>

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#6B7280" }}>
            Al registrarte, aceptas nuestros{' '}
            <a
              href="#"
              style={{ color: "#3B82F6", fontWeight: 500, textDecoration: "none" }}
            >
              términos y condiciones
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistroModal;
