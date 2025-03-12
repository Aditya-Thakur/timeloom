// ClimateFeatures.tsx
import React from 'react';
import ClimateTimeline from './ClimateTimeline';
import ClimateActionComponent from './ClimateActionComponent';
import ClimateFunFacts from './ClimateFunFacts';

interface ClimateFeaturesProps {
  dateOfBirth: string;
  milestoneDays: number[];
  currentDays: number;
}

const ClimateFeatures: React.FC<ClimateFeaturesProps> = ({ 
  dateOfBirth, 
  milestoneDays,
  currentDays
}) => {
  // Calculate days to next milestone
  const getNextMilestone = () => {
    const sortedMilestones = [...milestoneDays].sort((a, b) => a - b);
    for (const milestone of sortedMilestones) {
      if (milestone > currentDays) {
        return milestone;
      }
    }
    return sortedMilestones[sortedMilestones.length - 1] + 1000; // If all milestones passed, add 1000 days
  };
  
  const nextMilestone = getNextMilestone();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Climate Impact & Action</h2>
        <p className="text-gray-700">
          Understand how climate change has and will shape your lifetime, and what actions you can take to make a difference.
        </p>
      </div>
      
      {/* Climate Timeline Component */}
      <ClimateTimeline dateOfBirth={dateOfBirth} />
      
      {/* Climate Action Component */}
      <ClimateActionComponent milestoneDays={nextMilestone} />
      
      {/* Climate Fun Facts Component */}
      <ClimateFunFacts 
        milestoneDays={milestoneDays} 
        dateOfBirth={dateOfBirth} 
      />
    </div>
  );
};

export default ClimateFeatures;