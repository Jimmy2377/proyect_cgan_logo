// src/hooks/useMultiStepForm.ts
import { useState } from 'react';
import { useStep1Validation } from './useStep1Validation';
import { useStep2Validation } from './useStep2Validation';
import { useStep3Validation } from './useStep3Validation';

export interface FormData {
  name: string;
  selectedColors: Set<number>;
  selectedIndustry: string;
  selectedSector: string;
  selectedTag: string;
}

export const useMultiStepForm = () => {
  // Estado principal del formulario
  const [formData, setFormData] = useState<FormData>({
    name: '',
    selectedColors: new Set<number>(),
    selectedIndustry: '',
    selectedSector: '',
    selectedTag: ''
  });

  // Hooks de validación para cada paso
  const step1Validation = useStep1Validation();
  const step2Validation = useStep2Validation();
  const step3Validation = useStep3Validation();

  // Funciones para actualizar el estado del formulario
  const updateName = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
    step1Validation.handleNameChange(name);
  };

  const updateColors = (selectedColors: Set<number>) => {
    setFormData(prev => ({ ...prev, selectedColors }));
    step3Validation.handleColorSelectionChange(selectedColors);
  };

  const updateIndustrySector = (industry: string, sector: string, tag: string) => {
    setFormData(prev => ({ 
      ...prev, 
      selectedIndustry: industry,
      selectedSector: sector,
      selectedTag: tag
    }));
    step2Validation.handleSelectionChange(industry, sector, tag);
  };

  // Validación por pasos
  const validateCurrentStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return step1Validation.validateStep1(formData.name);
      case 2:
        return step2Validation.validateStep2({
          selectedIndustry: formData.selectedIndustry,
          selectedSector: formData.selectedSector,
          selectedTag: formData.selectedTag
        });
      case 3:
        return step3Validation.validateColorSelection(formData.selectedColors);
      default:
        return true;
    }
  };

  // Manejadores de eventos
  const handleNameBlur = (value: string) => {
    step1Validation.handleNameBlur(value);
  };

  // Reset del formulario
  const resetForm = () => {
    setFormData({
      name: '',
      selectedColors: new Set<number>(),
      selectedIndustry: '',
      selectedSector: '',
      selectedTag: ''
    });
    step1Validation.clearErrors();
    // Asumiendo que los otros hooks tienen métodos de limpieza similares
    // step2Validation.clearErrors?.();
    // step3Validation.clearErrors?.();
  };

  return {
    // Estado del formulario
    formData,
    
    // Funciones de actualización
    updateName,
    updateColors,
    updateIndustrySector,
    
    // Validaciones
    validateCurrentStep,
    handleNameBlur,
    
    // Errores por paso
    step1Errors: step1Validation.errors,
    step2Errors: step2Validation.errors,
    step3Errors: step3Validation.errors,
    
    // Utilidades
    resetForm
  };
};