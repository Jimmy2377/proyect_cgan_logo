// components/CreditsDisplay.tsx
import { Coins } from "lucide-react"; // Asegúrate de que 'lucide-react' esté instalado

interface CreditsDisplayProps {
  credits: number;
  loading: boolean;
  variant?: 'sidebar' | 'header';
  className?: string;
}

export const CreditsDisplay = ({
  credits,
  loading,
  variant = 'sidebar',
  className = ''
}: CreditsDisplayProps) => {
  if (loading) {
    return (
      <div className={`flex items-center space-x-[8px] ${getVariantStyles(variant)} ${className}`}>
        <Coins className="w-[16px] h-[16px] text-[#FBBF24]" /> {/* w-4 h-4 text-yellow-400 */}
        <span className="text-[14px] text-[#D1D5DB]"> {/* text-sm text-gray-300 */}
          {variant === 'header' ? '...' : 'Cargando...'}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-[8px] ${getVariantStyles(variant)} ${className}`}>
      <Coins className="w-[26px] h-[26px] text-[#FBBF24]" /> {/* w-4 h-4 text-yellow-400 */}
      <span className="text-[20px] text-[#a1f9ff] font-[500]"> {/* text-sm text-white font-medium */}
        {variant === 'header' ? credits : `${credits} créditos`}
      </span>
    </div>
  );
};

// Función auxiliar para obtener estilos según la variante
const getVariantStyles = (variant: 'sidebar' | 'header'): string => {
  switch (variant) {
    case 'sidebar':
      return 'px-[16px] py-[8px] bg-[#6B46C1]/20 rounded-[8px] mb-[16px]'; // px-4 py-2 bg-purple-900/20 rounded-lg mb-4
    case 'header':
      return '';
    default:
      return '';
  }
};