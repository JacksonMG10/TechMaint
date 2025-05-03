import React from 'react';
import { maintenanceTips } from '../mock/maintenanceTips';

const MaintenanceTips = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">25 Consejos para Mantener tus Dispositivos</h2>
      <ul className="space-y-3">
        {maintenanceTips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
              {index + 1}
            </span>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceTips;