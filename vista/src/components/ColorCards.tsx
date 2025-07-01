// src/components/ColorCards.tsx
import React from 'react';
import { useColorCards } from '../hooks/useColorCards';

interface ColorCardsProps {
  selectedCards: Set<number>;
  onChange: (selectedCards: Set<number>) => void;
}

const ColorCards: React.FC<ColorCardsProps> = ({ selectedCards, onChange }) => {
  const {
    //hoveredCard,
    setHoveredCard,
    cmykToRgb,
    cards,
    handleCardClick,
    isDisabled,
    isExpanded,
    getTextColor
  } = useColorCards();

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
        const disabled = isDisabled(card.id, selectedCards);
        const expanded = isExpanded(card.id, selectedCards);
        
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
            onClick={() => !disabled && handleCardClick(card.id, selectedCards, onChange)}
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