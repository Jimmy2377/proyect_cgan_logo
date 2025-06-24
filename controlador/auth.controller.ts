import { supabase } from "../lib/supabaseClient";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Correo inválido" })
    .refine(
      (email) =>
        email.endsWith("@gmail.com") || email.endsWith("@udabol.edu.bo"),
      { message: "Solo se permiten correos @gmail.com o @udabol.edu.bo" }
    ),
});

// Registro con magic link (email sin contraseña)
export async function registrarConEmail(email: string) {
  const validacion = schema.safeParse({ email });
  if (!validacion.success) {
    return { ok: false, error: validacion.error.errors[0].message };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: "http://localhost:5173/",
      },
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Error inesperado. Intenta nuevamente." };
  }
}

// Registro o inicio con Google
export async function registrarConGoogle() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Error al autenticar con Google" };
  }
}
