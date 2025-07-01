// src/components/MultiStepForm.tsx
import React from 'react';
import { ProgressSteps } from "./ProgressSteps";
import { formStyles } from "../styles/formStyles";
import { NeonInput } from "../components/ui/NeonInput";
import ColorCards from "./ColorCards";
import IndustrySectorSelector from "./IndustrySectorSelector";
import { BrandSummary } from "./BrandSummary";
import { useMultiStepForm } from "../hooks/useMultiStepForm";

interface MultiStepFormProps {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  user: any;
}

export function MultiStepForm({ currentPage, goToNextPage, goToPreviousPage, user }: MultiStepFormProps) {
  // Hook principal que maneja todo el estado y validaciones
  const {
    formData,
    updateName,
    updateColors,
    updateIndustrySector,
    validateCurrentStep,
    handleNameBlur,
    step1Errors,
    step2Errors,
    step3Errors
  } = useMultiStepForm();

  // Manejador de cambios en el input de nombre
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateName(e.target.value);
  };

  // Manejador de blur en el input de nombre
  const handleNameBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    handleNameBlur(e.target.value);
  };

  // Validar antes de avanzar al siguiente paso
  const handleNextStep = () => {
    const isValid = validateCurrentStep(currentPage);
    if (isValid) {
      goToNextPage();
    }
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
                onBlur={handleNameBlurEvent}
                error={step1Errors.name}
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
                onSelectionChange={updateIndustrySector}
                selectedIndustry={formData.selectedIndustry}
                selectedSector={formData.selectedSector}
                selectedTag={formData.selectedTag}
              />
            </div>
            
            {/* Mostrar errores del paso 2 */}
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
              onChange={updateColors}
            />
            {step3Errors.colors && (
              <p className="text-[#F87171] text-[14px] mt-[16px] text-center">{step3Errors.colors}</p>
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