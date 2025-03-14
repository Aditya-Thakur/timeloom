// shareComponents/LifeStageBadge.tsx
import React from 'react';
import { Milestone } from '../constants/types';

interface LifeStageBadgeProps {
  milestone: Milestone;
  index: number;
}

export const LifeStageBadge: React.FC<LifeStageBadgeProps> = ({ milestone, index }) => {
  // Badge colors corresponding to different milestone stages
  const badgeColors = [
    { bg: '#bb86fc', border: '#9d4edd', text: '#fff' }, // Purple
    { bg: '#03dac6', border: '#018786', text: '#000' }, // Teal
    { bg: '#ff7597', border: '#cf6679', text: '#000' }, // Pink
  ];
  
  const color = badgeColors[index % badgeColors.length];
  
  // Get badge name based on milestone days
  const getBadgeName = () => {
    if (milestone.days === 1000) return 'Early Journeyer';
    if (milestone.days === 2000) return 'Young Explorer';
    if (milestone.days === 5000) return 'Path Finder';
    if (milestone.days === 10000) return 'Life Navigator';
    if (milestone.days === 15000) return 'Season Voyager';
    if (milestone.days === 20000) return 'Wisdom Keeper';
    if (milestone.days === 25000) return 'Time Weaver';
    if (milestone.days === 30000) return 'Legacy Creator';
    return milestone.description || 'Milestone Achieved';
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '74px',
        height: '74px',
        borderRadius: '50%',
        backgroundColor: color.bg,
        border: `3px solid ${color.border}`,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color.text,
        fontSize: '24px',
        fontWeight: 'bold',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Badge background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 70% 70%, transparent 65%, rgba(255, 255, 255, 0.15) 65%)`
        }}></div>
        
        {milestone.days.toString().length > 4 
          ? milestone.days.toString().substring(0, 2) + 'K'
          : Math.floor(milestone.days / 1000) + 'K'}
      </div>
      <div style={{
        marginTop: '8px',
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#e0e0fa',
        textAlign: 'center',
        maxWidth: '90px'
      }}>
        {getBadgeName()}
      </div>
    </div>
  );
};

// shareComponents/LifeProgressBar.tsx