import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'py-3 px-8 rounded-sm transition-all duration-300 flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-red-700 to-red-900 text-white hover:shadow-glow',
    secondary: 'border border-white hover:border-red-600 hover:text-red-600 text-white hover:bg-black/50'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 