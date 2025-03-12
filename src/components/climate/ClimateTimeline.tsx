// ClimateTimeline.tsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Droplets, Activity } from 'lucide-react';
import { majorClimateEvents, getClimateDataForYear, getFutureProjection } from '../constants/climateData';

interface ClimateTimelineProps {
  dateOfBirth: string; // Format: "YYYY-MM-DD"
}

const ClimateTimeline: React.FC<ClimateTimelineProps> = ({ dateOfBirth }) => {
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [birthYear, setBirthYear] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [years, setYears] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Parse birth year from dateOfBirth
    const birthDate = new Date(dateOfBirth);
    const birthYearValue = birthDate.getFullYear();
    setBirthYear(birthYearValue);
    
    // Calculate current age
    const currentYear = new Date().getFullYear();
    setAge(currentYear - birthYearValue);
    
    // Set default selected year to current year
    setSelectedYear(currentYear);
    
    // Generate array of years from birth to 2100
    const yearsArray = [];
    for (let year = birthYearValue; year <= 2100; year += 10) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
    
    // Check if viewing on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [dateOfBirth]);
  
  // Get climate data for selected year
  const climateData = selectedYear ? getClimateDataForYear(selectedYear) : null;
  const futureProjection = selectedYear > new Date().getFullYear() ? getFutureProjection(selectedYear) : null;
  
  // Find the closest year with major climate events
  const eventsToShow = climateData?.events || [];
  if (eventsToShow.length === 0) {
    // Look for events within 3 years of selected year
    for (let i = 1; i <= 3; i++) {
      const prevYearEvents = majorClimateEvents[selectedYear - i] || [];
      const nextYearEvents = majorClimateEvents[selectedYear + i] || [];
      if (prevYearEvents.length > 0) {
        eventsToShow.push(`${selectedYear - i}: ${prevYearEvents[0]}`);
        break;
      }
      if (nextYearEvents.length > 0) {
        eventsToShow.push(`${selectedYear + i}: ${nextYearEvents[0]}`);
        break;
      }
    }
  }

  // Determine if selected year is in past, present, or future
  const currentYear = new Date().getFullYear();
  const timeframe = 
    selectedYear < currentYear ? "past" : 
    selectedYear === currentYear ? "present" : "future";
  
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-2">3</span>
        Your Climate Timeline
      </h3>
      
      <div className="bg-amber-50 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
          <p className="text-amber-800">
            This timeline shows climate conditions from your birth year ({birthYear}) to 2100, allowing you to track climate changes across your lifetime.
          </p>
        </div>
      </div>
      
      {/* Year selector - horizontal scrollable on mobile */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className={`flex space-x-2 ${!isMobile && 'flex-wrap gap-y-2'}`} style={isMobile ? { minWidth: 'max-content' } : {}}>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedYear === year 
                  ? 'bg-amber-600 text-white' 
                  : year <= currentYear
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-amber-50 text-amber-500 hover:bg-amber-100'
              }`}
            >
              {year} {year === birthYear && '(birth)'} {year === currentYear && '(now)'}
            </button>
          ))}
        </div>
      </div>
      
      {climateData && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className={`p-4 ${
            timeframe === 'past' ? 'bg-blue-50' : 
            timeframe === 'present' ? 'bg-amber-50' : 'bg-red-50'
          }`}>
            <h4 className={`text-lg font-bold ${
              timeframe === 'past' ? 'text-blue-700' : 
              timeframe === 'present' ? 'text-amber-700' : 'text-red-700'
            }`}>
              {selectedYear}: {timeframe === 'past' ? 'Historical Data' : timeframe === 'present' ? 'Current Conditions' : 'Projected Scenario'}
            </h4>
            <p className="text-gray-600 text-sm">
              {timeframe === 'past' 
                ? `When you were ${selectedYear - birthYear} years old` 
                : timeframe === 'present' 
                  ? `You are currently ${age} years old`
                  : `When you will be ${selectedYear - birthYear} years old`}
            </p>
          </div>
          
          {/* Climate indicators */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CO2 Levels */}
            <div className="flex items-start">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">CO₂ Concentration</h5>
                <p className="text-2xl font-bold text-amber-600">{climateData.co2} ppm</p>
                <p className="text-xs text-gray-500">
                  {climateData.co2 > 350 ? 'Exceeds pre-industrial levels by over 25%' : 'Approaching concerning levels'}
                </p>
              </div>
            </div>
            
            {/* Temperature Change */}
            <div className="flex items-start">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Temperature Change</h5>
                <p className="text-2xl font-bold text-red-600">+{climateData.temperature.toFixed(1)}°C</p>
                <p className="text-xs text-gray-500">
                  {climateData.temperature > 1.5 
                    ? 'Exceeds Paris Agreement target' 
                    : climateData.temperature > 1.0 
                      ? 'Approaching critical threshold'
                      : 'Relative to pre-industrial levels'}
                </p>
              </div>
            </div>
            
            {/* Sea Level Rise */}
            <div className="flex items-start">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Sea Level Rise</h5>
                <p className="text-2xl font-bold text-blue-600">{climateData.seaLevel > 0 ? '+' : ''}{climateData.seaLevel} cm</p>
                <p className="text-xs text-gray-500">
                  {climateData.seaLevel > 20 
                    ? 'Significant coastal impact' 
                    : 'Relative to year 2000 levels'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Major events and projections */}
          <div className="border-t border-gray-100 p-6">
            <h5 className="font-medium text-gray-900 mb-3">
              {timeframe === 'future' ? 'Projected Impacts' : 'Notable Events'}
            </h5>
            
            {timeframe === 'future' && futureProjection ? (
              <div>
                <p className="text-gray-700 mb-3">{futureProjection.description}</p>
                <ul className="space-y-2">
                  {futureProjection.consequences.map((consequence, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2 flex-shrink-0">
                        !
                      </div>
                      <span className="text-gray-700">{consequence}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-3">Source: {futureProjection.source}</p>
              </div>
            ) : eventsToShow.length > 0 ? (
              <ul className="space-y-2">
                {eventsToShow.map((event, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                      i
                    </div>
                    <span className="text-gray-700">{event}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No major climate events recorded for this year.</p>
            )}
          </div>
          
          {/* Personal context */}
          <div className="border-t border-gray-100 bg-gray-50 p-6">
            <h5 className="font-medium text-gray-900 mb-3">What This Means For You</h5>
            <p className="text-gray-700">
              {timeframe === 'past' 
                ? `During this period of your life, you experienced a world with ${climateData.co2} ppm CO₂ levels and temperatures ${climateData.temperature.toFixed(1)}°C above pre-industrial levels.`
                : timeframe === 'present'
                  ? `Right now, you're living in a world with rapidly changing climate conditions that will continue to evolve throughout your lifetime.`
                  : `If you live to see ${selectedYear}, you may experience a world with significantly different climate conditions than today.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClimateTimeline;