// styles/formStyles.ts
export const formStyles = {
  // Contenedor principal con fondo blanco y esquinas redondeadas
  container: "w-full max-w-4xl mx-auto p-8 rounded-xl shadow-2xl relative z-10",
  contentContainer: "mb-12 min-h-[300px]",
  welcome: "text-3xl font-bold text-[#96f7e4] text-center",
  inputGroup: "space-y-6",
  label: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
  textarea: "w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
  
  // Botones de navegación
  buttonRow: "flex justify-between items-center mt-8",
  buttonBack: "h-[30px] px-[30px] py-[20px] rounded-full font-bold transition-all duration-200 bg-[#8195a1] border-none relative font-poppins" +
              "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-white/20 before:opacity-0 before:transition-opacity before:duration-200 " +
              "hover:before:opacity-100 active:before:bg-none active:bg-[#606060] active:top-[1px] " +
              "drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.35)] " +
              "flex items-center justify-center",
  buttonNext: "h-[30px] px-[30px] py-[20px] rounded-full font-bold transition-all duration-200 bg-[#3B82F6] text-[#FFFF] border-none relative " +
              "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-white/20 before:opacity-0 before:transition-opacity before:duration-200 " +
              "hover:before:opacity-100 active:before:bg-none active:bg-[#2563EB] active:top-[1px] " +
              "drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.35)] " +
              "flex items-center justify-center",
  buttonDisabled: "h-[30px] px-[30px] py-[20px] rounded-full font-bold bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed border-none " +
                  "drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] " + // Sombra ligera para mantener un poco de profundidad
                  "flex items-center justify-center",
  
  // Barra de progreso
  progressWrapper: "mb-12",
  progressContainer: "relative mb-12",
  progressBackgroundLine: "absolute top-6 left-0 w-full h-1 bg-[#EEEEEE] z-10",
  progressActiveLine: "absolute top-6 left-0 h-1 bg-[#BDBDBD] transition-all duration-500 ease-in-out z-20",
  stepsContainer: "relative flex justify-between z-30",
  stepWrapper: "flex flex-col items-center",
  stepCircle: "w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm transition-all duration-300 relative z-40",
  stepCompleted: "bg-[#BDBDBD] border-[#BDBDBD] text-white shadow-lg",
  stepPending: "bg-[#ffff] border-[#BDBDBD] text-[#BDBDBD]",
  checkIcon: "w-6 h-6",
  stepLabel: "mt-3 text-xs font-medium text-center leading-tight",
  labelActive: "text-[#1E88E5]",
  labelInactive: "text-[#9f9fa9]",
  
  // Título del paso actual
  currentStepTitle: "text-center mb-8",
  stepTitle: "text-3xl font-bold text-gray-800 mb-2",
};