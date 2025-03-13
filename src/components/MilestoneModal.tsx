// MilestoneModal.tsx
import React from 'react';
import { X, Bell } from 'lucide-react';
import { Milestone } from './constants/types';
import LifeStageSVG from './LifeStageSVG';
import lifeStageGoals from './constants/lifeStageGoals';
import ClimateImpactOverlay from './climate/ClimateImpactOverlay';

interface MilestoneModalProps {
  milestone: Milestone;
  milestoneIndex: number;
  closeModal: () => void;
  openReminderModal: () => void;
  showClimateImpact?: boolean;
}

// Extract year from the date format (MM/DD/YYYY)
const getYearFromDateString = (dateString: string): number => {
  if (dateString != "") {
    return new Date(dateString).getFullYear();
  }
  return new Date().getFullYear(); // Default to current year if parsing fails
};

const MilestoneModal: React.FC<MilestoneModalProps> = ({
  milestone,
  milestoneIndex,
  closeModal,
  openReminderModal,
  showClimateImpact = true
}) => {
  const goals = lifeStageGoals[milestoneIndex] || [];
  const year = getYearFromDateString(milestone.date);
  const isFutureMilestone = !milestone.isPast;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {milestone.description}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>

          {/* Life stage icon */}
          <div className="flex justify-center my-4">
            <div className={`text-teal-600 ${milestone.isPast ? '' : 'opacity-70'}`}>
              <LifeStageSVG index={milestoneIndex} isPast={milestone.isPast} isModal={true} />
            </div>
          </div>

          {/* Milestone details */}
          <div className="mb-6 text-center">
            <p className="text-2xl font-bold text-teal-600 mb-1">
              {milestone.days.toLocaleString()} days
            </p>
            <p className="text-md text-gray-600 mb-2">
              {milestone.date}
            </p>
            {!milestone.isPast && milestone.daysUntil && (
              <p className="text-sm text-gray-500">
                {milestone.daysUntil.toLocaleString()} days from now
              </p>
            )}

            {/* Remind Me button for future milestones */}
            {isFutureMilestone && (
              <button 
                onClick={openReminderModal}
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <Bell size={16} className="mr-2" />
                Remind Me
              </button>
            )}

            {/* Climate impact information in modal */}
            {showClimateImpact && (
              <div className="mt-4 bg-amber-50 p-4 rounded-lg text-left">
                <h4 className="font-medium text-amber-700 mb-2">Climate Impact</h4>
                <ClimateImpactOverlay year={year} isPast={milestone.isPast} />
              </div>
            )}
          </div>

          {/* Life goals section */}
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-medium text-teal-700 mb-3">Life Milestones & Goals</h4>
            <ul className="space-y-2">
              {goals.map((goal, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneModal;