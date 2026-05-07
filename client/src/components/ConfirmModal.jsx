import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', variant = 'danger' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="bg-surface border border-border rounded-2xl p-6 shadow-2xl w-full max-w-sm relative z-10 text-center"
          >
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
            <p className="text-sm text-text-secondary mb-8 font-medium">{message}</p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
              <Button 
                variant={variant === 'danger' ? 'danger' : 'primary'} 
                onClick={() => { onConfirm(); onClose(); }} 
                className="flex-1"
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
