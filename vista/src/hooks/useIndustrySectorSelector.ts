// src/hooks/useIndustrySectorSelector.ts
import { useState, useEffect } from "react";

export type Industry = "Restaurantes y comida" | "Moda y ropa" | "Salud y bienestar" | "Belleza y cosmética" | "Fitness y deporte";

export interface IndustrySelectorData {
  selectedIndustry: string;
  selectedSector: string;
  selectedTag: string;
}

export interface IndustrySelectorActions {
  handleIndustrySelect: (industry: string) => void;
  handleSectorSelect: (sector: string) => void;
  handleTagSelect: (tag: string) => void;
  resetSelections: () => void;
}

interface UseIndustrySelectorOptions {
  initialIndustry?: string;
  initialSector?: string;
  initialTag?: string;
  onSelectionChange?: (industry: string, sector: string, tag: string) => void;
}

export const useIndustrySectorSelector = ({
  initialIndustry = '',
  initialSector = '',
  initialTag = '',
  onSelectionChange
}: UseIndustrySelectorOptions = {}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustry);
  const [selectedSector, setSelectedSector] = useState<string>(initialSector);
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);

  // Sincronizar con props iniciales cuando cambien
  useEffect(() => {
    setSelectedIndustry(initialIndustry);
    setSelectedSector(initialSector);
    setSelectedTag(initialTag);
  }, [initialIndustry, initialSector, initialTag]);

  // Datos estáticos del selector
  const industries: Industry[] = [
    "Restaurantes y comida",
    "Moda y ropa", 
    "Salud y bienestar",
    "Belleza y cosmética",
    "Fitness y deporte"
  ];

  const sectorsByIndustry: Record<Industry, string[]> = {
    "Restaurantes y comida": ["Bar", "Café", "Heladería", "Restaurante", "Repostería"],
    "Moda y ropa": ["Urbana", "Alta costura", "Infantil", "Vestidos", "Sport"],
    "Salud y bienestar": ["Clínica", "Spa", "Yoga", "Nutrición", "Veterinaria"],
    "Belleza y cosmética": ["Peluquería", "Cosméticos", "Manicura", "Maquillaje", "Barbería"],
    "Fitness y deporte": ["Gimnasio", "Crossfit", "Suplementos", "Accesorios"]
  };

  const tagsBySector: Record<string, string[]> = {
    // Restaurantes y comida
    "Bar": ["Vino", "Cerveza", "Cóctel"],
    "Café": ["Grano", "Taza"],
    "Heladería": ["Cono", "Paleta", "Vaso"],
    "Restaurante": ["Gorro", "Fuego", "Utensilios"],
    "Repostería": ["Pastel", "Pan", "Trigo"],
    
    // Moda y ropa
    "Urbana": ["Sneakers", "Streetwear", "Casual"],
    "Alta costura": ["Elegancia", "Lujo", "Exclusivo"],
    "Infantil": ["Divertido", "Colorido", "Juguetón"],
    "Vestidos": ["Elegante", "Formal", "Ocasión"],
    "Sport": ["Activo", "Performance", "Técnico"],
    
    // Salud y bienestar
    "Clínica": ["Medicina", "Cuidado", "Salud"],
    "Spa": ["Relajación", "Masaje", "Bienestar"],
    "Yoga": ["Meditación", "Equilibrio", "Paz"],
    "Nutrición": ["Saludable", "Natural", "Vitaminas"],
    "Veterinaria": ["Mascotas", "Cuidado animal", "Salud animal"],
    
    // Belleza y cosmética
    "Peluquería": ["Corte", "Estilo", "Cabello"],
    "Cosméticos": ["Maquillaje", "Belleza", "Glamour"],
    "Manicura": ["Uñas", "Esmalte", "Decoración"],
    "Maquillaje": ["Rostro", "Color", "Transformación"],
    "Barbería": ["Barba", "Afeitado", "Clásico"],
    
    // Fitness y deporte
    "Gimnasio": ["Fuerza", "Músculo", "Entrenamiento"],
    "Crossfit": ["Intenso", "Funcional", "Comunidad"],
    "Suplementos": ["Proteína", "Energía", "Rendimiento"],
    "Accesorios": ["Equipamiento", "Gear", "Calidad"]
  };

  // Handlers
  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setSelectedSector(''); // Reset sector selection when industry changes
    setSelectedTag(''); // Reset tag selection when industry changes
    
    // Notificar al componente padre
    if (onSelectionChange) {
      onSelectionChange(industry, '', '');
    }
  };

  const handleSectorSelect = (sector: string) => {
    setSelectedSector(sector);
    setSelectedTag(''); // Reset tag selection when sector changes
    
    // Notificar al componente padre
    if (onSelectionChange) {
      onSelectionChange(selectedIndustry, sector, '');
    }
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    
    // Notificar al componente padre
    if (onSelectionChange) {
      onSelectionChange(selectedIndustry, selectedSector, tag);
    }
  };

  const resetSelections = () => {
    setSelectedIndustry('');
    setSelectedSector('');
    setSelectedTag('');
    
    if (onSelectionChange) {
      onSelectionChange('', '', '');
    }
  };

  // Getters para sectores y tags disponibles
  const getAvailableSectors = (): string[] => {
    if (!selectedIndustry || !industries.includes(selectedIndustry as Industry)) {
      return [];
    }
    return sectorsByIndustry[selectedIndustry as Industry];
  };

  const getAvailableTags = (): string[] => {
    if (!selectedSector || !tagsBySector[selectedSector]) {
      return [];
    }
    return tagsBySector[selectedSector];
  };

  // Estado y datos
  const data: IndustrySelectorData = {
    selectedIndustry,
    selectedSector,
    selectedTag
  };

  // Acciones
  const actions: IndustrySelectorActions = {
    handleIndustrySelect,
    handleSectorSelect,
    handleTagSelect,
    resetSelections
  };

  return {
    data,
    actions,
    industries,
    sectorsByIndustry,
    tagsBySector,
    getAvailableSectors,
    getAvailableTags
  };
};