// src/components/NeonInput.tsx
import React, { useState } from 'react';
import { neonInputStyles } from '../../styles/neonInputStyles';

export interface NeonInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string; 
}

export const NeonInput: React.FC<NeonInputProps> = ({ 
  label = "Campo", 
  placeholder = "Ingresa texto...", 
  type = "text",
  error = "",
  value,
  onChange,
  onBlur = () => {},
  required = false,
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasValue = value && value.length > 0;
  const hasError = error && error.length > 0;

  const handleFocus = () => setIsFocused(true);
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(e);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className={`${neonInputStyles.container} ${className}`}>
      {/* Mensaje de error */}
      {hasError && (
        <div className={neonInputStyles.errorMessage}>
          {error}
        </div>
      )}
      
      <div className={neonInputStyles.inputWrapper}>
        {/* Label flotante */}
        <label
          className={`
            ${neonInputStyles.label.base}
            ${isFocused || hasValue 
              ? neonInputStyles.label.active 
              : neonInputStyles.label.inactive
            }
            ${hasError ? neonInputStyles.label.error : ''}
          `}
        >
          {label}{required && ' *'}
        </label>
        
        {/* Input field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          placeholder={isFocused ? placeholder : ""}
          className={`
            ${neonInputStyles.input.base}
            ${hasError 
              ? neonInputStyles.input.error
              : isFocused 
                ? neonInputStyles.input.focused
                : isHovered
                  ? neonInputStyles.input.hovered
                  : neonInputStyles.input.normal
            }
            ${isFocused && !hasError ? neonInputStyles.input.focusedExtra : ''}
          `}
          style={{
            textShadow: isFocused && !hasError ? '0 0 8px rgba(34,211,238,0.6)' : 'none'
          }}
        />
        
        {/* Efecto de brillo en el borde */}
        <div 
          className={`
            ${neonInputStyles.glowEffect}
            ${isFocused && !hasError ? neonInputStyles.glowActive : ''}
          `}
        />
      </div>
    </div>
  );
};