import React from 'react';

const Card = ({ children, title, subtitle, extra, className = "" }) => {
  return (
    <div className={`bg-surface border border-border rounded-xl shadow-sm ${className}`}>
      {(title || subtitle || extra) && (
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-bold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
