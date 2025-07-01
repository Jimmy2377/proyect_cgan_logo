// src/hooks/validationUtils.ts
export const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) {
    return 'El nombre de la marca es requerido';
  }
  if (name.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  if (name.trim().length > 30) {
    return 'El nombre no puede exceder 30 caracteres';
  }
  // Validar que solo contenga letras, espacios y caracteres especiales comunes
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'El nombre solo puede contener letras, espacios y caracteres especiales válidos';
  }
  return '';
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} es requerido`;
  }
  return '';
};