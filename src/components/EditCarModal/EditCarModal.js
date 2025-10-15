import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './EditCarModal.css';

const EditCarModal = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    brand: car.brand,
    model: car.model,
    year: car.year
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.brand.trim() && formData.model.trim()) {
      onSave(car.id, formData);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <Modal onClose={onClose} title="Редактировать автомобиль">
      <form className="editcarmodal__form" onSubmit={handleSubmit}>
        <div className="editcarmodal__form-fields">
          <div className="editcarmodal__form-group">
            <label className="editcarmodal__label">Марка</label>
            <input
              type="text"
              className="editcarmodal__input"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              required
            />
          </div>
          
          <div className="editcarmodal__form-group">
            <label className="editcarmodal__label">Модель</label>
            <input
              type="text"
              className="editcarmodal__input"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              required
            />
          </div>
          
          <div className="editcarmodal__form-group">
            <label className="editcarmodal__label">Год выпуска</label>
            <input
              type="number"
              className="editcarmodal__input"
              min="1900"
              max={currentYear}
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="editcarmodal__modal-actions">
          <button type="button" className="editcarmodal__button editcarmodal__button--cancel" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="editcarmodal__button editcarmodal__button--save">
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCarModal;