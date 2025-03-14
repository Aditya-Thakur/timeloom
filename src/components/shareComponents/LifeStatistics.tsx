// shareComponents/LifeStatistics.tsx
import React from 'react';

interface LifeStatisticsProps {
  statistics: {
    heartbeats: number;
    breaths: number;
    steps: number;
    words: number;
    sleepDays: number;
    sunrises: number;
    moonCycles: number;
  };
}

export const LifeStatistics: React.FC<LifeStatisticsProps> = ({ statistics }) => {
  return (
    <>
      <h3 style={{
        fontSize: '14px',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#bb86fc',
        textAlign: 'center'
      }}>
        Life in Numbers
      </h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <StatItem 
          icon="❤️" 
          value={statistics.heartbeats} 
          label="Heartbeats" 
          formatter={(val) => `${(val / 1000000).toFixed(1)} million`}
        />
        
        <StatItem 
          icon="🫁" 
          value={statistics.breaths} 
          label="Breaths" 
          formatter={(val) => `${(val / 1000000).toFixed(1)} million`}
        />
        
        <StatItem 
          icon="🚶" 
          value={statistics.steps} 
          label="Steps" 
          formatter={(val) => `${(val / 1000000).toFixed(1)} million`}
        />
        
        <StatItem 
          icon="🌙" 
          value={statistics.moonCycles} 
          label="Moon Cycles" 
          formatter={(val) => val.toLocaleString()}
        />
        
        <StatItem 
          icon="🌅" 
          value={statistics.sunrises} 
          label="Sunrises" 
          formatter={(val) => val.toLocaleString()}
        />
      </div>
    </>
  );
};

// Utility component for displaying a statistic with icon
const StatItem: React.FC<{
  icon: string;
  value: number;
  label: string;
  formatter: (value: number) => string;
}> = ({ icon, value, label, formatter }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px'
  }}>
    <span style={{ 
      fontSize: '16px', 
      marginRight: '8px',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </span>
    <div>
      <span style={{ 
        fontWeight: 'bold', 
        color: '#e0e0fa',
        display: 'block',
        fontSize: '14px'
      }}>
        {formatter(value)}
      </span>
      <span style={{ 
        color: '#a0a0d0',
        fontSize: '11px'
      }}>
        {label}
      </span>
    </div>
  </div>
);