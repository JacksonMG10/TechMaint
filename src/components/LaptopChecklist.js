import React, { useState, useEffect } from 'react';
import { laptopChecklistItems as initialItems } from '../mock/laptopChecklist';

const LaptopChecklist = ({ onSave }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('laptopChecklist');
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [diagnosis, setDiagnosis] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    localStorage.setItem('laptopChecklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const saveChecklist = () => {
    const completedCount = items.filter(item => item.completed).length;
    const totalItems = items.length;
    const percentage = Math.round((completedCount / totalItems) * 100);
    
    if (!status || !diagnosis) {
      alert('Por favor completa el diagnóstico');
      return;
    }

    let color = '';
    if (status === 'excelente') color = 'bg-green-100 text-green-800';
    else if (status === 'bueno') color = 'bg-blue-100 text-blue-800';
    else if (status === 'regular') color = 'bg-yellow-100 text-yellow-800';
    else color = 'bg-red-100 text-red-800';
    
    const historyRecord = {
      type: 'laptop',
      date: new Date().toISOString(),
      completed: completedCount,
      total: totalItems,
      percentage: percentage,
      diagnosis: {
        status: status,
        message: diagnosis,
        color: color
      }
    };
    
    const history = JSON.parse(localStorage.getItem('laptopChecklistHistory')) || [];
    const newHistory = [...history, historyRecord];
    localStorage.setItem('laptopChecklistHistory', JSON.stringify(newHistory));
    
    onSave(newHistory);
  };

  const resetChecklist = () => {
    setItems(initialItems);
    setDiagnosis('');
    setStatus('');
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalItems = items.length;
  const progressPercentage = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Checklist Portátil</h2>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalItems} completados
        </span>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto mb-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                id={`laptop-item-${item.id}`}
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="h-4 w-4 text-green-600 rounded"
              />
              <label
                htmlFor={`laptop-item-${item.id}`}
                className={`ml-2 ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
              >
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Estado del equipo:</label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecciona un estado</option>
          <option value="excelente">Excelente</option>
          <option value="bueno">Bueno</option>
          <option value="regular">Regular</option>
          <option value="critico">Crítico</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Diagnóstico personalizado:</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Describe los problemas encontrados..."
          className="w-full p-2 border border-gray-300 rounded"
          rows="3"
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={saveChecklist}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Guardar Revisión
        </button>
        <button
          onClick={resetChecklist}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Reiniciar Checklist
        </button>
      </div>
    </div>
  );
};

export default LaptopChecklist;

// DONE