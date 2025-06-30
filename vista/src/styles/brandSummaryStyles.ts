// src/styles/brandSummaryStyles.ts

export const brandSummaryStyles = {
  // Contenedor principal
  container: "flex flex-col items-center justify-start min-h-[350px] px-[20px] py-[24px]",
  
  // Header section
  header: {
    container: "text-center mb-[28px]",
    title: "text-[#FFFFFF] text-[22px] font-bold mb-[6px] tracking-[-0.02em]",
    subtitle: "text-[#B4B4B8] text-[14px] max-w-[520px] mx-auto leading-relaxed"
  },
  
  // Layout principal
  layout: {
    wrapper: "w-full max-w-[640px] space-y-[20px]",
    card: "bg-gradient-to-br from-[#2A1A3E] to-[#241436] rounded-[12px] p-[20px] border border-[#4A4A5A]/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300",
    cardHover: "hover:border-[#7C3AED]/40 hover:shadow-[0_8px_32px_rgba(124,58,237,0.15)]"
  },
  
  // Section headers
  sectionHeader: {
    container: "flex items-center mb-[14px]",
    icon: "w-[18px] h-[18px] mr-[8px] text-[#7C3AED]",
    title: "text-[#FFFFFF] text-[15px] font-semibold tracking-[-0.01em]",
    badge: "ml-[8px] text-[#9CA3AF] text-[13px] font-normal"
  },
  
  // Brand name section
  brandName: {
    container: "bg-gradient-to-r from-[#1A002E] to-[#2D1B3D] rounded-[10px] px-[18px] py-[14px] border border-[#7C3AED]/25",
    text: "text-[#FFFFFF] text-[18px] font-bold tracking-[-0.01em]"
  },
  
  // Categorization section
  categorization: {
    grid: "grid grid-cols-3 gap-[12px]",
    item: "bg-gradient-to-b from-[#1A002E] to-[#16001A] rounded-[10px] p-[14px] border border-[#7C3AED]/20 text-center hover:border-[#7C3AED]/40 transition-all duration-200",
    label: "text-[#9CA3AF] text-[11px] uppercase tracking-[0.5px] mb-[6px] font-medium",
    value: "text-[#FFFFFF] text-[13px] font-semibold leading-tight"
  },
  
  // Colors section
  colors: {
    container: "bg-gradient-to-r from-[#1A002E] to-[#2D1B3D] rounded-[10px] p-[18px] border border-[#7C3AED]/25",
    grid: "flex flex-wrap gap-[14px] justify-center",
    colorItem: {
      container: "flex flex-col items-center group cursor-pointer",
      circle: "w-[48px] h-[48px] rounded-full border-[2px] border-[#FFFFFF]/15 transition-all duration-300 group-hover:scale-110 group-hover:border-[#FFFFFF]/35 shadow-md group-hover:shadow-lg",
      label: "text-[#D1D5DB] text-[10px] mt-[6px] text-center max-w-[64px] leading-tight font-medium"
    },
    emptyState: {
      container: "text-center py-[16px]",
      text: "text-[#9CA3AF] text-[13px]"
    }
  },
  
  // Animations and effects
  animations: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    scaleIn: "animate-scale-in"
  },
  
  // Responsive breakpoints
  responsive: {
    mobile: "sm:px-[24px]",
    tablet: "md:px-[32px] md:max-w-[680px]",
    desktop: "lg:max-w-[720px]"
  }
};