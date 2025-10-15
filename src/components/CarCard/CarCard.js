import React, { useState } from 'react';
import './CarCard.css';

const CarCard = ({ car, isSelected, onSelect, onDelete, onEdit, position }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className={`carcard__container ${isSelected ? 'carcard__container--selected' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onSelect}
      style={{ animationDelay: `${position * 0.1}s` }}
    >
      <div className="carcard__content">
        <div className="carcard__main-info">
          <h3 className="carcard__title">{car.brand} {car.model}</h3>
          <p className="carcard__year">{car.year}</p>
        </div>
        
        {showActions && (
          <div className="carcard__actions">
            <button 
              className="carcard__edit-button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              title="Редактировать"
            >
              <svg className="carcard__edit-icon" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <button 
              className="carcard__delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Удалить"
            >
              <svg className="carcard__delete-icon" viewBox="0 0 24 24" fill="none">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z" fill="currentColor"/>
                <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;