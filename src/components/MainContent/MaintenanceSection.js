    import React, { useState } from 'react';
    import './MaintenanceSection.css';

    const MaintenanceSection = ({ car, cars, setCars, onAddMaintenance, onDeleteMaintenance, onEditMaintenance }) => {
    const currentCar = cars.find(c => c.id === car.id) || car;

    return (
        <div className="maintenancesection__container">
        <div className="maintenancesection__header">
            <h2 className="maintenancesection__title">История ТО</h2>
            <button 
            className="maintenancesection__add-button"
            onClick={onAddMaintenance}
            >
            <svg className="maintenancesection__add-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Добавить ТО
            </button>
        </div>

        <div className="maintenancesection__list">
            {currentCar.maintenance && currentCar.maintenance.length > 0 ? (
            currentCar.maintenance.map((maintenance, index) => (
                <MaintenanceCard
                key={maintenance.id}
                maintenance={maintenance}
                car={currentCar}
                onDelete={() => onDeleteMaintenance(maintenance)}
                onEdit={() => onEditMaintenance(maintenance)}
                position={index}
                />
            ))
            ) : (
            <div className="maintenancesection__empty">
                <p>Нет записей о техническом обслуживании</p>
            </div>
            )}
        </div>
        </div>
    );
    };

    const MaintenanceCard = ({ maintenance, car, onDelete, onEdit, position }) => {
    const [showActions, setShowActions] = useState(false);

    const handleEditClick = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
        onEdit();
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
        onDelete();
    };

    return (
        <div 
        className="maintenancesection__card"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        style={{ animationDelay: `${position * 0.1}s` }}
        >
        <div className="maintenancesection__card-header">
            <h4 className="maintenancesection__card-title">
            ТО от {new Date(maintenance.createdAt).toLocaleDateString('ru-RU')}
            </h4>
            
            {showActions && (
            <div className="maintenancesection__card-actions">
                <button 
                className="maintenancesection__edit-button"
                onClick={handleEditClick}
                title="Редактировать"
                >
                <svg className="maintenancesection__edit-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                </button>
                <button 
                className="maintenancesection__delete-button"
                onClick={handleDeleteClick}
                title="Удалить"
                >
                <svg className="maintenancesection__delete-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z" fill="currentColor"/>
                    <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                </svg>
                </button>
            </div>
            )}
        </div>

        <div className="maintenancesection__card-info">
            <div className="maintenancesection__info-row">
            <span className="maintenancesection__info-label">Пробег:</span>
            <span className="maintenancesection__info-value">{maintenance.mileage.toLocaleString()} км</span>
            </div>

            <div className="maintenancesection__info-row">
            <span className="maintenancesection__info-label">Затраты:</span>
            <span className="maintenancesection__info-value maintenancesection__cost">
                {maintenance.cost ? `${maintenance.cost.toLocaleString()} ₽` : 'Не указано'}
            </span>
            </div>
            
            <div className="maintenancesection__service-info">
            <div className="maintenancesection__service-item">
                <span className="maintenancesection__service-label">Следующая замена масла:</span>
                <span className="maintenancesection__service-value">
                {maintenance.mileage + maintenance.oilChangeStep} км
                </span>
            </div>
            
            <div className="maintenancesection__service-item">
                <span className="maintenancesection__service-label">Следующая замена фильтров:</span>
                <span className="maintenancesection__service-value">
                {maintenance.mileage + maintenance.filterChangeStep} км
                </span>
            </div>
            </div>

            {maintenance.additionalItems && maintenance.additionalItems.length > 0 && (
            <div className="maintenancesection__additional">
                <span className="maintenancesection__additional-label">Дополнительные работы:</span>
                {maintenance.additionalItems.map((item, index) => (
                <div key={index} className="maintenancesection__additional-item">
                    • {item.name}: {item.value} {item.unit || ''}
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
    };

    export default MaintenanceSection;