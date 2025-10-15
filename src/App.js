import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
//import DataManager from './components/DataManager/DataManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/globals.css';

const App = () => {
  const [cars, setCars] = useLocalStorage('cars', []);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeSection, setActiveSection] = useState('maintenance');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Состояния для ВСЕХ модальных окон
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);
  const [isAddCarDataModalOpen, setIsAddCarDataModalOpen] = useState(false);
  
  const [carToEdit, setCarToEdit] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);
  const [maintenanceToDelete, setMaintenanceToDelete] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setSidebarOpen(!mobile); // На десктопе сайдбар открыт, на мобильных закрыт
  };

  // Проверяем при загрузке
  handleResize();

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);



  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Функции для работы с автомобилями
  const handleAddCar = (carData) => {
    const newCar = {
      id: Date.now().toString(),
      brand: carData.brand,
      model: carData.model,
      year: carData.year,
      maintenance: [],
      carData: []
    };
    setCars([...cars, newCar]);
    setIsAddCarModalOpen(false);
  };

  const handleEditCar = (carId, carData) => {
    const updatedCars = cars.map(c => {
      if (c.id === carId) {
        return {
          ...c,
          brand: carData.brand,
          model: carData.model,
          year: carData.year
        };
      }
      return c;
    });
    setCars(updatedCars);
    
    if (selectedCar && selectedCar.id === carId) {
      setSelectedCar(updatedCars.find(c => c.id === carId));
    }
    
    setIsEditCarModalOpen(false);
    setCarToEdit(null);
  };

  const handleDeleteCar = (carId) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    if (selectedCar && selectedCar.id === carId) {
      setSelectedCar(null);
    }
    setIsConfirmModalOpen(false);
    setCarToDelete(null);
  };

  // Функции для работы с ТО
  const handleAddMaintenance = (maintenanceData) => {
    if (!selectedCar) return;
    
    const updatedCars = cars.map(c => {
      if (c.id === selectedCar.id) {
        const newMaintenance = {
          id: Date.now().toString(),
          ...maintenanceData,
          createdAt: new Date().toISOString()
        };
        return {
          ...c,
          maintenance: [...(c.maintenance || []), newMaintenance]
        };
      }
      return c;
    });
    setCars(updatedCars);
    setIsAddMaintenanceModalOpen(false);
  };

  const handleDeleteMaintenance = (maintenanceId) => {
    if (!selectedCar) return;
    
    const updatedCars = cars.map(c => {
      if (c.id === selectedCar.id) {
        return {
          ...c,
          maintenance: (c.maintenance || []).filter(m => m.id !== maintenanceId)
        };
      }
      return c;
    });
    setCars(updatedCars);
    setIsConfirmModalOpen(false);
    setMaintenanceToDelete(null);
  };

  // Функции для работы с данными авто
  const handleAddCarData = (carData) => {
    if (!selectedCar) return;
    
    const updatedCars = cars.map(c => {
      if (c.id === selectedCar.id) {
        const newCarData = {
          id: Date.now().toString(),
          ...carData,
          createdAt: new Date().toISOString()
        };
        return {
          ...c,
          carData: [...(c.carData || []), newCarData]
        };
      }
      return c;
    });
    setCars(updatedCars);
    setIsAddCarDataModalOpen(false);
  };

  const handleDeleteCarData = (dataId) => {
    if (!selectedCar) return;
    
    const updatedCars = cars.map(c => {
      if (c.id === selectedCar.id) {
        return {
          ...c,
          carData: (c.carData || []).filter(d => d.id !== dataId)
        };
      }
      return c;
    });
    setCars(updatedCars);
    setIsConfirmModalOpen(false);
    setDataToDelete(null);
  };

  // Функции для открытия модальных окон
  const openAddCarModal = () => {
    setIsAddCarModalOpen(true);
  };

  const openEditCarModal = (car) => {
    setCarToEdit(car);
    setIsEditCarModalOpen(true);
  };

  const openDeleteConfirm = (type, data) => {
    if (type === 'car') {
      setCarToDelete(data);
    } else if (type === 'maintenance') {
      setMaintenanceToDelete(data);
    } else if (type === 'carData') {
      setDataToDelete(data);
    }
    setIsConfirmModalOpen(true);
  };

  const openAddMaintenanceModal = () => {
    setIsAddMaintenanceModalOpen(true);
  };

  const openAddCarDataModal = () => {
    setIsAddCarDataModalOpen(true);
  };

  return (
    <>
      <div className="app">
        

        {/* Сайдбар */}
        <div className={
          isMobile 
            ? `sidebar-wrapper ${sidebarOpen ? 'sidebar-wrapper--open' : 'sidebar-wrapper--closed'}`
            : 'sidebar-wrapper'
        }>
          <Sidebar 
            cars={cars} 
            selectedCar={selectedCar}
            setSelectedCar={handleCarSelect}
            isMobile={isMobile}
            onClose={handleCloseSidebar}
            onAddCar={openAddCarModal}
            onEditCar={openEditCarModal}
            onDeleteCar={(car) => openDeleteConfirm('car', car)}
          />
        </div>

        {/* Оверлей для мобильных */}
        {isMobile && sidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={handleCloseSidebar}
          />
        )}

        <div className="app__main">
          <MainContent 
            selectedCar={selectedCar}
            cars={cars}
            setCars={setCars}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onAddMaintenance={openAddMaintenanceModal}
            onAddCarData={openAddCarDataModal}
            onDeleteMaintenance={(maintenance) => openDeleteConfirm('maintenance', maintenance)}
            onDeleteCarData={(data) => openDeleteConfirm('carData', data)}
            isMobile={isMobile} // ← ДОБАВЬ ЭТО
            onOpenSidebar={() => setSidebarOpen(true)} // ← И ЭТО
          />
        </div>
      </div>

      {/* ВСЕ модальные окна ВНЕ основного контейнера app */}

      {/* Модальное окно добавления авто */}
      {isAddCarModalOpen && (
        <AddCarModal
          onClose={() => setIsAddCarModalOpen(false)}
          onSave={handleAddCar}
        />
      )}

      {/* Модальное окно редактирования авто */}
      {isEditCarModalOpen && (
        <EditCarModal
          car={carToEdit}
          onClose={() => {
            setIsEditCarModalOpen(false);
            setCarToEdit(null);
          }}
          onSave={handleEditCar}
        />
      )}

      {/* Модальное окно добавления ТО */}
      {isAddMaintenanceModalOpen && (
        <AddMaintenanceModal
          onClose={() => setIsAddMaintenanceModalOpen(false)}
          onSave={handleAddMaintenance}
        />
      )}

      {/* Модальное окно добавления данных авто */}
      {isAddCarDataModalOpen && (
        <AddCarDataModal
          onClose={() => setIsAddCarDataModalOpen(false)}
          onSave={handleAddCarData}
        />
      )}

      {/* Универсальное модальное окно подтверждения удаления */}
      {isConfirmModalOpen && (
        <ConfirmDeleteModal
          type={carToDelete ? 'car' : maintenanceToDelete ? 'maintenance' : 'carData'}
          data={carToDelete || maintenanceToDelete || dataToDelete}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setCarToDelete(null);
            setMaintenanceToDelete(null);
            setDataToDelete(null);
          }}
          onConfirm={() => {
            if (carToDelete) {
              handleDeleteCar(carToDelete.id);
            } else if (maintenanceToDelete) {
              handleDeleteMaintenance(maintenanceToDelete.id);
            } else if (dataToDelete) {
              handleDeleteCarData(dataToDelete.id);
            }
          }}
        />
      )}
    </>
  );
};

