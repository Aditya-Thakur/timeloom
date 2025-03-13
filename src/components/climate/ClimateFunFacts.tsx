// ClimateFunFacts.tsx
import React, { useEffect, useState } from 'react';
import { Lightbulb, ExternalLink } from 'lucide-react';
import { getClimateDataForYear, getRandomClimateFact } from '../constants/climateData';

interface ClimateFunFactsProps {
  milestoneDays: number[];
  dateOfBirth: string;
}

interface MilestoneFactData {
  days: number;
  year: number;
  co2: number;
  temperature: number;
  fact: string;
}

const ClimateFunFacts: React.FC<ClimateFunFactsProps> = ({ milestoneDays, dateOfBirth }) => {
  const [milestoneData, setMilestoneData] = useState<MilestoneFactData[]>([]);
  
  useEffect(() => {
    // Calculate the year for each milestone day
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const milestoneYears: MilestoneFactData[] = milestoneDays.map(days => {
        const milestoneDate = new Date(birthDate);
        milestoneDate.setDate(milestoneDate.getDate() + days);
        const year = milestoneDate.getFullYear();
        const climateData = getClimateDataForYear(year);
        
        return {
          days,
          year,
          co2: climateData.co2,
          temperature: climateData.temperature,
          fact: getRandomClimateFact()
        };
      });
      
      setMilestoneData(milestoneYears);
    }
  }, [dateOfBirth, milestoneDays]);
  
  if (milestoneData.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">5</span>
        Climate Facts
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {milestoneData.map((milestone) => (
          <div key={milestone.days} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-50 py-3 px-4 border-b border-blue-100">
              <h4 className="font-medium text-blue-800">Your {milestone.days.toLocaleString()}-Day Milestone (~Year {milestone.year})</h4>
            </div>
            
            <div className="p-4">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-gray-700 text-sm">
                  {milestone.fact}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h5 className="text-sm font-medium text-gray-800 mb-2">Climate Snapshot</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">CO₂ Levels:</span> 
                    <span className="ml-1 font-medium">{milestone.co2} ppm</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Temperature:</span>
                    <span className="ml-1 font-medium">+{milestone.temperature.toFixed(1)}°C</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-right">
                <a 
                  href="https://climate.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                >
                  Learn more about climate change <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
        <p>
          <strong>Did you know?</strong> The average person in a developed country will generate about 700,000 kg of CO₂ in their lifetime. Reducing your carbon footprint by just 5% could save 35,000 kg of CO₂ emissions!
        </p>
      </div>
    </div>
  );
};

export default ClimateFunFacts;