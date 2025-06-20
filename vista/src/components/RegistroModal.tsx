import { useState } from "react";
import { registrarUsuario } from "../../../controlador/auth.controller";
import {
  inputStyle,
  buttonPrimary,
  buttonGoogle,
  modalBackdrop,
  modalBox,
} from "../styles/formStyles.ts";
import { supabase } from "../../../lib/supabaseClient";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function RegistroModal({ visible, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  if (!visible) return null;

  const handleRegistro = async () => {
    const res = await registrarUsuario(email, password);
    if (res.ok) {
      setMensaje("Revisa tu correo para confirmar el registro.");
    } else {
      setMensaje(res.error || "Error desconocido.");
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setMensaje(error.message);
  };

  return (
    <div className={modalBackdrop}>
      <div className={modalBox}>
        <h2 className="text-lg font-bold text-center">Crear cuenta</h2>
        {mensaje && <p className="text-sm text-red-600 text-center">{mensaje}</p>}

        <input
          className={inputStyle}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={inputStyle}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegistro} className={buttonPrimary}>
          Registrarse
        </button>

        <div className="text-center text-sm text-gray-500">o</div>

        <button onClick={handleGoogle} className={buttonGoogle}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Registrarse con Google
        </button>

        <button onClick={onClose} className="text-sm text-gray-500 hover:underline mx-auto block mt-2">
          Cancelar
        </button>
      </div>
    </div>
  );
}