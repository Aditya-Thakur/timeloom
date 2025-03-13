// ClimateShareImage.tsx - Component for generating climate share images
import React, { forwardRef } from 'react';
import { getClimateDataForYear } from './constants/climateData';

interface ClimateShareImageProps {
  dateOfBirth: string;
}

const ClimateShareImage = forwardRef<HTMLDivElement, ClimateShareImageProps>(
  ({ dateOfBirth }, ref) => {
    // Calculate birth year
    const birthYear = new Date(dateOfBirth).getFullYear();
    
    // Generate timeline years for climate data
    const generateTimelineYears = (): number[] => {
      const years = [];
      const currentYear = new Date().getFullYear();
      
      // Add birth year
      years.push(birthYear);
      
      // Add current year if different from birth year
      if (currentYear !== birthYear) {
        years.push(currentYear);
      }
      
      // Add future years at 25-year intervals
      for (let year = birthYear + 25; year <= birthYear + 100; year += 25) {
        if (year > currentYear) {
          years.push(year);
        }
      }
      
      return years.sort((a, b) => a - b);
    };
    
    const timelineYears = generateTimelineYears();

    return (
      <div 
        ref={ref} 
        className="w-full max-w-lg p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg border-2 border-amber-200 shadow-lg"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-amber-800">My Climate Timeline</h3>
            <p className="text-amber-600">
              From {birthYear} to {new Date().getFullYear() + 80}
            </p>
          </div>
          <div className="bg-white rounded-full p-2 shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10V16M20 16V22M20 16H26M20 16H14" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13 28C13 25.7909 14.7909 24 17 24H23C25.2091 24 27 25.7909 27 28V28C27 30.2091 25.2091 32 23 32H17C14.7909 32 13 30.2091 13 28V28Z" stroke="#D97706" strokeWidth="2"/>
              <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" stroke="#D97706" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* CO2 Graph - Fixed positioning issues */}
          <div className="bg-white bg-opacity-70 rounded-lg p-4">
            <h4 className="font-bold text-amber-700 mb-2">CO₂ Concentration Over Your Lifetime</h4>
            <div className="h-40 relative mb-4"> {/* Increased height and added margin */}
              {/* Y-axis */}
              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between items-end pr-1">
                <span className="text-xs text-gray-500">650 ppm</span>
                <span className="text-xs text-gray-500">500 ppm</span>
                <span className="text-xs text-gray-500">350 ppm</span>
                <span className="text-xs text-gray-500">300 ppm</span>
              </div>
              
              {/* Graph area */}
              <div className="absolute left-10 right-0 top-0 bottom-8"> {/* Added bottom space for x-axis labels */}
                {/* Horizontal grid lines */}
                <div className="absolute w-full h-full flex flex-col justify-between">
                  <div className="border-t border-gray-200 w-full"></div>
                  <div className="border-t border-gray-200 w-full"></div>
                  <div className="border-t border-gray-200 w-full"></div>
                  <div className="border-t border-gray-200 w-full"></div>
                </div>
                
                {/* Graph line - Fixed SVG positioning */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#92400E" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={`
                      0,${100 - (getClimateDataForYear(timelineYears[0]).co2 - 300) / 350 * 100}
                      ${timelineYears.map((year, i) => 
                        `${i * (100 / (timelineYears.length - 1))},${100 - (getClimateDataForYear(year).co2 - 300) / 350 * 100}`
                      ).join(' ')}
                    `}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute left-10 right-0 bottom-0 w-full flex justify-between">
                {timelineYears.map((year, i) => (
                  <div key={i} className="text-xs text-gray-500 transform -translate-x-1/2" style={{ 
                    left: `${i * (100 / (timelineYears.length - 1))}%`
                  }}>
                    {year}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Climate Impacts */}
          <div className="grid grid-cols-3 gap-3">
            {timelineYears.slice(0, 3).map((year, idx) => {
              const data = getClimateDataForYear(year);
              return (
                <div key={idx} className="bg-white bg-opacity-70 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-amber-700">{year}</h5>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CO₂:</span>
                      <span className="font-medium">{data.co2} ppm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temp:</span>
                      <span className="font-medium">+{data.temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sea Level:</span>
                      <span className="font-medium">{data.seaLevel} cm</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Call to Action */}
          <div className="bg-amber-100 rounded-lg p-3">
            <h4 className="text-sm font-bold text-amber-800 mb-1">Climate Action</h4>
            <p className="text-xs text-amber-700">
              Taking action today can help mitigate climate change impacts. Every choice matters for future generations.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-right text-xs text-gray-500">
          Generated with TimeLoom • timeloom.com
        </div>
      </div>
    );
  }
);

ClimateShareImage.displayName = 'ClimateShareImage';

export default ClimateShareImage;