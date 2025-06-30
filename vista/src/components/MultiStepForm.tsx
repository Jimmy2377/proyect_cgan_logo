// src/components/MultiStepForm.tsx
import { ProgressSteps } from "./ProgressSteps";
import { formStyles } from "../styles/formStyles";
import React, { useState } from 'react';
import { NeonInput } from "../components/ui/NeonInput";
import { validateName } from "../hooks/validationUtils";
import ColorCards from "./ColorCards";
import IndustrySectorSelector from "./IndustrySectorSelector";
import { BrandSummary } from "./BrandSummary";
import { useStep2Validation } from "../hooks/useStep2Validation";

interface MultiStepFormProps {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  user: any;
}

export function MultiStepForm({ currentPage, goToNextPage, goToPreviousPage, user }: MultiStepFormProps) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    selectedColors: new Set<number>(),
    selectedIndustry: '',
    selectedSector: '',
    selectedTag: ''
  }); 
  
  // Estado para errores (excepto paso 2)
  const [errors, setErrors] = useState({
    name: '',
    colors: ''
  });

  // Hook para validación del paso 2
  const {
    errors: step2Errors,
    validateStep2,
    handleSelectionChange: handleStep2SelectionChange
  } = useStep2Validation();

  // Manejador de cambios en el input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, name: value }));
    
    // Limpiar error si el usuario está escribiendo
    if (errors.name && value.trim().length > 0) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  // Manejador de cambios en las tarjetas de colores
  const handleColorChange = (selectedCards: Set<number>) => {
    setFormData(prev => ({ ...prev, selectedColors: selectedCards }));
    
    // Limpiar error si el usuario selecciona colores
    if (errors.colors && selectedCards.size > 0) {
      setErrors(prev => ({ ...prev, colors: '' }));
    }
  };

  // Manejador de cambios en industria, sector y etiqueta
  const handleIndustrySectorChange = (industry: string, sector: string, tag: string) => {
    setFormData(prev => ({ 
      ...prev, 
      selectedIndustry: industry,
      selectedSector: sector,
      selectedTag: tag
    }));
    
    // Usar el hook para manejar la limpieza de errores
    handleStep2SelectionChange(industry, sector, tag);
  };

  // Validación en blur
  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateName(value);
    setErrors(prev => ({ ...prev, name: error }));
  };

  // Validar antes de avanzar al siguiente paso
  const handleNextStep = () => {
    if (currentPage === 1) {
      const nameError = validateName(formData.name);
      if (nameError) {
        setErrors(prev => ({ ...prev, name: nameError }));
        return; // No avanzar si hay errores
      }
    }
    
    if (currentPage === 2) {
      const isValid = validateStep2({
        selectedIndustry: formData.selectedIndustry,
        selectedSector: formData.selectedSector,
        selectedTag: formData.selectedTag
      });
      
      if (!isValid) return; // No avanzar si hay errores
    }
    
    if (currentPage === 3) {
      if (formData.selectedColors.size === 0) {
        setErrors(prev => ({ ...prev, colors: 'Debes seleccionar al menos un color' }));
        return; // No avanzar si no hay colores seleccionados
      }
    }
    
    // Si no hay errores, avanza al siguiente
    goToNextPage();
  };

  return (
    <div className={formStyles.container}>
      <ProgressSteps currentStep={currentPage} totalSteps={5} />

      {/* Contenido del formulario */}
      <div className={formStyles.contentContainer}>
        {currentPage === 1 && (
          <div className="flex flex-col items-center justify-center min-h-[256px]">
            <h2 className={formStyles.welcome}>
              ¡Bienvenido, {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email}!
            </h2>
            {/* Campo de nombre */}
            <div className="w-full">
              <NeonInput
                label="Nombre de la Marca"
                placeholder="Ingresa el nombre de la Marca..."
                value={formData.name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                error={errors.name}
                required
                className="mx-auto"
              />
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="flex flex-col h-full">
            <div className="text-center mb-4">
              <p className="text-[#D1D5DB] text-[15px] max-w-[672px] mx-auto">
                Selecciona la industria, sector específico y etiqueta que mejor describa tu marca
              </p>
            </div>
            
            <div className="flex-1 min-h-[500px]">
              <IndustrySectorSelector 
                onSelectionChange={handleIndustrySectorChange}
                selectedIndustry={formData.selectedIndustry}
                selectedSector={formData.selectedSector}
                selectedTag={formData.selectedTag}
              />
            </div>
            
            {/* Mostrar errores usando el hook */}
            {(step2Errors.industry || step2Errors.sector || step2Errors.tag) && (
              <div className="mt-[16px] text-center">
                {step2Errors.industry && (
                  <p className="text-[#F87171] text-[14px] mb-[8px]">{step2Errors.industry}</p>
                )}
                {step2Errors.sector && (
                  <p className="text-[#F87171] text-[14px] mb-[8px]">{step2Errors.sector}</p>
                )}
                {step2Errors.tag && (
                  <p className="text-[#F87171] text-[14px]">{step2Errors.tag}</p>
                )}
              </div>
            )}
          </div>
        )}

        {currentPage === 3 && ( 
          <div className="flex flex-col items-center justify-center">
            <p className="text-[#D1D5DB] text-center max-w-[672px]">
              Elige hasta 3 colores que transmitan la personalidad y valores de tu marca
            </p>
            <ColorCards 
              selectedCards={formData.selectedColors}
              onChange={handleColorChange}
            />
            {errors.colors && (
              <p className="text-[#F87171] text-[14px] mt-[16px] text-center">{errors.colors}</p>
            )}
          </div>
        )}

        {currentPage === 4 && (
          <BrandSummary formData={formData} />
        )}

        {currentPage === 5 && (
          <div className={formStyles.inputGroup}>
            {/* Contenido vacío para el paso 5 */}
          </div>
        )}
      </div>

      {/* Botones de navegación modernos */}
      <div className={formStyles.buttonRow}>
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          className={`${formStyles.buttonBack} ${
            currentPage === 1 ? formStyles.buttonDisabled : ''
          }`}
        >
          <svg 
            className="w-[16px] h-[16px] transition-transform duration-300 group-hover:-translate-x-[2px]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="relative z-10">Anterior</span>
        </button>
        
        <button 
          onClick={handleNextStep}  
          disabled={currentPage === 5}
          className={`${formStyles.buttonNext} ${
            currentPage === 5 ? formStyles.buttonDisabled : ''
          }`}
        >
          <span className="relative z-10">Siguiente</span>
          <svg 
            className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-[2px]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}