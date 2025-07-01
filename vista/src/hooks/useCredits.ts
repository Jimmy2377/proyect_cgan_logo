// hooks/useCredits.ts
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface UserCredits {
  id: string;
  user_id: string;
  credits: number;
  last_daily_credit: string;
  created_at: string;
  updated_at: string;
}

export const useCredits = (userId: string | null) => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los créditos del usuario
  const fetchCredits = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Primero intentar obtener los créditos existentes
      const { data: existingCredits, error: fetchError } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, es normal para usuarios nuevos
        throw fetchError;
      }

      if (!existingCredits) {
        // Usuario nuevo, crear registro con 30 créditos iniciales
        const { data: newCredits, error: insertError } = await supabase
          .from('user_credits')
          .insert([
            {
              user_id: userId,
              credits: 30,
              last_daily_credit: new Date().toISOString().split('T')[0]
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        
        setCredits(newCredits.credits);
      } else {
        // Usuario existente, verificar si necesita créditos diarios
        await checkAndAddDailyCredits(existingCredits);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar y añadir créditos diarios
  const checkAndAddDailyCredits = async (userCredits: UserCredits) => {
    const today = new Date().toISOString().split('T')[0];
    const lastCreditDate = userCredits.last_daily_credit;

    if (lastCreditDate !== today) {
      // Calcular días transcurridos
      const lastDate = new Date(lastCreditDate);
      const currentDate = new Date(today);
      const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 0) {
        // Añadir 10 créditos por cada día transcurrido
        const newCredits = userCredits.credits + (daysDiff * 10);
        
        const { data: updatedCredits, error: updateError } = await supabase
          .from('user_credits')
          .update({
            credits: newCredits,
            last_daily_credit: today
          })
          .eq('user_id', userId)
          .select()
          .single();

        if (updateError) throw updateError;
        
        setCredits(updatedCredits.credits);
        return;
      }
    }
    
    // No hay actualización necesaria
    setCredits(userCredits.credits);
  };

  // Función para usar créditos (restar)
  const consumeCredits = async (amount: number): Promise<boolean> => {
    if (!userId || credits < amount) {
      return false;
    }

    try {
      const newCredits = credits - amount;
      
      const { error } = await supabase
        .from('user_credits')
        .update({ credits: newCredits })
        .eq('user_id', userId);

      if (error) throw error;
      
      setCredits(newCredits);
      return true;
    } catch (err) {
      console.error('Error using credits:', err);
      setError(err instanceof Error ? err.message : 'Error al usar créditos');
      return false;
    }
  };

  // Función para recargar créditos manualmente
  const refreshCredits = () => {
    fetchCredits();
  };

  // Efecto para cargar créditos cuando cambia el userId
  useEffect(() => {
    fetchCredits();
  }, [userId]);

  return {
    credits,
    loading,
    error,
    useCredits: consumeCredits,
    refreshCredits
  };
};