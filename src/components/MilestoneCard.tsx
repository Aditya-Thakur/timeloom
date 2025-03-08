// MilestoneCard.tsx
import React from 'react';
import { Milestone } from './types';

interface MilestoneCardProps {
  milestone: Milestone;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ 
  milestone, 
  accentColor, 
  bgColor, 
  borderColor,
  textColor
}) => (
  <div 
    className={`p-4 rounded-lg border ${milestone.isPast ? `${bgColor} ${borderColor}` : 'bg-gray-50 border-gray-200'}`}
  >
    <p className={`text-3xl font-bold ${accentColor}`}>{milestone.days.toLocaleString()}</p>
    <p className="text-gray-600">days</p>
    <p className={`text-sm mt-2 ${milestone.isPast ? textColor : 'text-gray-600'}`}>
      {milestone.date}
    </p>
    {!milestone.isPast && milestone.daysUntil && (
      <p className="text-xs text-gray-500 mt-1">
        {milestone.daysUntil.toLocaleString()} days from now
      </p>
    )}
  </div>
);

export default MilestoneCard;


