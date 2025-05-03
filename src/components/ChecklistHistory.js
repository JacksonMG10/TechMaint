import React from 'react';

const ChecklistHistory = ({ history }) => {
  const clearHistory = () => {
    if (window.confirm('¿Estás seguro de querer borrar todo el historial?')) {
      localStorage.removeItem('desktopChecklistHistory');
      localStorage.removeItem('laptopChecklistHistory');
      window.location.reload();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Historial de Revisiones</h2>
        <button 
          onClick={clearHistory}
          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
        >
          Limpiar Historial
        </button>
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-500">No hay revisiones registradas aún</p>
      ) : (
        <ul className="divide-y">
          {history.map((record, index) => (
            <li key={index} className="py-3">
              <div className="flex justify-between">
                <span className="font-medium">
                  {record.type === 'desktop' ? 'PC Escritorio' : 'Portátil'}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(record.date).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Completado: {record.completed}/{record.total}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${record.percentage >= 80 ? 'bg-green-100 text-green-800' : record.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {record.percentage}%
                </span>
              </div>
              {record.diagnosis && (
                <div className={`mt-2 p-2 text-sm rounded ${record.diagnosis.color}`}>
                  <span className="font-medium">Estado:</span> {record.diagnosis.message}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistHistory;

// DONE