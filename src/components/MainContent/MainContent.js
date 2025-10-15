import React, { useState } from 'react';
import MaintenanceSection from './MaintenanceSection';
import CarDataSection from './CarDataSection';
import EditMaintenanceModal from '../EditCarModal/EditMaintenanceModal'; // Добавляем импорт
import './MainContent.css';

const MainContent = ({ 
  selectedCar, 
  cars, 
  setCars, 
  activeSection, 
  setActiveSection,
  onAddMaintenance,
  onAddCarData,
  onDeleteMaintenance,
  onDeleteCarData
}) => {
  const [editingMaintenance, setEditingMaintenance] = useState(null);
  const [isEditMaintenanceModalOpen, setIsEditMaintenanceModalOpen] = useState(false);

  const handleEditMaintenance = (maintenance) => {
    // Закрываем все другие модалки
    setIsEditMaintenanceModalOpen(false); // Сначала закрываем
    setEditingMaintenance(null);
    
    // Затем открываем нужную модалку
    setTimeout(() => {
        setEditingMaintenance(maintenance);
        setIsEditMaintenanceModalOpen(true);
    }, 10);
    };

  const handleSaveMaintenance = (maintenanceId, updatedData) => {
    // Логика сохранения изменений ТО
    const updatedCars = cars.map(car => {
      if (car.id === selectedCar.id) {
        const updatedMaintenance = car.maintenance?.map(m => 
          m.id === maintenanceId ? { ...m, ...updatedData } : m
        );
        return { ...car, maintenance: updatedMaintenance };
      }
      return car;
    });
    setCars(updatedCars);
    setIsEditMaintenanceModalOpen(false);
    setEditingMaintenance(null);
  };

  if (!selectedCar) {
    return (
      <div className="maincontent__empty">
        <div className="maincontent__empty-icon">🚗</div>
        <h3 className="maincontent__empty-title">Выберите автомобиль</h3>
        <p className="maincontent__empty-text">
          Выберите автомобиль из спики слева или добавьте новый
        </p>
      </div>
    );
  }

  return (
    <div className="maincontent__container">
      <div className="maincontent__header">
        <h1 className="maincontent__title">
          {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
        </h1>
        
        <div className="maincontent__tabs">
          <button
            className={`maincontent__tab ${activeSection === 'maintenance' ? 'maincontent__tab--active' : ''}`}
            onClick={() => setActiveSection('maintenance')}
          >
            <svg className="maincontent__tab-icon" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Техническое обслуживание
          </button>
          
          <button
            className={`maincontent__tab ${activeSection === 'carData' ? 'maincontent__tab--active' : ''}`}
            onClick={() => setActiveSection('carData')}
          >
            <svg className="maincontent__tab-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 11a5 5 0 0 1 5 5v6H7v-6a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Данные об авто
          </button>
        </div>
      </div>

      <div className="maincontent__content">
        {activeSection === 'maintenance' && (
          <MaintenanceSection 
            car={selectedCar}
            cars={cars}
            setCars={setCars}
            onAddMaintenance={onAddMaintenance}
            onDeleteMaintenance={onDeleteMaintenance}
            onEditMaintenance={handleEditMaintenance} // Добавляем пропс
          />
        )}
        
        {activeSection === 'carData' && (
          <CarDataSection 
            car={selectedCar}
            cars={cars}
            setCars={setCars}
            onAddCarData={onAddCarData}
            onDeleteCarData={onDeleteCarData}
          />
        )}
      </div>

      {/* Модальное окно редактирования ТО */}
      {isEditMaintenanceModalOpen && (
        <EditMaintenanceModal
          maintenance={editingMaintenance}
          onClose={() => {
            setIsEditMaintenanceModalOpen(false);
            setEditingMaintenance(null);
          }}
          onSave={handleSaveMaintenance}
        />
      )}
    </div>
  );
};

export default MainContent;