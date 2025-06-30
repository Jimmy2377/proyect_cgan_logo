// src/components/ProgressSteps.tsx
import { formStyles } from "../styles/formStyles";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  const steps = [
    { id: 1, title: "Datos de la marca" },
    { id: 2, title: "Industria y Sector" },
    { id: 3, title: "Paleta de Colores" },
    { id: 4, title: "✨ Resumen de tu Marca" },
    { id: 5, title: " ✨ Logo generado" }
  ];

  return (
    <div className={formStyles.progressWrapper}>
      {/* Barra de progreso */}
      <div className={formStyles.progressContainer}>
        {/* Línea de fondo */}
        <div 
          className={formStyles.progressBackgroundLine}
          style={{
            position: 'absolute',
            top: '24px',
            left: '0',
            width: '100%',
            height: '4px',
            backgroundColor: '#e5e7eb',
            zIndex: 10
          }}
        ></div>
        
        {/* Línea de progreso */}
        <div 
          className={formStyles.progressActiveLine}
          style={{ 
            position: 'absolute',
            top: '24px',
            left: '0',
            height: '4px',
            backgroundColor: '#3b82f6',
            transition: 'width 0.5s ease-in-out',
            zIndex: 20,
            width: currentStep === 1 ? '0%' : `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
        ></div>
        
        {/* Círculos de los pasos */}
        <div className={formStyles.stepsContainer}>
          {steps.map((step) => (
            <div key={step.id} className={formStyles.stepWrapper}>
              <div
                className={formStyles.stepCircle}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '4px solid',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 40,
                  backgroundColor: step.id <= currentStep ? '#3b82f6' : '#ffffff',
                  borderColor: step.id <= currentStep ? '#3b82f6' : '#d1d5db',
                  color: step.id <= currentStep ? '#ffffff' : '#9ca3af',
                  boxShadow: step.id <= currentStep ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                {step.id <= currentStep ? (
                  step.id === currentStep ? (
                    step.id
                  ) : (
                    <svg 
                      style={{ width: '24px', height: '24px' }} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )
                ) : (
                  step.id
                )}
              </div>
              
              {/* Etiquetas de los pasos */}
              <span 
                className={formStyles.stepLabel}
                style={{
                  marginTop: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  color: step.id <= currentStep ? '#59ffee' : '#9ca3af'
                }}
              >
                Paso {step.id}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Título del paso actual */}
      <div className={formStyles.currentStepTitle}>
        <h3 className={formStyles.stepTitle}>
          {steps[currentStep - 1].title}
        </h3>
      </div>
    </div>
  );
}