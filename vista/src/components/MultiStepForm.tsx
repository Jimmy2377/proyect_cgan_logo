// src/components/MultiStepForm.tsx
import { ProgressSteps } from "./ProgressSteps";
import { formStyles } from "../styles/formStyles";

interface MultiStepFormProps {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  user: any;
}

export function MultiStepForm({ currentPage, goToNextPage, goToPreviousPage, user }: MultiStepFormProps) {
  return (
    <div className={formStyles.container}>
      <ProgressSteps currentStep={currentPage} totalSteps={5} />

      {/* Contenido del formulario */}
      <div className={formStyles.contentContainer}>
        {currentPage === 1 && (
          <div className="flex justify-center items-center h-64">
            <h2 className={formStyles.welcome}>
              ¡Bienvenido, {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email}!
            </h2>
          </div>
        )}

        {currentPage === 2 && (
          <div className={formStyles.inputGroup}>
            {/* Contenido vacío para el paso 2 */}
          </div>
        )}

        {currentPage === 3 && (
          <div className={formStyles.inputGroup}>
            {/* Contenido vacío para el paso 3 */}
          </div>
        )}

        {currentPage === 4 && (
          <div className={formStyles.inputGroup}>
            {/* Contenido vacío para el paso 4 */}
          </div>
        )}

        {currentPage === 5 && (
          <div className={formStyles.inputGroup}>
            {/* Contenido vacío para el paso 5 */}
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      <div className={formStyles.buttonRow}>
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          className={`${formStyles.buttonBack} ${
            currentPage === 1 ? formStyles.buttonDisabled : ''
          }`}
        >
          ← Anterior
        </button>
        
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === 5}
          className={`${formStyles.buttonNext} ${
            currentPage === 5 ? formStyles.buttonDisabled : ''
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}