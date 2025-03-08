// MilestonesDisplay.tsx
import React from 'react';
import { Share2 } from 'lucide-react';
import { MilestonesData } from './types';
import LifeJourneyTimeline from './LifeJourneyTimeline';
import RhythmsOfUniverseTimeline from './RhythmsOfUniverseTimeline';
import { rhythmMilestones } from './constants';

interface MilestonesDisplayProps {
  milestones: MilestonesData;
}

const MilestonesDisplay: React.FC<MilestonesDisplayProps> = ({ milestones }) => {
  // Generate shareable image (simulated)
  const generateShareableImage = (): void => {
    alert("Image generated! In a real implementation, this would create a downloadable image of your milestones.");
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Life in Numbers</h2>
          <div className="flex space-x-2">
            <button 
              onClick={generateShareableImage} 
              className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          You have lived <span className="font-bold text-indigo-600">{milestones.currentDays.toLocaleString()}</span> earth days so far.
        </p>
        
        {/* Life Journey Timeline (Horizontal with SVGs) */}
        <LifeJourneyTimeline milestones={milestones.momentsOfSignificance} />
        
        {/* Rhythms of the Universe Section */}
        <RhythmsOfUniverseTimeline milestones={rhythmMilestones} />
        
        {/* Fun Facts Section */}
        <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold mb-2">Fun Facts</h3>
          <p className="text-gray-700">
            On your 10,000th day, the top song was likely playing on the radio, 
            and a gallon of gas cost around $3.50. The world was a different place!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MilestonesDisplay;
