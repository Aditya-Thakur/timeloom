// MilestonesDisplay.tsx (Updated with ShareablePage)
import React, { useState } from 'react';
import { Share2, Calendar, Thermometer } from 'lucide-react';
import { MilestonesData } from './constants/types';
import LifeJourneyTimeline from './LifeJourneyTimeline'; 
import RhythmsOfUniverseTimeline from './RhythmsOfUniverseTimeline';
import { rhythmMilestones } from './constants/constants';
import FunFactsComponent from './FunFactsComponent';
import ClimateFeatures from './climate/ClimateFeatures';
import ShareablePage from './ShareablePage';

interface MilestonesDisplayProps {
  milestones: MilestonesData;
  onChangeDOB: () => void;
  dateOfBirth: string; // Format: "YYYY-MM-DD"
}

const MilestonesDisplay: React.FC<MilestonesDisplayProps> = ({ milestones, onChangeDOB, dateOfBirth }) => {
  // State for climate features toggle
  const [showClimateFeatures, setShowClimateFeatures] = useState(true);
  const [showSharePage, setShowSharePage] = useState(false);

  // Generate shareable image - now navigates to share page
  const generateShareableImage = (): void => {
    setShowSharePage(true);
  };

  // Define milestone days to show fun facts for
  const milestoneDays = [1000, 10000, 25000, 36500]; // 1K, 10K, 25K days and ~100 years

  // If share page is active, show it instead of the normal content
  if (showSharePage) {
    return (
      <ShareablePage
        milestones={milestones}
        dateOfBirth={dateOfBirth}
        onClose={() => setShowSharePage(false)}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Your Life in Numbers</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={generateShareableImage}
              className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={onChangeDOB}
              className="flex items-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 border border-gray-300"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Change Date
            </button>
            <button
              onClick={() => setShowClimateFeatures(!showClimateFeatures)}
              className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${showClimateFeatures
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
            >
              <Thermometer className="h-4 w-4 mr-2" />
              Climate Impact
            </button>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          You have lived <span className="font-bold text-indigo-600">{milestones.currentDays.toLocaleString()}</span> earth days so far.
        </p>

        {/* Life Journey Timeline (Horizontal with SVGs) with climate impact toggle */}
        <LifeJourneyTimeline
          milestones={milestones.momentsOfSignificance}
          showClimateImpact={showClimateFeatures}
        />

        {/* Rhythms of the Universe Section - Pass date of birth */}
        <RhythmsOfUniverseTimeline
          milestones={rhythmMilestones}
          dateOfBirth={dateOfBirth}
        />

        {/* Fun Facts Section - using our new component */}
        <div className="mt-10">
          <FunFactsComponent
            dateOfBirth={dateOfBirth}
            milestoneDays={milestoneDays}
          />
        </div>
      </div>

      {/* Climate Features Section - Only show when enabled */}
      {showClimateFeatures && (
        <ClimateFeatures
          dateOfBirth={dateOfBirth}
          milestoneDays={milestoneDays}
          currentDays={milestones.currentDays}
        />
      )}
    </div>
  );
};

export default MilestonesDisplay;