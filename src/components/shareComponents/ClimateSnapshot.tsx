// shareComponents/ClimateSnapshot.tsx
import React from 'react';

interface ClimateSnapshotProps {
  birthClimateData: {
    co2: number;
    temperature: number;
    seaLevel: number;
  };
  currentClimateData: {
    co2: number;
    temperature: number;
    seaLevel: number;
  };
  birthYear: number;
  currentYear: number;
}

export const ClimateSnapshot: React.FC<ClimateSnapshotProps> = ({
  birthClimateData,
  currentClimateData,
  birthYear,
  currentYear
}) => {
  // Calculate percentage changes
  const co2Change = ((currentClimateData.co2 - birthClimateData.co2) / birthClimateData.co2) * 100;
  const tempChange = currentClimateData.temperature - birthClimateData.temperature;
  
  return (
    <>
      <h3 style={{
        fontSize: '14px',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#03dac6',
        textAlign: 'center'
      }}>
        Climate Evolution
      </h3>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        {/* Birth Year Climate Data */}
        <div style={{
          textAlign: 'center',
          flex: '1'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#a0a0d0',
            marginBottom: '2px'
          }}>
            Birth Year ({birthYear})
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{
              backgroundColor: 'rgba(3, 218, 198, 0.1)',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#e0e0fa'
            }}>
              CO₂: {birthClimateData.co2} ppm
            </div>
            <div style={{
              backgroundColor: 'rgba(3, 218, 198, 0.1)',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#e0e0fa'
            }}>
              +{birthClimateData.temperature.toFixed(1)}°C
            </div>
          </div>
        </div>
        
        {/* Arrow and Change Indicator */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 10px'
        }}>
          <div style={{
            fontSize: '24px',
            color: co2Change > 5 ? '#cf6679' : '#03dac6',
            margin: '0 6px'
          }}>
            →
          </div>
          <div style={{
            fontSize: '11px',
            color: co2Change > 5 ? '#cf6679' : '#03dac6',
            fontWeight: 'bold'
          }}>
            {co2Change > 0 ? '+' : ''}{co2Change.toFixed(1)}%
          </div>
        </div>
        
        {/* Current Year Climate Data */}
        <div style={{
          textAlign: 'center',
          flex: '1'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#a0a0d0',
            marginBottom: '2px'
          }}>
            Current ({currentYear})
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{
              backgroundColor: 'rgba(207, 102, 121, 0.2)',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#e0e0fa'
            }}>
              CO₂: {currentClimateData.co2} ppm
            </div>
            <div style={{
              backgroundColor: 'rgba(207, 102, 121, 0.2)',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#e0e0fa'
            }}>
              +{currentClimateData.temperature.toFixed(1)}°C
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        fontSize: '11px',
        color: '#a0a0d0',
        textAlign: 'center',
        marginTop: '4px'
      }}>
        Temperature values are relative to pre-industrial levels.
        {tempChange > 0.5 && (
          <span style={{ color: '#cf6679', display: 'block', marginTop: '4px' }}>
            Temperature has risen {tempChange.toFixed(1)}°C during your lifetime
          </span>
        )}
      </div>
    </>
  );
};