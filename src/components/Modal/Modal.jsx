import { useEffect } from 'react';
import styles from '../Modals/Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  // Убрал дублирующую проверку isOpen (она была дважды)
  
  // Закрытие по Esc и блокировка скролла
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;