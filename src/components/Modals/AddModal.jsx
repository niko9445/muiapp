import React from 'react';
import Modal from '../Modal/Modal.jsx';
import styles from './Modal.module.css';

const AddModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting 
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>
          <svg className={styles.modalIcon} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          Добавление оборудования
        </h2>
      </div>
      
      <div className={styles.modalBody}>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Категория */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Категория<span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={onChange}
                className={styles.formInput}
                required
                placeholder="Серверное оборудование"
              />
            </div>
            
            {/* Наименование */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Наименование<span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                className={styles.formInput}
                required
                placeholder="Сервер Dell R740"
              />
            </div>
            
            {/* Серийный номер */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Серийный номер
                <span className={styles.optional}>(опционально)</span>
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={onChange}
                className={styles.formInput}
                placeholder="SN-12345678"
              />
            </div>
            
            {/* Группа полей: Ед. изм. и Количество */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ед. изм.</label>
                <div className={styles.inputWithIcon}>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={onChange}
                    className={styles.formInput}
                    placeholder="шт."
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Количество</label>
                <div className={styles.inputWithIcon}>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={onChange}
                    className={styles.formInput}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            {/* Место установки */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Место установки</label>
              <div className={styles.inputWithIcon}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  className={styles.formInput}
                  placeholder="Серверная комната №1"
                />
              </div>
            </div>
            
            {/* Примечание */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Примечание</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={onChange}
                className={styles.formTextarea}
                rows="3"
                placeholder="Дополнительные сведения..."
              />
            </div>
          </div>

          {/* Футер с кнопками */}
          <div className={styles.modalFooter}>
            <button 
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button 
              type="submit"
              className={styles.primaryButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  <svg className={styles.buttonIcon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                  </svg>
                  Сохранить
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddModal;