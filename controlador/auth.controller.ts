import { supabase } from "../lib/supabaseClient";

// Registro o inicio con Google
export async function registrarConGoogle() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/dashboard", // cámbialo si usas otra ruta
      },
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Error al autenticar con Google" };
  }
}
