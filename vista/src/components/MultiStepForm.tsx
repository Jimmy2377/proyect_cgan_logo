// src/components/MultiStepForm.tsx
import React, { useState } from 'react';
import { ProgressSteps } from "./ProgressSteps";
import { formStyles } from "../styles/formStyles";
import { NeonInput } from "../components/ui/NeonInput";
import ColorCards from "./ColorCards";
import IndustrySectorSelector from "./IndustrySectorSelector";
import { BrandSummary } from "./BrandSummary";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { useCredits } from "../hooks/useCredits";

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

  // Hook para manejar créditos
  const { credits, useCredits: consumeCredits } = useCredits(user?.id);

  // Estado para manejar la carga al procesar créditos
  const [isProcessingCredits, setIsProcessingCredits] = useState(false);
  const [creditError, setCreditError] = useState<string | null>(null);

  // Manejador de cambios en el input de nombre
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateName(e.target.value);
  };

  // Manejador de blur en el input de nombre
  const handleNameBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    handleNameBlur(e.target.value);
  };

  // Validar antes de avanzar al siguiente paso
  const handleNextStep = async () => {
    // Limpiar errores previos
    setCreditError(null);

    // Validar el paso actual 
    const isValid = validateCurrentStep(currentPage);
    if (!isValid) {
      return;
    }

    // Si vamos del paso 4 al 5, necesitamos consumir créditos
    if (currentPage === 4) {
      // Verificar si el usuario tiene suficientes créditos
      if (credits < 10) {
        setCreditError('No tienes suficientes créditos para continuar. Necesitas 10 créditos.');
        return;
      }

      try {
        setIsProcessingCredits(true);
        
        // Intentar consumir los créditos
        const success = await consumeCredits(10);
        
        if (!success) {
          setCreditError('Error al procesar los créditos. Inténtalo de nuevo.');
          return;
        }
        
        // Si todo salió bien, avanzar al siguiente paso
        goToNextPage();
        
      } catch (error) {
        console.error('Error al consumir créditos:', error);
        setCreditError('Error al procesar los créditos. Inténtalo de nuevo.');
      } finally {
        setIsProcessingCredits(false);
      }
    } else {
      // Para otros pasos, avanzar normalmente
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
          <>
            <BrandSummary formData={formData} />

            {/* Información sobre el costo de créditos */}
            <div className="mt-[24px] mb-[8px] p-[16px] bg-[#6B46C1]/20 rounded-[8px] border border-[#A78BFA]/30"> {/* mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30 */}
              <div className="flex items-center space-x-[8px] mb-[8px]"> {/* space-x-2 mb-2 */}
                <svg className="w-[20px] h-[20px] text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20"> {/* w-5 h-5 text-yellow-400 */}
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.047.571 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                </svg>
                <span className="text-[#FFFFFF] font-[500]">Costo: 10 créditos</span> {/* text-white font-medium */}
              </div>
              <p className="text-[14px] text-[#D1D5DB]"> {/* text-sm text-gray-300 */}
                Al continuar al siguiente paso se consumirán 10 créditos de tu cuenta.
                {credits < 10 && (
                  <span className="text-[#F87171] block mt-[4px]"> {/* text-red-400 block mt-1 */}
                    ⚠️ No tienes suficientes créditos (tienes {credits}, necesitas 10)
                  </span>
                )}
              </p>
            </div>

            {/* Mostrar error de créditos si existe */}
            {creditError && (
              <div className="mt-[16px] mb-[8px] p-[12px] bg-[#7F1D1D]/20 border border-[#EF4444]/30 rounded-[8px]"> {/* mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg */}
                <p className="text-[#F87171] text-[14px] text-center">{creditError}</p> {/* text-red-400 text-sm text-center */}
              </div>
            )}
          </>
        )}

        {currentPage === 5 && (
            <div className={formStyles.inputGroup}>
              <div className="text-center">
                <div className="mb-[16px]"> {/* mb-4 */}
                  <svg className="w-[64px] h-[64px] text-[#4ADE80] mx-auto mb-[16px]" fill="currentColor" viewBox="0 0 20 20"> {/* w-16 h-16 text-green-400 mx-auto mb-4 */}
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[24px] font-[700] text-[#FFFFFF] mb-[8px]">¡Procesado con éxito!</h3> {/* text-2xl font-bold text-white mb-2 */}
                <p className="text-[#D1D5DB]"> {/* text-gray-300 */}
                  Se han consumido 10 créditos para procesar tu marca.
                </p>
              </div>
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
          disabled={currentPage === 5 || isProcessingCredits}
          className={`${formStyles.buttonNext} ${
            currentPage === 5 || isProcessingCredits ? formStyles.buttonDisabled : ''
          }`}
        >
          <span className="relative z-10">
            {isProcessingCredits ? 'Procesando...' : 
             currentPage === 4 ? 'Procesar (10 créditos)' : 'Siguiente'}
          </span>
          {!isProcessingCredits && (
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
          )}
        </button>
      </div>
    </div>
  );
}