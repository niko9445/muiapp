import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import './EditMaintenanceModal.css';

const EditMaintenanceModal = ({ maintenance, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    mileage: '',
    cost: '',
    oilChangeStep: '', // ИСПРАВЛЕНО
    filterChangeStep: '', // ИСПРАВЛЕНО
    description: '',
    additionalItems: [] // ИСПРАВЛЕНО
  });

  const [newItem, setNewItem] = useState({ name: '', value: '', unit: '' }); // ИСПРАВЛЕНО

  // Заполняем форму данными при открытии
  useEffect(() => {
    if (maintenance) {
      setFormData({
        date: maintenance.date || maintenance.createdAt?.split('T')[0] || '', // ИСПРАВЛЕНО для даты
        mileage: maintenance.mileage || '',
        cost: maintenance.cost || '',
        oilChangeStep: maintenance.oilChangeStep || '', // ИСПРАВЛЕНО
        filterChangeStep: maintenance.filterChangeStep || '', // ИСПРАВЛЕНО
        description: maintenance.description || '',
        additionalItems: maintenance.additionalItems || [] // ИСПРАВЛЕНО
      });
    }
  }, [maintenance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.mileage) {
      onSave(maintenance.id, formData);
    }
  };

  const addAdditionalItem = () => { // ИСПРАВЛЕНО
    if (newItem.name.trim() && newItem.value.trim()) {
      setFormData({
        ...formData,
        additionalItems: [...formData.additionalItems, { ...newItem }] // ИСПРАВЛЕНО
      });
      setNewItem({ name: '', value: '', unit: '' }); // ИСПРАВЛЕНО
    }
  };

  const removeAdditionalItem = (index) => { // ИСПРАВЛЕНО
    const updatedItems = formData.additionalItems.filter((_, i) => i !== index); // ИСПРАВЛЕНО
    setFormData({ ...formData, additionalItems: updatedItems }); // ИСПРАВЛЕНО
  };



  return (
    <Modal isOpen={true} // ДОБАВЬТЕ ЭТУ СТРОКУ
            onClose={onClose} 
            title="Редактировать ТО"
        >
      <form className="editmaintenancemodal__form" onSubmit={handleSubmit}>
        <div className="editmaintenancemodal__form-fields">
          <div className="editmaintenancemodal__form-grid">
            <div className="editmaintenancemodal__form-group">
              <label className="editmaintenancemodal__label">Дата ТО</label>
              <input
                type="date"
                className="editmaintenancemodal__input"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            
            <div className="editmaintenancemodal__form-group">
              <label className="editmaintenancemodal__label">Пробег (км)</label>
              <input
                type="number"
                className="editmaintenancemodal__input"
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                min="0"
                required
              />
            </div>
          </div>

          <div className="editmaintenancemodal__form-grid">
            <div className="editmaintenancemodal__form-group">
              <label className="editmaintenancemodal__label">Затраты (₽)</label>
              <input
                type="number"
                className="editmaintenancemodal__input"
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: e.target.value})}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="editmaintenancemodal__form-group">
              <label className="editmaintenancemodal__label">Замена масла через (км)</label>
              <input
                type="number"
                className="editmaintenancemodal__input"
                value={formData.oilChangeStep} // ИСПРАВЛЕНО
                onChange={(e) => setFormData({...formData, oilChangeStep: e.target.value})} // ИСПРАВЛЕНО
                min="0"
              />
            </div>
          </div>

          <div className="editmaintenancemodal__form-group">
            <label className="editmaintenancemodal__label">Замена фильтров через (км)</label>
            <input
              type="number"
              className="editmaintenancemodal__input"
              value={formData.filterChangeStep} // ИСПРАВЛЕНО
              onChange={(e) => setFormData({...formData, filterChangeStep: e.target.value})} // ИСПРАВЛЕНО
              min="0"
            />
          </div>

          <div className="editmaintenancemodal__form-group">
            <label className="editmaintenancemodal__label">Описание работ</label>
            <textarea
              className="editmaintenancemodal__textarea"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
              placeholder="Опишите выполненные работы..."
            />
          </div>

          <div className="editmaintenancemodal__form-group">
            <label className="editmaintenancemodal__label">Дополнительные работы</label> {/* ИСПРАВЛЕНО */}
            <div className="editmaintenancemodal__add-item"> {/* ИСПРАВЛЕНО */}
              <input
                type="text"
                className="editmaintenancemodal__input"
                value={newItem.name} // ИСПРАВЛЕНО
                onChange={(e) => setNewItem({...newItem, name: e.target.value})} // ИСПРАВЛЕНО
                placeholder="Название работы"
              />
              <input
                type="text"
                className="editmaintenancemodal__input"
                value={newItem.value} // ИСПРАВЛЕНО
                onChange={(e) => setNewItem({...newItem, value: e.target.value})} // ИСПРАВЛЕНО
                placeholder="Значение"
              />
              <input
                type="text"
                className="editmaintenancemodal__input"
                value={newItem.unit} // ИСПРАВЛЕНО
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})} // ИСПРАВЛЕНО
                placeholder="Единица измерения"
              />
              <button 
                type="button" 
                className="editmaintenancemodal__add-button"
                onClick={addAdditionalItem} // ИСПРАВЛЕНО
              >
                Добавить
              </button>
            </div>
            
            <div className="editmaintenancemodal__items-list"> {/* ИСПРАВЛЕНО */}
              {formData.additionalItems.map((item, index) => ( // ИСПРАВЛЕНО
                <div key={index} className="editmaintenancemodal__item"> {/* ИСПРАВЛЕНО */}
                  <span className="editmaintenancemodal__item-text"> {/* ИСПРАВЛЕНО */}
                    {item.name}: {item.value} {item.unit} {/* ИСПРАВЛЕНО */}
                  </span>
                  <button 
                    type="button"
                    className="editmaintenancemodal__remove-button"
                    onClick={() => removeAdditionalItem(index)} // ИСПРАВЛЕНО
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="editmaintenancemodal__modal-actions">
          <button type="button" className="editmaintenancemodal__button editmaintenancemodal__button--cancel" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="editmaintenancemodal__button editmaintenancemodal__button--save">
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMaintenanceModal;