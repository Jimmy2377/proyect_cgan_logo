// src/hooks/useStep3Validation.ts
import { useState } from 'react';

interface Step3ValidationErrors {
  colors: string;
}

export const useStep3Validation = () => {
  const [errors, setErrors] = useState<Step3ValidationErrors>({
    colors: ''
  });

  // Validar la selección de colores
  const validateColorSelection = (selectedColors: Set<number>): boolean => {
    if (selectedColors.size === 0) {
      setErrors(prev => ({ ...prev, colors: 'Debes seleccionar al menos un color' }));
      return false;
    }
    
    // Limpiar error si la validación es exitosa
    setErrors(prev => ({ ...prev, colors: '' }));
    return true;
  };

  // Limpiar errores cuando el usuario selecciona colores
  const handleColorSelectionChange = (selectedColors: Set<number>) => {
    if (errors.colors && selectedColors.size > 0) {
      setErrors(prev => ({ ...prev, colors: '' }));
    }
  };

  // Limpiar todos los errores
  const clearErrors = () => {
    setErrors({ colors: '' });
  };

  return {
    errors,
    validateColorSelection,
    handleColorSelectionChange,
    clearErrors
  };
};