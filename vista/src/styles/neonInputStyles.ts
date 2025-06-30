// src/styles/neonInputStyles.ts
export const neonInputStyles = {
  container: "w-[100%] max-w-[448px] mx-auto",
  
  errorMessage: "mb-[8px] text-[#EF5350] text-[14px] font-medium animate-pulse",
  
  inputWrapper: "relative", 
  
  label: {
    base: "absolute left-[16px] transition-all duration-[300ms] ease-out pointer-events-none z-[10]",
    active: "top-[8px] text-[12px] text-[#26C6DA] font-medium",
    inactive: "top-[16px] text-[16px] text-[#BDBDBD]",
    error: "text-[[#EF5350]]"
  },
  
  input: {
    base: `
      w-[100%] h-[30px] px-[16px] pt-[20px] pb-[8px] 
      bg-transparent border-[2px] rounded-[12px]
      text-[#FFFF] text-[16px] font-medium
      transition-all duration-[300ms] ease-out
      outline-none resize-none
      placeholder:text-[#9E9E9E] placeholder:text-[14px]
    `,
    normal: "border-[#757575] shadow-[0_0_10px_rgba(75,85,99,0.2)]",
    hovered: "border-[#AB47BC] shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    focused: "border-[#26C6DA] shadow-[0_0_25px_rgba(34,211,238,0.4)]",
    focusedExtra: "shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]",
    error: "border-[#F44336] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
  },
  
  glowEffect: `
    absolute inset-0 rounded-[12px] pointer-events-none
    transition-all duration-[500ms] ease-out
  `,
   glowActive: "bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.5)] to-transparent animate-[pulse_1.5s_ease-in-out_infinite]"
};