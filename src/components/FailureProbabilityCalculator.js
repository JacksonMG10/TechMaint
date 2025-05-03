import React, { useState } from 'react';
import FailureTips from './FailureTips';

const FailureProbabilityCalculator = () => {
  const [dailyFailureProb, setDailyFailureProb] = useState(0.01);
  const [days, setDays] = useState(30);

  const successProbability = Math.pow(1 - dailyFailureProb, days);
  const successPercentage = (successProbability * 100).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Probabilidad de fallo del sistema</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Probabilidad diaria de fallo (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={dailyFailureProb * 100}
            onChange={(e) => setDailyFailureProb(e.target.value / 100)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Número de días:</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="font-medium">Probabilidad de éxito continuo:</p>
          <p className="text-2xl font-bold text-blue-600">{successPercentage}%</p>
          <p className="text-sm text-gray-600 mt-2">
            La probabilidad de que tu sistema no falle en {days} días consecutivos es del {successPercentage}%.
          </p>
        </div>
      </div>
      
      <FailureTips />
    </div>
  );
};

export default FailureProbabilityCalculator;