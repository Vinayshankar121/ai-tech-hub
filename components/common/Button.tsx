
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading = false, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200';
  const sizeStyles = 'px-4 py-2 text-sm';
  
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400',
    secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500 disabled:bg-slate-500',
    ghost: 'bg-transparent text-indigo-400 hover:bg-indigo-900/50 focus:ring-indigo-500 disabled:text-slate-400',
  };

  const disabledStyles = 'disabled:cursor-not-allowed disabled:opacity-70';

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
   