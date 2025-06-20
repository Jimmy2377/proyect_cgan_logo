import { supabase } from "../lib/supabaseClient";

export async function registrarUsuario(email: string, password: string) {
  // Validación mínima
  if (!email || !password) {
    return { ok: false, error: "Email y contraseña son obligatorios." };
  }

  // Seguridad: requerir contraseña segura (al menos 6 caracteres)
  if (password.length < 6) {
    return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: "Error inesperado. Intenta nuevamente." };
  }
}