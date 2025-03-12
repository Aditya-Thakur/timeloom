// ClimateImpactOverlay.tsx
import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { getClimateDataForYear } from './climateData';

interface ClimateImpactOverlayProps {
  year: number;
  isPast: boolean;
}

const ClimateImpactOverlay: React.FC<ClimateImpactOverlayProps> = ({ year, isPast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const climateData = getClimateDataForYear(year);
  
  return (
    <div className="mt-2">
      <div className={`text-xs ${isPast ? 'text-amber-600' : 'text-amber-400'} flex items-center`}>
        <span className="mr-1">
          CO₂: {climateData.co2} ppm
        </span>
        <button 
          onClick={() => setIsExpanded(true)}
          className="rounded-full p-1 hover:bg-amber-50"
          aria-label="View climate impact details"
        >
          <Info size={12} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Climate Impact: {year}
                </h3>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-700 mb-2">Key Climate Indicators</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">CO₂ Level:</span>
                      <span className="font-medium">{climateData.co2} ppm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Temperature Change:</span>
                      <span className="font-medium">{climateData.temperature > 0 ? '+' : ''}{climateData.temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sea Level Rise:</span>
                      <span className="font-medium">{climateData.seaLevel} cm</span>
                    </div>
                  </div>
                </div>
                
                {climateData.events.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Major Climate Events</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {climateData.events.map((event, idx) => (
                        <li key={idx}>{event}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="text-sm text-gray-500 mt-4">
                  <p>Data sourced from NOAA, NASA, and IPCC reports. These values represent global averages.</p>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-700">
                    {isPast ? 
                      "This represents the climate conditions you've already experienced." : 
                      "This represents projected climate conditions you may experience in the future."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClimateImpactOverlay;