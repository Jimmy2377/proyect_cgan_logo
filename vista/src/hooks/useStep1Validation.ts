// src/hooks/useStep1Validation.ts
import { useState } from 'react';
import { validateName } from './validationUtils';

interface Step1Errors {
  name: string;
}

export const useStep1Validation = () => {
  const [errors, setErrors] = useState<Step1Errors>({
    name: ''
  });

  const validateStep1 = (name: string): boolean => {
    const nameError = validateName(name);
    
    setErrors({
      name: nameError
    });
    
    return !nameError;
  };

  const handleNameChange = (value: string) => {
    // Limpiar error si el usuario está escribiendo
    if (errors.name && value.trim().length > 0) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleNameBlur = (value: string) => {
    const error = validateName(value);
    setErrors(prev => ({ ...prev, name: error }));
  };

  const clearErrors = () => {
    setErrors({ name: '' });
  };

  return {
    errors,
    validateStep1,
    handleNameChange,
    handleNameBlur,
    clearErrors
  };
};