// Компонент модального окна добавления авто (оставляем как было)
const AddCarModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.brand.trim() && formData.model.trim()) {
      onSave(formData);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="simple-modal-overlay" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()}>
        <div className="simple-modal-header">
          <h3>Добавить автомобиль</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="simple-modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <label>Марка</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                  placeholder="Например: Toyota"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label>Модель</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                  placeholder="Например: Camry"
                />
              </div>
              
              <div className="form-group">
                <label>Год выпуска</label>
                <input
                  type="number"
                  min="1900"
                  max={currentYear}
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="save-btn">
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Компонент модального окна редактирования авто (оставляем как было)
const EditCarModal = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    brand: car?.brand || '',
    model: car?.model || '',
    year: car?.year || new Date().getFullYear()
  });

  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year
      });
    }
  }, [car]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.brand.trim() && formData.model.trim()) {
      onSave(car.id, formData);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="simple-modal-overlay" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()}>
        <div className="simple-modal-header">
          <h3>Редактировать автомобиль</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="simple-modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <label>Марка</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Модель</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Год выпуска</label>
                <input
                  type="number"
                  min="1900"
                  max={currentYear}
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="save-btn">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Компонент модального окна добавления ТО
const AddMaintenanceModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    mileage: '',
    oilChangeStep: '10000',
    filterChangeStep: '15000',
    cost: '',
    additionalItems: []
  });

  const [newAdditionalItem, setNewAdditionalItem] = useState({
    name: '',
    value: '',
    unit: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.mileage) {
      onSave({
        ...formData,
        mileage: parseInt(formData.mileage),
        oilChangeStep: parseInt(formData.oilChangeStep),
        filterChangeStep: parseInt(formData.filterChangeStep),
        cost: formData.cost ? parseInt(formData.cost) : null
      });
    }
  };

  const addAdditionalItem = () => {
    if (newAdditionalItem.name && newAdditionalItem.value) {
      setFormData({
        ...formData,
        additionalItems: [...formData.additionalItems, { ...newAdditionalItem }]
      });
      setNewAdditionalItem({ name: '', value: '', unit: '' });
    }
  };

  const removeAdditionalItem = (index) => {
    const updatedItems = formData.additionalItems.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalItems: updatedItems });
  };

  return (
    <div className="simple-modal-overlay" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="simple-modal-header">
          <h3>Добавить техническое обслуживание</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="simple-modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Текущий пробег (км) *</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Затраты (₽)</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  min="0"
                  placeholder="Необязательно"
                />
              </div>

              <div className="form-group">
                <label>Шаг замены масла (км)</label>
                <input
                  type="number"
                  value={formData.oilChangeStep}
                  onChange={(e) => setFormData({...formData, oilChangeStep: e.target.value})}
                  required
                  min="1000"
                />
              </div>

              <div className="form-group">
                <label>Шаг замены фильтров (км)</label>
                <input
                  type="number"
                  value={formData.filterChangeStep}
                  onChange={(e) => setFormData({...formData, filterChangeStep: e.target.value})}
                  required
                  min="1000"
                />
              </div>
            </div>

            {/* Дополнительные поля */}
            <div className="additional-fields">
              <h4 className="subtitle">Дополнительные работы</h4>
              
              <div className="add-item-grid">
                <input
                  type="text"
                  className="form-input"  // Добавляем класс
                  placeholder="Название работы"
                  value={newAdditionalItem.name}
                  onChange={(e) => setNewAdditionalItem({...newAdditionalItem, name: e.target.value})}
                />
                <input
                  type="text"
                  className="form-input"  // Добавляем класс
                  placeholder="Значение"
                  value={newAdditionalItem.value}
                  onChange={(e) => setNewAdditionalItem({...newAdditionalItem, value: e.target.value})}
                />
                <input
                  type="text"
                  className="form-input"  // Добавляем класс
                  placeholder="Ед. измерения"
                  value={newAdditionalItem.unit}
                  onChange={(e) => setNewAdditionalItem({...newAdditionalItem, unit: e.target.value})}
                />
                <button 
                  type="button"
                  className="add-item-button"
                  onClick={addAdditionalItem}
                >
                  Добавить
                </button>
              </div>

              {formData.additionalItems.map((item, index) => (
                <div key={index} className="added-item">
                  <span className="added-item-text">
                    {item.name}: {item.value} {item.unit || ''}
                  </span>
                  <button 
                    type="button"
                    className="remove-item-button"
                    onClick={() => removeAdditionalItem(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="save-btn">
                Добавить ТО
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Компонент модального окна добавления данных авто
const AddCarDataModal = ({ onClose, onSave }) => {
  const [fields, setFields] = useState([
    { name: '', value: '', unit: '' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = fields.every(field => field.name.trim() && field.value.trim());
    
    if (isValid) {
      onSave({ fields });
    }
  };

  const addField = () => {
    setFields([...fields, { name: '', value: '', unit: '' }]);
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);
    }
  };

  const updateField = (index, field, value) => {
    const updatedFields = fields.map((f, i) => 
      i === index ? { ...f, [field]: value } : f
    );
    setFields(updatedFields);
  };

  return (
    <div className="simple-modal-overlay" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div className="simple-modal-header">
          <h3>Добавить данные об авто</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="simple-modal-content">
          <form onSubmit={handleSubmit}>
              <div className="fields-list">
                {fields.map((field, index) => (
                  <div key={index} className="field-row">
                    <input
                      type="text"
                      className="form-input"  // Добавляем класс
                      placeholder="Название параметра"
                      value={field.name}
                      onChange={(e) => updateField(index, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-input"  // Добавляем класс
                      placeholder="Значение"
                      value={field.value}
                      onChange={(e) => updateField(index, 'value', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-input"  // Добавляем класс
                      placeholder="Ед. измерения"
                      value={field.unit}
                      onChange={(e) => updateField(index, 'unit', e.target.value)}
                    />
                    {fields.length > 1 && (
                      <button 
                        type="button"
                        className="remove-field-button"
                        onClick={() => removeField(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

            <button 
              type="button"
              className="add-field-button"
              onClick={addField}
            >
              + Добавить поле
            </button>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="save-btn">
                Сохранить данные
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Универсальное модальное окно подтверждения удаления
const ConfirmDeleteModal = ({ type, data, onClose, onConfirm }) => {
  const getTitle = () => {
    switch (type) {
      case 'car': return 'Удалить автомобиль';
      case 'maintenance': return 'Удалить запись ТО';
      case 'carData': return 'Удалить данные';
      default: return 'Удалить';
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'car':
        return `Вы уверены, что хотите удалить автомобиль "${data?.brand} ${data?.model}"? Все связанные данные будут удалены безвозвратно.`;
      case 'maintenance':
        return `Вы уверены, что хотите удалить запись ТО от ${data ? new Date(data.createdAt).toLocaleDateString('ru-RU') : ''}?`;
      case 'carData':
        return `Вы уверены, что хотите удалить эти данные от ${data ? new Date(data.createdAt).toLocaleDateString('ru-RU') : ''}?`;
      default:
        return 'Вы уверены, что хотите удалить этот элемент?';
    }
  };

  return (
    <div className="simple-modal-overlay" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()}>
        <div className="simple-modal-header">
          <h3>{getTitle()}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="simple-modal-content">
          <div className="delete-confirm">
            <p>{getMessage()}</p>
            <p className="warning-text">Это действие нельзя отменить.</p>
            
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отмена
              </button>
              <button type="button" className="delete-btn" onClick={onConfirm}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;