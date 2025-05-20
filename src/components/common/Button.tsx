import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-500',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };
  
  const disabledStyles = 'opacity-60 cursor-not-allowed';
  
  const buttonClassNames = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    (disabled || isLoading) && disabledStyles,
    className
  );

  return (
    <button 
      className={buttonClassNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      )}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;