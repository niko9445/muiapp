import React, { useState } from 'react';
import './CarDataSection.css';

const CarDataSection = ({ car, cars, setCars, onAddCarData, onDeleteCarData }) => {
  const currentCar = cars.find(c => c.id === car.id) || car;

  return (
    <div className="cardatasection__container">
      <div className="cardatasection__header">
        <h2 className="cardatasection__title">Информация об автомобиле</h2>
        <button 
          className="cardatasection__add-button"
          onClick={onAddCarData}
        >
          <svg className="cardatasection__add-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Добавить данные
        </button>
      </div>

      <div className="cardatasection__basic-info">
        <h3 className="cardatasection__subtitle">Основные данные</h3>
        <div className="cardatasection__basic-grid">
          <div className="cardatasection__basic-item">
            <span className="cardatasection__basic-label">Марка</span>
            <span className="cardatasection__basic-value">{currentCar.brand}</span>
          </div>
          <div className="cardatasection__basic-item">
            <span className="cardatasection__basic-label">Модель</span>
            <span className="cardatasection__basic-value">{currentCar.model}</span>
          </div>
          <div className="cardatasection__basic-item">
            <span className="cardatasection__basic-label">Год выпуска</span>
            <span className="cardatasection__basic-value">{currentCar.year}</span>
          </div>
        </div>
      </div>

      <div className="cardatasection__custom-data">
        <h3 className="cardatasection__subtitle">Дополнительная информация</h3>
        <div className="cardatasection__data-list">
          {currentCar.carData && currentCar.carData.length > 0 ? (
            currentCar.carData.map((data, index) => (
              <DataCard
                key={data.id}
                data={data}
                onDelete={() => onDeleteCarData(data)}
                position={index}
              />
            ))
          ) : (
            <div className="cardatasection__empty">
              <p>Нет дополнительных данных</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// DataCard оставляем как было
const DataCard = ({ data, onDelete, position }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div 
      className="cardatasection__card"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      style={{ animationDelay: `${position * 0.1}s` }}
    >
      <div className="cardatasection__card-header">
        <h4 className="cardatasection__card-title">
          Данные от {new Date(data.createdAt).toLocaleDateString('ru-RU')}
        </h4>
        
        {showDelete && (
          <button 
            className="cardatasection__delete-button"
            onClick={onDelete}
          >
            <svg className="cardatasection__delete-icon" viewBox="0 0 24 24" fill="none">
              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z" fill="currentColor"/>
              <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>

      <div className="cardatasection__card-content">
        {data.fields && data.fields.map((field, index) => (
          <div key={index} className="cardatasection__field">
            <span className="cardatasection__field-name">{field.name}:</span>
            <span className="cardatasection__field-value">{field.value} {field.unit || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDataSection;