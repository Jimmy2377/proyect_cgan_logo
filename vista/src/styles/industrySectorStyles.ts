// src/styles/industrySectorStyles.ts
export const industrySectorStyles = {
  // Contenedor principal - ahora con 3 secciones
  container: "h-full flex flex-col bg-[#1A002E]",
  
  // Primera sección - Industrias (1/3)
  industriesSection: "flex-1 p-[20px] border-b border-[#4B5563]",
  industriesTitle: "text-[#FFFFFF] text-[16px] font-semibold mb-[12px] leading-[22px]",
  industriesGrid: "flex flex-wrap gap-[10px]",
  
  // Segunda sección - Sectores (1/3)
  sectorsSection: "flex-1 p-[20px] border-b border-[#4B5563]",
  sectorsTitle: "text-[#FFFFFF] text-[16px] font-semibold mb-[12px] leading-[22px]",
  sectorsGrid: "flex flex-wrap gap-[10px]",
  sectorsPlaceholder: "text-[#9CA3AF] text-[13px] leading-[18px]",
  
  // Tercera sección - Etiquetas (1/3)
  tagsSection: "flex-1 p-[20px]",
  tagsTitle: "text-[#FFFFFF] text-[16px] font-semibold mb-[12px] leading-[22px]",
  tagsGrid: "flex flex-wrap gap-[10px]",
  tagsPlaceholder: "text-[#9CA3AF] text-[13px] leading-[18px]",
  
  // Botones de píldora - Estados base
  pillBase: "px-[14px] py-[6px] rounded-[20px] text-[13px] font-medium transition-all duration-[200ms] cursor-pointer border select-none",
  
  // Estados específicos
  pillNormal: "bg-[#374151] text-[#D1D5DB] border-[#4B5563] hover:bg-[#4B5563] hover:border-[#6B7280] hover:text-[#FFFFFF] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98]",
  
  pillSelected: "bg-[#7C3AED] text-[#FFFFFF] border-[#8B5CF6] shadow-[0_6px_16px_rgba(124,58,237,0.4)] scale-[1.02] hover:bg-[#6D28D9] hover:shadow-[0_8px_20px_rgba(124,58,237,0.6)]",
  
  pillDisabled: "bg-[#374151] text-[#6B7280] border-[#4B5563] cursor-not-allowed opacity-[0.5] hover:bg-[#374151] hover:border-[#4B5563] hover:text-[#6B7280] hover:shadow-none hover:scale-[1]"
};