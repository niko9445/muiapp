import Modal from '../Modal/Modal';
import styles from './Modal.module.css';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  itemName,
  itemType = 'элемент',
  isProcessing = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Подтверждение удаления</h2>
      </div>
      
      <div className={styles.modalBody}>
        <p>Вы уверены, что хотите удалить <strong>"{itemName}"</strong>? Это действие нельзя отменить.</p>
      </div>
      
      <div className={styles.modalFooter}>
        <button 
          className={styles.secondaryButton}
          onClick={onClose}
          disabled={isProcessing}
        >
          Отмена
        </button>
        <button 
          className={styles.deleteButton}
          onClick={onDelete}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className={styles.spinner}></span>
          ) : 'Удалить'}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;