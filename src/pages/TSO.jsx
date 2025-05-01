import React, { useState } from 'react';
import Table from '../components/Table/Table';
import SearchBar from '../components/SearchBar/SearchBar';
import AddModal from '../components/Modals/AddModal';
import EditModal from '../components/Modals/EditModal';
import DeleteModal from '../components/Modals/DeleteModal';
import './style.css';

const initialRows = [
  {
    id: 1,
    category: 'Камера',
    name: 'Камера видеонаблюдения',
    serialNumber: 'SN123456',
    unit: 'шт.',
    quantity: 10,
    location: 'Склад',
    notes: 'Старый образец'
  },
  {
    id: 2,
    category: 'Датчик',
    name: 'Датчик движения',
    serialNumber: 'SN234567',
    unit: 'шт.',
    quantity: 5,
    location: 'Офис',
    notes: 'Новый'
  }
];

const TSO = () => {
  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    serialNumber: '',
    unit: 'шт.',
    quantity: 0,
    location: '',
    notes: ''
  });

  // Фильтрация данных
  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Обработчик изменения полей формы
  const handleInputChange = e => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' 
        ? Math.max(0, parseInt(value) || 0)  // Исправлено: добавлена закрывающая скобка
        : value
    }));
  };
  // Добавление новой строки
  const handleAddRow = () => {
    if (!formData.category.trim() || !formData.name.trim()) {
      alert('Заполните обязательные поля: Категория и Наименование');
      return;
    }

    const newRow = {
      id: Date.now(),
      ...formData,
      quantity: Math.max(0, formData.quantity)
    };

    setRows(prev => [...prev, newRow]);
    setOpenAddModal(false);
    resetForm();
  };

  // Редактирование строки
  const handleEditRow = () => {
    if (!selectedRow) return;

    setRows(prev =>
      prev.map(row =>
        row.id === selectedRow.id 
          ? { ...formData, id: selectedRow.id }
          : row
      )
    );
    setOpenEditModal(false);
    setSelectedRow(null);
  };

  // Удаление строки
  const handleDeleteRow = () => {
    if (!selectedRow) return;

    setRows(prev => prev.filter(row => row.id !== selectedRow.id));
    setOpenDeleteModal(false);
    setSelectedRow(null);
  };

  // Сброс формы
  const resetForm = () => {
    setFormData({
      category: '',
      name: '',
      serialNumber: '',
      unit: 'шт.',
      quantity: 0,
      location: '',
      notes: ''
    });
  };

  // Открытие модалки редактирования
  const handleOpenEditModal = () => {
    if (selectedRow) {
      setFormData({ ...selectedRow });
      setOpenEditModal(true);
    }
  };

  return (
    <div className="tso-container">
      <div className="controls">
        <SearchBar
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onAddClick={() => setOpenAddModal(true)}
        />
      </div>

      <Table
        rows={filteredRows}
        selectedRow={selectedRow}
        onRowClick={row => setSelectedRow(row)}
      />

      {selectedRow && (
        <div className="action-buttons">
          <button
            className="danger"
            onClick={() => setOpenDeleteModal(true)}
          >
            Удалить
          </button>
          <button
            className="primary"
            onClick={handleOpenEditModal}
          >
            Редактировать
          </button>
        </div>
      )}

      <AddModal
        isOpen={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleAddRow}
      />

      <EditModal
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedRow(null);
        }}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleEditRow}
      />

      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteRow}
        itemName={selectedRow?.name}
      />
    </div>
  );
};

export default TSO;