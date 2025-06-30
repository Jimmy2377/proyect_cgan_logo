// src/components/IndustrySectorSelector.tsx
import { industrySectorStyles } from "../styles/industrySectorStyles";
import { useIndustrySectorSelector } from "../hooks/useIndustrySectorSelector";
import type { Industry } from "../hooks/useIndustrySectorSelector";

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
  
  const {
    data,
    actions,
    industries,
    getAvailableSectors,
    getAvailableTags
  } = useIndustrySectorSelector({
    initialIndustry: propSelectedIndustry,
    initialSector: propSelectedSector,
    initialTag: propSelectedTag,
    onSelectionChange
  });

  const { selectedIndustry, selectedSector, selectedTag } = data;
  const { handleIndustrySelect, handleSectorSelect, handleTagSelect } = actions;

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
            getAvailableSectors().map((sector) => (
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
          {selectedSector && getAvailableTags().length > 0 ? (
            getAvailableTags().map((tag) => (
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