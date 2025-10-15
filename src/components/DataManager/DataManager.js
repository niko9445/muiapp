import React, { useRef, useState } from 'react';
import { exportData, importData } from '../../utils/database';
import Notification from '../Notification/Notification';
import './DataManager.css';

const DataManager = () => {
  const fileInputRef = useRef(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showNotification = (type, title, message) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `car-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showNotification(
        'export',
        'Экспорт завершен',
        'Все данные успешно экспортированы в файл'
      );
    } catch (error) {
      showNotification(
        'success',
        'Ошибка экспорта',
        'Произошла ошибка при экспорте данных'
      );
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        importData(data);
        
        showNotification(
          'import',
          'Импорт завершен',
          'Данные успешно импортированы. Страница будет перезагружена через 2 секунды.'
        );

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        showNotification(
          'success',
          'Ошибка импорта',
          'Проверьте файл. Возможно, он поврежден или имеет неверный формат.'
        );
        console.error('Import error:', error);
      }
    };
    
    reader.onerror = () => {
      showNotification(
        'success',
        'Ошибка чтения',
        'Не удалось прочитать файл'
      );
    };
    
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="datamanager__container">
        <h3 className="datamanager__title">Управление данными</h3>
        <p className="datamanager__description">
          Экспортируйте данные для резервного копирования или импортируйте для переноса на другой компьютер
        </p>
        
        <div className="datamanager__actions">
          <button 
            className="datamanager__button datamanager__button--export"
            onClick={handleExport}
          >
            <svg className="datamanager__icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 13L12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H6a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Скачать backup
          </button>
          
          <button 
            className="datamanager__button datamanager__button--import"
            onClick={handleImportClick}
          >
            <svg className="datamanager__icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 11L12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H6a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Загрузить backup
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <Notification
        isOpen={notification.isOpen}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        duration={3000}
      />
    </>
  );
};

export default DataManager;