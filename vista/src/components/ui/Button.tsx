import React from "react";
import { buttonStyles } from "../../styles/buttons";

type ButtonProps = {
  variant?: "primary" | "secondary" | "stylegradient" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
  size = "md",
}) => {
  // Tamaños adicionales opcionales
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg"
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${sizeClasses[size]} 
        ${buttonStyles[variant]} 
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </button>
  );
};
export default Button;