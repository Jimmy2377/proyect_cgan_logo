// src/components/ColorCards.tsx
import { useState } from 'react';

interface Card {
  id: number;
  title: string;
  description: string;
  cmyk: [number, number, number, number];
}

interface ColorCardsProps {
  selectedCards: Set<number>;
  onChange: (selectedCards: Set<number>) => void;
}

const ColorCards: React.FC<ColorCardsProps> = ({ selectedCards, onChange }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Función para convertir CMYK a RGB
  const cmykToRgb = (c: number, m: number, y: number, k: number): string => {
    const cNorm = c / 100;
    const mNorm = m / 100;
    const yNorm = y / 100;
    const kNorm = k / 100;
    
    const r = Math.round(255 * (1 - cNorm) * (1 - kNorm));
    const g = Math.round(255 * (1 - mNorm) * (1 - kNorm));
    const b = Math.round(255 * (1 - yNorm) * (1 - kNorm));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const cards: Card[] = [
    { id: 1, title: "Confianza Profesional", description: "Inspira seguridad, estabilidad y credibilidad en cualquier comunicación", cmyk: [100, 80, 0, 0] },
    { id: 2, title: "Claridad Frescura", description: "Evoca transparencia, modernidad y comunicación directa", cmyk: [60, 0, 0, 0] },
    { id: 3, title: "Autoridad Elegancia", description: "Representa poder, sofisticación y liderazgo establecido", cmyk: [100, 85, 0, 70] },
    { id: 4, title: "Crecimiento Equilibrio", description: "Simboliza prosperidad, armonía y desarrollo sostenible", cmyk: [100, 0, 100, 0] },
    { id: 5, title: "Serenidad Natural", description: "Aporta calma, equilibrio y conexión con la naturaleza", cmyk: [60, 0, 60, 0] },
    { id: 6, title: "Lujo Misterio", description: "Irradia exclusividad, sabiduría y profundidad espiritual", cmyk: [100, 0, 100, 60] },
    { id: 7, title: "Pasión y Urgencia", description: "Estimula acción inmediata, energía y emociones intensas", cmyk: [0, 100, 100, 0] },
    { id: 8, title: "Vitalidad Calidez", description: "Conecta con entusiasmo, creatividad y dinamismo", cmyk: [0, 50, 100, 0] },
    { id: 9, title: "Optimismo Claridad", description: "Evoca alegría, intelecto y comunicación positiva", cmyk: [0, 0, 100, 0] },
    { id: 10, title: "Creatividad Lujo", description: "Inspira innovación, originalidad y distinción refinada", cmyk: [50, 100, 0, 0] },
    { id: 11, title: "Ternura Feminidad", description: "Transmite delicadeza, cuidado y sensibilidad emocional", cmyk: [0, 50, 0, 0] },
    { id: 12, title: "Estabilidad Confort", description: "Representa solidez, tradición y confiabilidad duradera", cmyk: [30, 70, 100, 30] },
    { id: 13, title: "Neutralidad Equilibrio", description: "Aporta profesionalismo, versatilidad y objetividad", cmyk: [0, 0, 0, 50] },
    { id: 14, title: "Elegancia y Poder", description: "Evoca sofisticación máxima, autoridad y prestigio", cmyk: [0, 0, 0, 100] },
    { id: 15, title: "Pureza Simplicidad", description: "Simboliza limpieza, minimalismo e inocencia", cmyk: [0, 2, 5, 0] }
  ];

  const handleCardClick = (cardId: number): void => {
    const newSelectedCards = new Set(selectedCards);
    
    if (newSelectedCards.has(cardId)) {
      newSelectedCards.delete(cardId);
    } else if (newSelectedCards.size < 3) {
      newSelectedCards.add(cardId);
    }
    
    onChange(newSelectedCards);
  };

  const isDisabled = (cardId: number): boolean => {
    return selectedCards.size >= 3 && !selectedCards.has(cardId);
  };

  const isExpanded = (cardId: number): boolean => {
    return selectedCards.has(cardId) || hoveredCard === cardId;
  };

  // Función para determinar el color del texto según el ID de la tarjeta
  const getTextColor = (cardId: number, expanded: boolean): string => {
    if (expanded) return 'text-[#FFFFFF]';
    
    switch (cardId) {
      case 2: return 'text-[#000B4D]';
      case 5: return 'text-[#333333]';
      case 9: return 'text-[#ff0059]';
      case 15: return 'text-[#ff0059]';
      default: return 'text-[#FFFFFF]'; // Blanco por defecto
    }
  };

  return (
  <div>
    {/* Texto informativo */}
    <div className="max-w-[800px] mx-auto mb-[35px] px-[10px]">
      
      <p className="text-[13px] text-[#718096] leading-[1.6] text-center mb-[12px]">
        Los colores comunican emociones y valores antes que las palabras. Cada tonalidad despierta 
        sensaciones específicas en tu audiencia, influyendo en la percepción de tu marca y las 
        decisiones de compra.
      </p>
      <p className="text-[13px] text-[#4A5568] text-center italic">
        Basado en los estudios de <span className="font-semibold">Eva Heller</span> 
        <span className="text-[12px]"> ("Psicología del color", 2004)</span> y 
        <span className="font-semibold"> Faber Birren</span>
        <span className="text-[12px]"> ("Color Psychology and Color Therapy", 1950)</span>
      </p>
    </div>

    <div className="grid gap-x-[40px] gap-y-[12px] pr-[30px] mx-auto justify-center mb-[25px]
    grid-cols-[repeat(auto-fit,128px)]
    min-[320px]:grid-cols-[repeat(auto-fit,128px)]
    min-[400px]:grid-cols-[repeat(auto-fit,128px)]
    min-[528px]:grid-cols-[repeat(auto-fit,128px)]
    min-[656px]:grid-cols-[repeat(auto-fit,128px)]
    min-[784px]:grid-cols-[repeat(auto-fit,128px)]"
    style={{
      maxWidth: 'min(100vw - 40px, 900px)', 
      minWidth: '288px' 
    }}>
    
    {cards.map((card) => {
      const backgroundColor = cmykToRgb(card.cmyk[0], card.cmyk[1], card.cmyk[2], card.cmyk[3]);
      const disabled = isDisabled(card.id);
      const expanded = isExpanded(card.id);
      
      return (
        <div
          key={card.id}
          className={`relative h-[128px] w-[128px] rounded-[8px] cursor-pointer transition-all duration-[300ms] ${
            disabled ? 'opacity-[0.5] cursor-not-allowed' : ''
          } ${selectedCards.has(card.id) ? 'ring-[4px] ring-[#FFFF]' : ''}`}
          style={{
            backgroundColor,
            padding: '5px 15px'
          }}
          onClick={() => !disabled && handleCardClick(card.id)}
          onMouseEnter={() => !disabled && setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {expanded && (
            <div className="absolute top-[0px] right-[0px] bottom-[0px] left-[0px] bg-[rgba(0,0,0,0.6)] rounded-[8px]"></div>
          )}
          <div className={`absolute transition-all duration-[300ms] z-[10] ${
            expanded ? 'top-[12px] left-[12px] right-[12px]' : 'bottom-[8px] left-[16px] right-[8px]'
          }`}>
            {expanded ? (
              // Estado expandido: solo mostrar descripción
              <p className="text-[#FFFFFF] text-[12px] leading-[1.5]">
                {card.description}
              </p>
            ) : (
              // Estado normal: solo mostrar título
              <h3 className={`font-bold text-[16px] ${getTextColor(card.id, expanded)}`}>
                {card.title}
              </h3>
            )}
          </div>
        </div>
      );
    })}
  </div>
  </div>
);
};

export default ColorCards;