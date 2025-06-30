// src/components/BrandSummary.tsx
import { brandSummaryStyles } from '../styles/brandSummaryStyles';

interface BrandSummaryProps {
  formData: {
    name: string;
    selectedColors: Set<number>;
    selectedIndustry: string;
    selectedSector: string;
    selectedTag: string;
  };
}

export function BrandSummary({ formData }: BrandSummaryProps) {
  // Datos de colores para mostrar en el resumen
  const colorCards = [
    { id: 1, title: "Confianza Profesional", cmyk: [100, 80, 0, 0] },
    { id: 2, title: "Claridad Frescura", cmyk: [60, 0, 0, 0] },
    { id: 3, title: "Autoridad Elegancia", cmyk: [100, 85, 0, 70] },
    { id: 4, title: "Crecimiento Equilibrio", cmyk: [100, 0, 100, 0] },
    { id: 5, title: "Serenidad Natural", cmyk: [60, 0, 60, 0] },
    { id: 6, title: "Lujo Misterio", cmyk: [100, 0, 100, 60] },
    { id: 7, title: "Pasión y Urgencia", cmyk: [0, 100, 100, 0] },
    { id: 8, title: "Vitalidad Calidez", cmyk: [0, 50, 100, 0] },
    { id: 9, title: "Optimismo Claridad", cmyk: [0, 0, 100, 0] },
    { id: 10, title: "Creatividad Lujo", cmyk: [50, 100, 0, 0] },
    { id: 11, title: "Ternura Feminidad", cmyk: [0, 50, 0, 0] },
    { id: 12, title: "Estabilidad Confort", cmyk: [30, 70, 100, 30] },
    { id: 13, title: "Neutralidad Equilibrio", cmyk: [0, 0, 0, 50] },
    { id: 14, title: "Elegancia y Poder", cmyk: [0, 0, 0, 100] },
    { id: 15, title: "Pureza Simplicidad", cmyk: [0, 2, 5, 0] }
  ];

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

  // Función para obtener datos de color por ID
  const getColorById = (id: number) => {
    return colorCards.find(card => card.id === id);
  };

  const styles = brandSummaryStyles;

  return (
    <div className={`${styles.container} ${styles.responsive.mobile} ${styles.responsive.tablet} ${styles.responsive.desktop}`}>
      {/* Header mejorado */}
      <div className={styles.header.container}>
        <p className={styles.header.subtitle}>
          Revisa la información que refleja la identidad única de tu marca
        </p>
      </div>

      {/* Layout principal */}
      <div className={styles.layout.wrapper}>
        
        {/* Sección de nombre - más elegante */}
        <div className={`${styles.layout.card} ${styles.layout.cardHover}`}>
          <div className={styles.sectionHeader.container}>
            <svg className={styles.sectionHeader.icon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <h3 className={styles.sectionHeader.title}>Identidad</h3>
          </div>
          <div className={styles.brandName.container}>
            <p className={styles.brandName.text}>
              {formData.name || 'Sin nombre'}
            </p>
          </div>
        </div>

        {/* Sección de categorización - más compacta */}
        <div className={`${styles.layout.card} ${styles.layout.cardHover}`}>
          <div className={styles.sectionHeader.container}>
            <svg className={styles.sectionHeader.icon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
            </svg>
            <h3 className={styles.sectionHeader.title}>Categorización</h3>
          </div>
          <div className={styles.categorization.grid}>
            <div className={styles.categorization.item}>
              <p className={styles.categorization.label}>Industria</p>
              <p className={styles.categorization.value}>
                {formData.selectedIndustry || 'No seleccionada'}
              </p>
            </div>
            <div className={styles.categorization.item}>
              <p className={styles.categorization.label}>Sector</p>
              <p className={styles.categorization.value}>
                {formData.selectedSector || 'No seleccionado'}
              </p>
            </div>
            <div className={styles.categorization.item}>
              <p className={styles.categorization.label}>Etiqueta</p>
              <p className={styles.categorization.value}>
                {formData.selectedTag || 'No seleccionada'}
              </p>
            </div>
          </div>
        </div>

        {/* Sección de colores - más moderna */}
        <div className={`${styles.layout.card} ${styles.layout.cardHover}`}>
          <div className={styles.sectionHeader.container}>
            <svg className={styles.sectionHeader.icon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm8-4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4zm4-3a1 1 0 011-1h1a1 1 0 011 1v7a1 1 0 01-1 1h-1a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
            <h3 className={styles.sectionHeader.title}>Paleta de Colores</h3>
            <span className={styles.sectionHeader.badge}>
              ({formData.selectedColors.size}/3)
            </span>
          </div>
          <div className={styles.colors.container}>
            {formData.selectedColors.size > 0 ? (
              <div className={styles.colors.grid}>
                {Array.from(formData.selectedColors).map((colorId) => {
                  const colorData = getColorById(colorId);
                  if (!colorData) return null;
                  
                  return (
                    <div key={colorId} className={styles.colors.colorItem.container}>
                      <div 
                        className={styles.colors.colorItem.circle}
                        style={{ 
                          backgroundColor: cmykToRgb(colorData.cmyk[0], colorData.cmyk[1], colorData.cmyk[2], colorData.cmyk[3])
                        }}
                      />
                      <p className={styles.colors.colorItem.label}>
                        {colorData.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.colors.emptyState.container}>
                <p className={styles.colors.emptyState.text}>
                  No has seleccionado ningún color
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}