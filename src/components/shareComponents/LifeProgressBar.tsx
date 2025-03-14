// shareComponents/LifeProgressBar.tsx
import React from 'react';
import { Milestone } from '../constants/types';

interface LifeProgressBarProps {
  nextMilestone: Milestone;
  currentDays: number;
}

export const LifeProgressBar: React.FC<LifeProgressBarProps> = ({ 
  nextMilestone, 
  currentDays 
}) => {
  // Calculate progress percentage
  const totalDaysToNextMilestone = nextMilestone.days;
  const progress = (currentDays / totalDaysToNextMilestone) * 100;
  
  // Format the milestone description nicely
  const getMilestoneTitle = () => {
    return nextMilestone.description || `${nextMilestone.days.toLocaleString()}-Day Milestone`;
  };
  
  // Calculate days remaining and percentage
  const daysRemaining = nextMilestone.daysUntil || 0;
  const percentComplete = Math.min(Math.round(progress), 99); // Cap at 99% for visibility
  
  return (
    <div>
      <h3 style={{
        fontSize: '14px',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#03dac6',
        textAlign: 'center'
      }}>
        Next Milestone Countdown
      </h3>
      
      <div style={{
        textAlign: 'center',
        marginBottom: '12px',
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#e0e0fa',
          marginBottom: '4px'
        }}>
          {getMilestoneTitle()}
        </div>
        
        <div style={{
          fontSize: '13px',
          color: '#b0b0e0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>{currentDays.toLocaleString()} days completed</span>
          <span style={{ color: '#6c6c9c' }}>•</span>
          <span>{daysRemaining.toLocaleString()} days remaining</span>
        </div>
      </div>
      
      {/* Progress Bar Container */}
      <div style={{
        height: '16px',
        backgroundColor: 'rgba(3, 218, 198, 0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        padding: '2px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Progress Fill */}
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(to right, #03dac6, #018786)',
          borderRadius: '6px',
          position: 'relative',
        }}>
          {/* Animated pulse effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '10px',
            height: '100%',
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7))',
            animation: 'pulse 1.5s infinite',
          }}></div>
          
          {/* Animation keyframes - would be defined in a real CSS file */}
          <style>{`
            @keyframes pulse {
              0% { opacity: 0.3; }
              50% { opacity: 0.7; }
              100% { opacity: 0.3; }
            }
          `}</style>
        </div>
        
        {/* Percentage Text - Positioned on the progress bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: progress > 50 ? '#fff' : '#018786',
          fontSize: '10px',
          fontWeight: 'bold',
          textShadow: progress > 50 ? '0 1px 1px rgba(0,0,0,0.3)' : 'none',
        }}>
          {percentComplete}% Complete
        </div>
        
        {/* Milestone Markers */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
        }}>
          {[25, 50, 75].map((marker) => (
            <div key={marker} style={{
              position: 'absolute',
              left: `${marker}%`,
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}></div>
          ))}
        </div>
      </div>
      
      {/* Progress Scale */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: '#a0a0d0',
        marginTop: '6px'
      }}>
        <span>0 days</span>
        <span style={{ color: '#b3b3e0' }}>{Math.round(totalDaysToNextMilestone * 0.25).toLocaleString()}</span>
        <span style={{ color: '#b3b3e0' }}>{Math.round(totalDaysToNextMilestone * 0.5).toLocaleString()}</span>
        <span style={{ color: '#b3b3e0' }}>{Math.round(totalDaysToNextMilestone * 0.75).toLocaleString()}</span>
        <span>{totalDaysToNextMilestone.toLocaleString()} days</span>
      </div>
      
      {/* Motivational Message */}
      <div style={{
        textAlign: 'center',
        fontSize: '11px',
        color: '#e0e0fa',
        marginTop: '12px',
        fontStyle: 'italic'
      }}>
        {percentComplete < 25 && "Your journey toward this milestone is just beginning!"}
        {percentComplete >= 25 && percentComplete < 50 && "You're making steady progress — keep going!"}
        {percentComplete >= 50 && percentComplete < 75 && "You're over halfway to your next milestone!"}
        {percentComplete >= 75 && percentComplete < 90 && "Almost there! The milestone is within reach."}
        {percentComplete >= 90 && "You're about to reach this significant milestone!"}
      </div>
    </div>
  );
};