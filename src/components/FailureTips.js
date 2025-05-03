import React, { useState } from 'react';
import { failureTips } from '../mock/failureTips';

const FailureTips = () => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <button
        onClick={() => setShowTips(!showTips)}
        className="w-full text-left mb-2 font-semibold text-lg text-blue-600 hover:text-blue-800 transition-colors"
      >
        {showTips ? '▼' : '▶'} 25 Soluciones para Fallos del Sistema
      </button>
      
      {showTips && (
        <ul className="space-y-2 mt-2">
          {failureTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                {index + 1}
              </span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FailureTips;