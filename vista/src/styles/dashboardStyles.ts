// styles/dashboardStyles.ts
export const dashboardStyles = {
  // Sidebar styles
  sidebar: {
    container: (isExpanded: boolean) => `
      fixed left-0 top-0 h-screen bg-[#1D143B] text-[#FFFFFF] transition-all duration-500 ease-in-out z-50
      ${isExpanded ? 'w-64' : 'w-9'}
    `,
    header: (isExpanded: boolean) => `
      pt-[20px] pb-[32px] flex items-center justify-between
      ${isExpanded ? 'px-[33px]' : 'px-[5px]'}
    `,
    toggleButton: "text-[#FFFFFF] hover:text-[#FFFFFF] bg-transparent border-none outline-none focus:outline-none",
    logo: "h-full max-h-[30px] w-auto",
    newProjectButton: (isExpanded: boolean) => `
      bg-gradient-to-r from-[#B63DF8] to-[#4CB9FD] hover:bg-gradient-to-r hover:from-[#4CB9FD] hover:to-[#B63DF8] active:bg-white 
      text-[#FFFFFF] hover:text-[#FFFFFF] active:text-[#1D143B] font-inter font-bold 
      transition-all duration-300 ease-in-out border-none outline-none focus:outline-none 
      flex items-center drop-shadow-[0_0_10px_#C89EFF] hover:drop-shadow-[0_0_15px_#C89EFF]
      ${isExpanded 
        ? 'w-full h-[44px] px-[20px] rounded-full justify-center' 
        : 'w-[32px] h-[32px] rounded-full justify-center mx-auto'}
    `,
    projectsSection: (isExpanded: boolean) => `
      flex-1 ${isExpanded ? 'px-[33px]' : 'px-1 flex flex-col items-center'}
    `,
    projectsTitle: "text-sm font-semibold text-[#FFFFFF] mb-3 uppercase tracking-wider",
    noProjects: "text-[#FFFFFF] text-sm italic",
    userFooter: (isExpanded: boolean) => `
      pb-[30px] ${isExpanded ? 'px-[33px]' : 'px-1 flex justify-center'}
    `,
    userButton: (isExpanded: boolean) => `
      bg-gradient-to-r from-[#B63DF8] to-[#4CB9FD] hover:bg-gradient-to-r hover:from-[#4CB9FD] hover:to-[#B63DF8] active:bg-white 
      text-[#FFFFFF] hover:text-[#FFFFFF] active:text-[#1D143B] font-inter font-bold 
      transition-all duration-300 ease-in-out border-none outline-none focus:outline-none 
      flex items-center drop-shadow-[0_0_10px_#C89EFF] hover:drop-shadow-[0_0_15px_#C89EFF]
      ${isExpanded 
        ? 'w-full h-[44px] px-[20px] rounded-full justify-start' 
        : 'w-[32px] h-[32px] rounded-full justify-center'}
    `,
  },

  // Header styles
  header: {
    container: (_sidebarExpanded: boolean) => `
      fixed top-0 bg-[#1a002e] z-40 transition-none
      ml-[66px] pl-12 pt-[20px]
    `,
    content: "flex items-center p-6",
    logo: "h-[50px] w-auto",
  },

  // Main content styles
  main: {
    container: (_sidebarExpanded: boolean) => `
      min-h-screen bg-[#1a002e] transition-none
      ml-[66px] pl-12 pt-[86px]
    `,
    overlay: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
    loading: "min-h-screen flex items-center justify-center bg-[#1a002e]",
    loadingText: "text-lg text-[#FFFFFF]",
  },

  // Common styles
  common: {
    flexCol: "flex flex-col",
    flexRow: "flex flex-row",
    itemsCenter: "flex items-center",
    justifyBetween: "justify-between",
    justifyCenter: "justify-center",
    textWhite: "text-[#FFFFFF]",
    textTruncate: "truncate",
    transition: "transition-all duration-300 ease-in-out",
  }
};