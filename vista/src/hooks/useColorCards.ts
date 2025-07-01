// src/hooks/useColorCards.ts
import { useState } from 'react';

export interface Card {
  id: number;
  title: string;
  description: string;
  cmyk: [number, number, number, number];
}

export const useColorCards = () => {
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

  // Datos de las tarjetas
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

  // Lógica de selección de tarjetas
  const handleCardClick = (
    cardId: number, 
    selectedCards: Set<number>, 
    onChange: (selectedCards: Set<number>) => void
  ): void => {
    const newSelectedCards = new Set(selectedCards);
    
    if (newSelectedCards.has(cardId)) {
      newSelectedCards.delete(cardId);
    } else if (newSelectedCards.size < 3) {
      newSelectedCards.add(cardId);
    }
    
    onChange(newSelectedCards);
  };

  // Verificar si una tarjeta está deshabilitada
  const isDisabled = (cardId: number, selectedCards: Set<number>): boolean => {
    return selectedCards.size >= 3 && !selectedCards.has(cardId);
  };

  // Verificar si una tarjeta está expandida
  const isExpanded = (cardId: number, selectedCards: Set<number>): boolean => {
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

  return {
    hoveredCard,
    setHoveredCard,
    cmykToRgb,
    cards,
    handleCardClick,
    isDisabled,
    isExpanded,
    getTextColor
  };
};