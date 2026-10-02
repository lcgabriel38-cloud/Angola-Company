
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-golden-yellow text-dark-green hover:bg-yellow-400 focus:ring-golden-yellow';
      break;
    case 'secondary':
      variantStyles = 'bg-dark-green text-white hover:bg-green-700 focus:ring-dark-green';
      break;
    case 'outline':
      variantStyles = 'bg-transparent border border-golden-yellow text-golden-yellow hover:bg-golden-yellow hover:text-dark-green focus:ring-golden-yellow';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
