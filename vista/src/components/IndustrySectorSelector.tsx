// src/components/industrySectorSelector.tsx
import { useState, useEffect } from "react";
import { industrySectorStyles } from "../styles/industrySectorStyles";

type Industry = "Restaurantes y comida" | "Moda y ropa" | "Salud y bienestar" | "Belleza y cosmética" | "Fitness y deporte";

interface IndustrySelectorProps {
  onSelectionChange?: (industry: string, sector: string, tag: string) => void;
  selectedIndustry?: string;
  selectedSector?: string;
  selectedTag?: string;
}

interface PillButtonProps {
  text: string;
  isSelected: boolean;
  onClick: (text: string) => void;
  isDisabled?: boolean;
}

const IndustrySectorSelector = ({ 
  onSelectionChange, 
  selectedIndustry: propSelectedIndustry = '', 
  selectedSector: propSelectedSector = '',
  selectedTag: propSelectedTag = ''
}: IndustrySelectorProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(propSelectedIndustry);
  const [selectedSector, setSelectedSector] = useState<string>(propSelectedSector);
  const [selectedTag, setSelectedTag] = useState<string>(propSelectedTag);

  // Sincronizar con props
  useEffect(() => {
    setSelectedIndustry(propSelectedIndustry);
    setSelectedSector(propSelectedSector);
    setSelectedTag(propSelectedTag);
  }, [propSelectedIndustry, propSelectedSector, propSelectedTag]);

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

  const PillButton = ({ text, isSelected, onClick, isDisabled = false }: PillButtonProps) => {
    let classes = industrySectorStyles.pillBase;
    
    if (isDisabled) {
      classes += ` ${industrySectorStyles.pillDisabled}`;
    } else if (isSelected) {
      classes += ` ${industrySectorStyles.pillSelected}`;
    } else {
      classes += ` ${industrySectorStyles.pillNormal}`;
    }

    return (
      <button
        className={classes}
        onClick={() => !isDisabled && onClick(text)}
        disabled={isDisabled}
      >
        {text}
      </button>
    );
  };

  return (
    <div className={industrySectorStyles.container}>
      {/* Primera sección - Industrias (1/3) */}
      <div className={industrySectorStyles.industriesSection}>
        <h3 className={industrySectorStyles.industriesTitle}>Industrias</h3>
        <div className={industrySectorStyles.industriesGrid}>
          {industries.map((industry) => (
            <PillButton
              key={industry}
              text={industry}
              isSelected={selectedIndustry === industry}
              onClick={handleIndustrySelect}
            />
          ))}
        </div>
      </div>

      {/* Segunda sección - Sectores (1/3) */}
      <div className={industrySectorStyles.sectorsSection}>
        <h3 className={industrySectorStyles.sectorsTitle}>Sectores</h3>
        <div className={industrySectorStyles.sectorsGrid}>
          {selectedIndustry && industries.includes(selectedIndustry as Industry) ? (
            sectorsByIndustry[selectedIndustry as Industry].map((sector) => (
              <PillButton
                key={sector}
                text={sector}
                isSelected={selectedSector === sector}
                onClick={handleSectorSelect}
              />
            ))
          ) : (
            <p className={industrySectorStyles.sectorsPlaceholder}>
              Selecciona una industria para ver los sectores disponibles
            </p>
          )}
        </div>
      </div>

      {/* Tercera sección - Etiquetas (1/3) */}
      <div className={industrySectorStyles.tagsSection}>
        <h3 className={industrySectorStyles.tagsTitle}>Etiquetas</h3>
        <div className={industrySectorStyles.tagsGrid}>
          {selectedSector && tagsBySector[selectedSector] ? (
            tagsBySector[selectedSector].map((tag) => (
              <PillButton
                key={tag}
                text={tag}
                isSelected={selectedTag === tag}
                onClick={handleTagSelect}
              />
            ))
          ) : (
            <p className={industrySectorStyles.tagsPlaceholder}>
              Selecciona un sector para ver las etiquetas disponibles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustrySectorSelector;