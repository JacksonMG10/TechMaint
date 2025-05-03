import React, { useState } from 'react';
import TemperatureTips from './TemperatureTips';

const TemperatureImpactCalculator = () => {
  const [currentTemp, setCurrentTemp] = useState(40);
  const [referenceTemp, setReferenceTemp] = useState(30);

  const lifeReductionFactor = Math.pow(2, (currentTemp - referenceTemp) / 10);
  const lifePercentage = (100 / lifeReductionFactor).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Impacto de temperatura en vida útil</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Temperatura actual (°C):</label>
          <input
            type="number"
            value={currentTemp}
            onChange={(e) => setCurrentTemp(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Temperatura de referencia (°C):</label>
          <input
            type="number"
            value={referenceTemp}
            onChange={(e) => setReferenceTemp(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="font-medium">Vida útil estimada:</p>
          <p className="text-2xl font-bold text-red-600">{lifePercentage}%</p>
          <p className="text-sm text-gray-600 mt-2">
            Tu hardware durará un {lifePercentage}% de lo esperado a {referenceTemp}°C.
          </p>
        </div>
      </div>
      
      <TemperatureTips />
    </div>
  );
};

export default TemperatureImpactCalculator;

// DONE