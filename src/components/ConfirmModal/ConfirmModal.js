import React, { useEffect } from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Подтверждение удаления",
  message = "Вы уверены, что хотите удалить этот элемент?",
  confirmText = "Удалить",
  cancelText = "Отмена",
  type = "delete" 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'delete':
        return (
          <svg className="confirmmodal__icon confirmmodal__icon--delete" viewBox="0 0 24 24" fill="none">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="confirmmodal__icon confirmmodal__icon--warning" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="confirmmodal__overlay" onClick={onClose}>
      <div 
        className="confirmmodal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmmodal__content">
          <div className="confirmmodal__header">
            {getIcon()}
            <h3 className="confirmmodal__title">{title}</h3>
          </div>
          
          <p className="confirmmodal__message">{message}</p>
          
          <div className="confirmmodal__actions">
            <button 
              className="confirmmodal__button confirmmodal__button--cancel"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button 
              className={`confirmmodal__button confirmmodal__button--${type}`}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;