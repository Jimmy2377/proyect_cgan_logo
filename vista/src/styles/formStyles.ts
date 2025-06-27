// styles/formStyles.ts
export const formStyles = {
  // Contenedor principal con fondo blanco y esquinas redondeadas
  container: "w-full max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl relative z-10",
  contentContainer: "mb-12 min-h-[300px]",
  welcome: "text-3xl font-bold text-gray-800 text-center",
  inputGroup: "space-y-6",
  label: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
  textarea: "w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
  
  // Botones de navegación
  buttonRow: "flex justify-between items-center mt-8",
  buttonBack: "px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 shadow-md hover:shadow-lg",
  buttonNext: "px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg",
  buttonDisabled: "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200 hover:shadow-none",
  
  // Barra de progreso
  progressWrapper: "mb-12",
  progressContainer: "relative mb-12",
  progressBackgroundLine: "absolute top-6 left-0 w-full h-1 bg-gray-200 z-10",
  progressActiveLine: "absolute top-6 left-0 h-1 bg-blue-500 transition-all duration-500 ease-in-out z-20",
  stepsContainer: "relative flex justify-between z-30",
  stepWrapper: "flex flex-col items-center",
  stepCircle: "w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm transition-all duration-300 relative z-40",
  stepCompleted: "bg-blue-500 border-blue-500 text-white shadow-lg",
  stepPending: "bg-white border-gray-300 text-gray-400",
  checkIcon: "w-6 h-6",
  stepLabel: "mt-3 text-xs font-medium text-center leading-tight",
  labelActive: "text-blue-600",
  labelInactive: "text-gray-400",
  
  // Título del paso actual
  currentStepTitle: "text-center mb-8",
  stepTitle: "text-3xl font-bold text-gray-800 mb-2",
};