import React, { useState, useEffect } from 'react';
import DesktopChecklist from './DesktopChecklist';
import LaptopChecklist from './LaptopChecklist';
import ChecklistHistory from './ChecklistHistory';

const ChecklistTab = () => {
  const [activeTab, setActiveTab] = useState('desktop');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const desktopHistory = JSON.parse(localStorage.getItem('desktopChecklistHistory')) || [];
    const laptopHistory = JSON.parse(localStorage.getItem('laptopChecklistHistory')) || [];
    setHistory([...desktopHistory, ...laptopHistory].sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const handleSave = (newHistory) => {
    const desktopHistory = JSON.parse(localStorage.getItem('desktopChecklistHistory')) || [];
    const laptopHistory = JSON.parse(localStorage.getItem('laptopChecklistHistory')) || [];
    setHistory([...desktopHistory, ...laptopHistory].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'desktop' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('desktop')}
          >
            PC de Escritorio
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'laptop' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('laptop')}
          >
            Portátil
          </button>
        </div>

        <div className="min-h-[500px]">
          {activeTab === 'desktop' && <DesktopChecklist onSave={handleSave} />}
          {activeTab === 'laptop' && <LaptopChecklist onSave={handleSave} />}
        </div>
      </div>

      <ChecklistHistory history={history} />
    </div>
  );
};

export default ChecklistTab;