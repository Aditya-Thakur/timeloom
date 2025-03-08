// SignificantMomentCard.tsx
import React from 'react';
import { Milestone } from './types';

interface SignificantMomentCardProps {
  milestone: Milestone;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const SignificantMomentCard: React.FC<SignificantMomentCardProps> = ({ 
  milestone, 
  accentColor, 
  bgColor, 
  borderColor,
  textColor
}) => (
  <div 
    className={`p-4 rounded-lg border flex justify-between items-center ${milestone.isPast ? `${bgColor} ${borderColor}` : 'bg-gray-50 border-gray-200'}`}
  >
    <div>
      <p className="font-bold text-lg">{milestone.description}</p>
      <p className={`text-sm ${milestone.isPast ? textColor : 'text-gray-600'}`}>
        {milestone.date}
      </p>
    </div>
    <div className="text-right">
      <p className={`text-2xl font-bold ${accentColor}`}>{milestone.days.toLocaleString()}</p>
      <p className="text-gray-600">days</p>
      {!milestone.isPast && milestone.daysUntil && (
        <p className="text-xs text-gray-500">
          {milestone.daysUntil.toLocaleString()} days from now
        </p>
      )}
    </div>
  </div>
);

export default SignificantMomentCard;