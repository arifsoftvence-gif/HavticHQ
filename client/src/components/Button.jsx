import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = "", ...props }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-primary/20',
    secondary: 'bg-white text-text-primary border border-border hover:bg-background',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20',
    ghost: 'bg-transparent text-text-secondary hover:bg-background hover:text-text-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
