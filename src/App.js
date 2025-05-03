import React, { useState } from 'react';
import Header from './components/Header';
import FailureProbabilityCalculator from './components/FailureProbabilityCalculator';
import TemperatureImpactCalculator from './components/TemperatureImpactCalculator';
import ChecklistTab from './components/ChecklistTab';
import Footer from './components/Footer';

const App = () => {
  const [activeTab, setActiveTab] = useState('failure');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex mb-6 border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'failure' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('failure')}
          >
            Probabilidad de fallo
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'temperature' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('temperature')}
          >
            Impacto de temperatura
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'checklist' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('checklist')}
          >
            Checklist de Mantenimiento
          </button>
        </div>
        
        {activeTab === 'failure' && <FailureProbabilityCalculator />}
        {activeTab === 'temperature' && <TemperatureImpactCalculator />}
        {activeTab === 'checklist' && <ChecklistTab />}
      </div>
      <Footer />
    </div>
  );
};

export default App;

// DONE