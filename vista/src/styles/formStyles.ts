// styles/formStyles.ts
export const formStyles = {
  // Contenedor principal
  container: "mx-auto relative",
  contentContainer: "min-h-[300px]",
  welcome: "text-3xl font-bold text-[#96f7e4] text-center",
  inputGroup: "space-y-[24px]",
  label: "block text-sm font-medium",
  input: "w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
  textarea: "w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
  
  // Botones de navegación
  buttonRow: "flex justify-between items-center gap-4 mt-8 mb-[25px]",

buttonBack: "group relative h-[48px] px-[32px] py-[12px] rounded-[16px] font-semibold text-[14px] " +
           "bg-gradient-to-br from-[#4A1B66] to-[#2D0A3D] text-[#E8D5FF] border-[1px] border-[#6B2D91]/30 " +
           "transition-all duration-300 ease-out transform " +
           "hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(139,69,193,0.4)] hover:border-[#8B45C1]/50 " +
           "active:scale-[0.98] active:shadow-[0_4px_16px_rgba(139,69,193,0.3)] " +
           "backdrop-blur-[8px] " +
           "before:content-[''] before:absolute before:inset-0 before:rounded-[16px] " +
           "before:bg-gradient-to-t before:from-transparent before:via-[#8B45C1]/10 before:to-[#E8D5FF]/20 " +
           "before:opacity-0 before:transition-opacity before:duration-300 " +
           "hover:before:opacity-100 " +
           "after:content-[''] after:absolute after:inset-[1px] after:rounded-[15px] " +
           "after:bg-gradient-to-b after:from-[#FFFFFF]/5 after:to-transparent " +
           "flex items-center justify-center gap-2 font-inter tracking-wide " +
           "shadow-[0_4px_20px_rgba(26,0,46,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]",

buttonNext: "group relative h-[48px] px-[32px] py-[12px] rounded-[16px] font-semibold text-[14px] " +
           "bg-gradient-to-br from-[#8B45C1] via-[#A855F7] to-[#C084FC] text-[#FFFFFF] " +
           "border-[1px] border-[#A855F7]/50 " +
           "transition-all duration-300 ease-out transform " +
           "hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(168,85,247,0.5)] " +
           "hover:bg-gradient-to-br hover:from-[#9333EA] hover:via-[#A855F7] hover:to-[#C084FC] " +
           "active:scale-[0.98] active:shadow-[0_6px_24px_rgba(168,85,247,0.4)] " +
           "backdrop-blur-[8px] " +
           "before:content-[''] before:absolute before:inset-0 before:rounded-[16px] " +
           "before:bg-gradient-to-t before:from-transparent before:via-[#FFFFFF]/10 before:to-[#FFFFFF]/30 " +
           "before:opacity-0 before:transition-opacity before:duration-300 " + 
           "hover:before:opacity-100 " +
           "after:content-[''] after:absolute after:inset-[1px] after:rounded-[15px] " +
           "after:bg-gradient-to-b after:from-[#FFFFFF]/20 after:to-transparent " +
           "flex items-center justify-center gap-2 font-inter tracking-wide " +
           "shadow-[0_6px_24px_rgba(139,69,193,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] " +
           "overflow-hidden " +
           "before-hover:animate-pulse",

buttonDisabled: "relative h-[48px] px-[32px] py-[12px] rounded-[16px] font-semibold text-[14px] " +
               "bg-gradient-to-br from-[#2A1135] to-[#1F0B29] text-[#6B2D91]/60 " +
               "border-[1px] border-[#3D1A4F]/30 cursor-not-allowed " +
               "shadow-[0_2px_8px_rgba(26,0,46,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] " +
               "backdrop-blur-[4px] opacity-60 " +
               "after:content-[''] after:absolute after:inset-[1px] after:rounded-[15px] " +
               "after:bg-gradient-to-b after:from-[#FFFFFF]/3 after:to-transparent " +
               "flex items-center justify-center gap-2 font-inter tracking-wide",
  
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
  currentStepTitle: "text-center",
  stepTitle: "text-3xl font-bold mb-[10px]",
};