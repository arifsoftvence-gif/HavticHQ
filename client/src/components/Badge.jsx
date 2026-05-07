import React from 'react';

const Badge = ({ children, variant = 'primary', className = "" }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    neutral: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
