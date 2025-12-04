import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";
  
  const variants = {
    // Primary: Black bg -> Light Grey bg on hover
    primary: "bg-[#0A0A0A] text-white hover:bg-gray-200 hover:text-black hover:shadow-lg hover:-translate-y-0.5 shadow-md border border-transparent",
    secondary: "bg-white text-[#0A0A0A] border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5",
    outline: "bg-transparent border border-gray-300 text-[#0A0A0A] hover:bg-black hover:text-white hover:border-black transition-colors",
    ghost: "bg-transparent text-gray-600 hover:text-black hover:bg-gray-100/50",
    accent: "bg-[#0A4DD3] text-white hover:bg-[#083cb8] hover:shadow-lg hover:-translate-y-0.5 shadow-md border border-transparent"
  };

  const sizes = {
    sm: "text-xs px-5 py-2.5 gap-2",
    md: "text-sm px-7 py-3.5 gap-2.5",
    lg: "text-base px-9 py-4 gap-3"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </button>
  );
};