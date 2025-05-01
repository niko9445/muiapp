import React from 'react';
import styles from '../EquipmentForm/EquipmentForm.module.css';

const EquipmentForm = ({ title, formData, onChange, onSubmit, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // вызываем onSubmit из родительского компонента
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Категория*
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={onChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Наименование*
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        {/* Остальные поля */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Серийный номер
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={onChange}
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Ед. измерения
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={onChange}
                className={styles.input}
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Количество
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={onChange}
                className={styles.input}
                min="0"
              />
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Место установки
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Примечание
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onChange}
              className={styles.textarea}
              rows="3"
            />
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Сохранить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;
