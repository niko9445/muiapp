import React from 'react';
import './Sidebar.css';

const CarCard = ({ car, isSelected, onSelect, onEdit, onDelete, isMobile = false }) => {
  return (
    <div
      className={`car-card ${isSelected ? 'car-card--selected' : ''} ${isMobile ? 'car-card--mobile' : ''}`}
      onClick={onSelect}
    >
      <div className="car-card__content">
        <div className="car-card__info">
          <div className="car-card__title">
            {car.brand} {car.model}
          </div>
          <div className="car-card__year">
            {car.year} год
          </div>
        </div>
        <div className="car-card__actions">
          <button
            className="car-card__btn car-card__btn--edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(car);
            }}
            title="Редактировать"
          >
            ✏️
          </button>
          <button
            className="car-card__btn car-card__btn--delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(car);
            }}
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ 
  cars, 
  selectedCar, 
  setSelectedCar, 
  isMobile = false, 
  onClose,
  onAddCar,
  onEditCar,
  onDeleteCar
}) => {
  const handleCarSelect = (car) => {
    setSelectedCar(car);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="sidebar__container">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Мои автомобили</h2>
        
        {isMobile && (
          <button 
            className="sidebar__close-btn"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            ✕
          </button>
        )}
        
        <button 
          className="sidebar__add-button"
          onClick={onAddCar}
        >
          <span className="sidebar__add-icon">+</span>
          Добавить авто
        </button>
      </div>

      <div className="sidebar__cars-list">
        {cars.length === 0 ? (
          <div className="sidebar__empty">
            <div className="sidebar__empty-icon">🚗</div>
            <p className="sidebar__empty-text">Нет автомобилей</p>
            <p className="sidebar__empty-subtext">Добавьте первый автомобиль</p>
          </div>
        ) : (
          cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isSelected={selectedCar && selectedCar.id === car.id}
              onSelect={() => handleCarSelect(car)}
              onEdit={onEditCar}
              onDelete={onDeleteCar}
              isMobile={isMobile}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;