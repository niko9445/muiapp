import { useState, useEffect } from "react";
import Table from "../Table/Table.jsx";
import EquipmentForm from "../EquipmentForm/EquipmentForm.jsx";

const API_URL = "/api/equipment";
const LOCAL_STORAGE_KEY = "equipment_data_backup";

const EquipmentPage = () => {
  const [rows, setRows] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState({
    page: true,
    form: false
  });
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    serialNumber: '',
    unit: 'шт.',
    quantity: 1,
    location: '',
    notes: ''
  });

  // Функция загрузки данных с сервера или из локального хранилища
  const fetchEquipmentData = async () => {
    setIsLoading(prev => ({ ...prev, page: true }));
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
      const data = await response.json();
      setRows(data);
      console.log("Загружены данные с сервера:", data);  // Лог для отладки
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data)); // Обновление локального хранилища
    } catch (serverError) {
      console.error("Server fetch failed:", serverError);
      try {
        const backup = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (backup) {
          const parsed = JSON.parse(backup);
          setRows(parsed);
          console.log("Загружены данные из локального хранилища:", parsed);  // Лог для отладки
          setError("Сервер недоступен. Используются последние сохранённые данные.");
        } else {
          throw new Error("No backup");
        }
      } catch (backupError) {
        console.error("Backup load failed:", backupError);
        setError("Не удалось загрузить данные. Сервер недоступен и резервных данных нет.");
      }
    } finally {
      setIsLoading(prev => ({ ...prev, page: false }));
    }
  };

  // Сохранение нового элемента оборудования
  const saveEquipmentItem = async (newItem) => {
    setIsLoading(prev => ({ ...prev, form: true }));
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Failed to save to server");
      const saved = await response.json();
      const updated = [...rows, saved];
      console.log("Добавлены новые данные:", updated);  // Лог для отладки
      setRows(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated)); // Обновление локального хранилища
      setError("Данные сохранены на сервере.");
    } catch (saveError) {
      console.error("Ошибка при сохранении:", saveError);
      const localItem = { ...newItem, id: Date.now() }; // ID на основе времени
      const updated = [...rows, localItem];
      console.log("Ошибка при сохранении на сервере, данные сохранены локально:", updated);  // Лог для отладки
      setRows(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated)); // Обновление локального хранилища
      setError("Сервер недоступен. Данные сохранены локально.");
    } finally {
      setIsLoading(prev => ({ ...prev, form: false }));
    }
  };

  // Получение данных при монтировании компонента
  useEffect(() => {
    fetchEquipmentData();
  }, []);

  // Обработчик изменений в форме
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(0, Number(value)) : value
    }));
  };

  // Обработка отправки формы
  const handleSubmit = async () => {
    const newItem = {
      ...formData,
      quantity: Number(formData.quantity) || 0
    };
    await saveEquipmentItem(newItem);
    resetForm();
  };

  // Сброс формы
  const resetForm = () => {
    setFormData({
      category: '',
      name: '',
      serialNumber: '',
      unit: 'шт.',
      quantity: 1,
      location: '',
      notes: ''
    });
    setIsFormVisible(false);
  };

  // Обработчик восстановления соединения (если сервер снова доступен)
  useEffect(() => {
    const handleOnline = () => {
      if (navigator.onLine && error?.includes("Сервер недоступен")) {
        fetchEquipmentData();
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [error]);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '24px', fontSize: '28px' }}>Учёт оборудования</h1>

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          marginBottom: '20px',
          borderRadius: '4px',
          borderLeft: '4px solid #f44336',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={() => setIsFormVisible(true)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '24px',
          fontSize: '15px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
        disabled={isLoading.page || isLoading.form}
      >
        {isLoading.form ? (
          <>
            <span className="spinner"></span>
            <span>Сохранение...</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '18px' }}>+</span>
            <span>Добавить оборудование</span>
          </>
        )}
      </button>

      {isLoading.page && !rows.length ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>Загрузка данных...</p>
        </div>
      ) : (
        <>
          <Table rows={rows} selectedRow={selectedRow} onRowClick={setSelectedRow} />
          {rows.length === 0 && !isLoading.page && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>Нет данных об оборудовании. Добавьте первое устройство.</p>
            </div>
          )}
        </>
      )}

      {isFormVisible && (
        <EquipmentForm
          title="Добавление оборудования"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isSubmitting={isLoading.form}
        />
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EquipmentPage;
