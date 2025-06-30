// src/hooks/useStep2Validation.ts
import { useState, useCallback } from 'react';

export interface Step2Errors {
  industry: string;
  sector: string;
  tag: string;
}

export interface Step2ValidationData {
  selectedIndustry: string;
  selectedSector: string;
  selectedTag: string;
}

export const useStep2Validation = () => {
  const [errors, setErrors] = useState<Step2Errors>({
    industry: '',
    sector: '',
    tag: ''
  });

  // Limpiar errores individuales
  const clearError = useCallback((field: keyof Step2Errors) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  // Limpiar todos los errores
  const clearAllErrors = useCallback(() => {
    setErrors({
      industry: '',
      sector: '',
      tag: ''
    });
  }, []);

  // Validar datos del paso 2
  const validateStep2 = useCallback((data: Step2ValidationData): boolean => {
    let hasErrors = false;
    const newErrors: Step2Errors = {
      industry: '',
      sector: '',
      tag: ''
    };

    if (!data.selectedIndustry) {
      newErrors.industry = 'Debes seleccionar una industria';
      hasErrors = true;
    }

    if (!data.selectedSector) {
      newErrors.sector = 'Debes seleccionar un sector';
      hasErrors = true;
    }

    if (!data.selectedTag) {
      newErrors.tag = 'Debes seleccionar una etiqueta';
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  }, []);

  // Manejar cambios en las selecciones para limpiar errores automáticamente
  const handleSelectionChange = useCallback((industry: string, sector: string, tag: string) => {
    // Limpiar errores si el usuario selecciona
    if (errors.industry && industry) {
      clearError('industry');
    }
    if (errors.sector && sector) {
      clearError('sector');
    }
    if (errors.tag && tag) {
      clearError('tag');
    }
  }, [errors, clearError]);

  // Verificar si hay errores
  const hasErrors = useCallback((): boolean => {
    return !!(errors.industry || errors.sector || errors.tag);
  }, [errors]);

  // Obtener lista de errores activos
  const getActiveErrors = useCallback((): string[] => {
    const activeErrors: string[] = [];
    if (errors.industry) activeErrors.push(errors.industry);
    if (errors.sector) activeErrors.push(errors.sector);
    if (errors.tag) activeErrors.push(errors.tag);
    return activeErrors;
  }, [errors]);

  return {
    errors,
    validateStep2,
    clearError,
    clearAllErrors,
    handleSelectionChange,
    hasErrors,
    getActiveErrors
  };
};