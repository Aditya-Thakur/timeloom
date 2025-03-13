// ClimateShareImage.tsx - Component for generating climate share images
import { forwardRef, ForwardedRef } from 'react';
import { getClimateDataForYear } from './constants/climateData';

interface ClimateShareImageProps {
  dateOfBirth: string;
}

const ClimateShareImage = forwardRef<HTMLDivElement, ClimateShareImageProps>(
  ({ dateOfBirth }, ref: ForwardedRef<HTMLDivElement>) => {
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
        style={{ 
          width: '100%',
          maxWidth: '32rem',
          padding: '1.5rem',
          backgroundColor: '#fffbeb',
          backgroundImage: 'linear-gradient(to bottom right, #fffbeb, #ffedd5)',
          borderRadius: '0.5rem',
          border: '2px solid #fcd34d',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#1f2937'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              margin: '0 0 0.25rem 0',
              color: '#92400e'
            }}>
              My Climate Timeline
            </h3>
            <p style={{ 
              margin: '0', 
              color: '#d97706'
            }}>
              From {birthYear} to {new Date().getFullYear() + 80}
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '9999px', 
            padding: '0.5rem', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10V16M20 16V22M20 16H26M20 16H14" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13 28C13 25.7909 14.7909 24 17 24H23C25.2091 24 27 25.7909 27 28V28C27 30.2091 25.2091 32 23 32H17C14.7909 32 13 30.2091 13 28V28Z" stroke="#D97706" strokeWidth="2"/>
              <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" stroke="#D97706" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          {/* CO2 Graph */}
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            marginBottom: '1.5rem' 
          }}>
            <h4 style={{ 
              fontWeight: 'bold', 
              marginTop: '0', 
              marginBottom: '0.5rem',
              color: '#b45309' 
            }}>
              CO₂ Concentration Over Your Lifetime
            </h4>
            <div style={{ 
              height: '10rem', 
              position: 'relative', 
              marginBottom: '1rem' 
            }}>
              {/* Y-axis */}
              <div style={{ 
                position: 'absolute', 
                left: '0', 
                top: '0', 
                bottom: '0', 
                width: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingRight: '0.25rem'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>650 ppm</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>500 ppm</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>350 ppm</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>300 ppm</span>
              </div>
              
              {/* Graph area */}
              <div style={{ 
                position: 'absolute', 
                left: '2.5rem', 
                right: '0', 
                top: '0', 
                bottom: '2rem'
              }}>
                {/* Horizontal grid lines */}
                <div style={{ 
                  position: 'absolute', 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between'
                }}>
                  <div style={{ borderTop: '1px solid #e5e7eb', width: '100%' }}></div>
                  <div style={{ borderTop: '1px solid #e5e7eb', width: '100%' }}></div>
                  <div style={{ borderTop: '1px solid #e5e7eb', width: '100%' }}></div>
                  <div style={{ borderTop: '1px solid #e5e7eb', width: '100%' }}></div>
                </div>
                
                {/* Draw the line using divs for better HTML2Canvas compatibility */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {timelineYears.map((year, index) => {
                    if (index === 0) return null; // Skip first point for connecting lines
                    
                    const prevYear = timelineYears[index - 1];
                    const prevData = getClimateDataForYear(prevYear);
                    const currentData = getClimateDataForYear(year);
                    
                    const startX = ((index - 1) / (timelineYears.length - 1)) * 100;
                    const endX = (index / (timelineYears.length - 1)) * 100;
                    
                    const startY = 100 - ((prevData.co2 - 300) / 350) * 100;
                    const endY = 100 - ((currentData.co2 - 300) / 350) * 100;
                    
                    // Calculate line length and angle for transform
                    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                    
                    return (
                      <div key={index} style={{
                        position: 'absolute',
                        left: `${startX}%`,
                        top: `${startY}%`,
                        width: `${length}%`,
                        height: '3px',
                        backgroundColor: '#D97706',
                        transformOrigin: '0 0',
                        transform: `rotate(${angle}deg)`,
                        zIndex: 2
                      }}></div>
                    );
                  })}
                  
                  {/* Add dots at each data point */}
                  {timelineYears.map((year, index) => {
                    const data = getClimateDataForYear(year);
                    const x = (index / (timelineYears.length - 1)) * 100;
                    const y = 100 - ((data.co2 - 300) / 350) * 100;
                    
                    return (
                      <div key={`dot-${index}`} style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#D97706',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 3
                      }}></div>
                    );
                  })}
                </div>
              </div>
              
              {/* X-axis labels */}
              <div style={{ 
                position: 'absolute', 
                left: '2.5rem', 
                right: '0', 
                bottom: '0', 
                width: 'calc(100% - 2.5rem)', 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                {timelineYears.map((year, index) => (
                  <div key={index} style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280',
                    transform: 'translateX(-50%)',
                    position: 'absolute',
                    left: `${(index / (timelineYears.length - 1)) * 100}%`
                  }}>
                    {year}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Climate Impacts */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            {timelineYears.slice(0, 3).map((year, idx) => {
              const data = getClimateDataForYear(year);
              return (
                <div key={idx} style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem'
                }}>
                  <h5 style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#b45309',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {year}
                  </h5>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem'
                    }}>
                      <span style={{ color: '#4b5563' }}>CO₂:</span>
                      <span style={{ fontWeight: '500' }}>{data.co2} ppm</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem'
                    }}>
                      <span style={{ color: '#4b5563' }}>Temp:</span>
                      <span style={{ fontWeight: '500' }}>+{data.temperature.toFixed(1)}°C</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: '#4b5563' }}>Sea Level:</span>
                      <span style={{ fontWeight: '500' }}>{data.seaLevel} cm</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Call to Action */}
          <div style={{ 
            backgroundColor: '#fef3c7', 
            borderRadius: '0.5rem', 
            padding: '0.75rem'
          }}>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              color: '#92400e', 
              margin: '0 0 0.25rem 0'
            }}>
              Climate Action
            </h4>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#b45309',
              margin: '0'
            }}>
              Taking action today can help mitigate climate change impacts. Every choice matters for future generations.
            </p>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'right', 
          fontSize: '0.75rem', 
          color: '#6b7280' 
        }}>
          Generated with TimeLoom • timeloom.com
        </div>
      </div>
    );
  }
);

ClimateShareImage.displayName = 'ClimateShareImage';

export default ClimateShareImage;