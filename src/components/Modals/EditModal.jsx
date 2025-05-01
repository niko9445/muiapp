import React from 'react';
import Modal from '../Modal/Modal.jsx';
import styles from './Modal.module.css';

const EditModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting = false 
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
            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
          Редактирование оборудования
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
              <div className={styles.inputWithIcon}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10,10.5V12H14V10.5H10M10,6V7.5H14V6H10M10,14V16H14V14H10M22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4M20,4H4V20H20V4Z" />
                </svg>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={onChange}
                  className={styles.formInput}
                  placeholder="SN-12345678"
                />
              </div>
            </div>
            
            {/* Группа полей: Ед. изм. и Количество */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ед. измерения</label>
                <div className={styles.inputWithIcon}>
                  <svg className={styles.inputIcon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3,5H21V7H3V5M3,9H21V11H3V9M3,13H21V15H3V13M3,17H21V19H3V17M3,21H21V23H3V21Z" />
                  </svg>
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
                  <svg className={styles.inputIcon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15,5H17V3H19V5H21V7H19V9H17V7H15V5M17,19V15H19V19H17M11,5H13V3H15V5H13V7H11V5M13,15H11V13H13V15M11,11H13V9H11V11M17,13H19V11H17V13M19,21V19H17V21H19M13,21V19H15V21H13M11,21V19H13V21H11M7,5H9V3H11V5H9V7H7V5M9,19V15H11V19H9M7,15H9V13H7V15M9,11H7V9H9V11M3,5H5V3H7V5H5V7H3V5M5,19V15H7V19H5M3,13H5V11H3V13M5,21V19H3V21H5M19,13H21V11H19V13Z" />
                  </svg>
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
              className={styles.editButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  <svg className={styles.buttonIcon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z" />
                  </svg>
                  Сохранить изменения
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;   