// MilestonesDisplay.tsx
import React from 'react';
import { Share2 } from 'lucide-react';
import { MilestonesData } from './types';
import MilestoneCard from './MilestoneCard';
import SignificantMomentCard from './SignificantMomentCard';

interface MilestonesDisplayProps {
  milestones: MilestonesData;
}

const MilestonesDisplay: React.FC<MilestonesDisplayProps> = ({ milestones }) => {
  // Generate shareable image (simulated)
  const generateShareableImage = (): void => {
    alert("Image generated! In a real implementation, this would create a downloadable image of your milestones.");
  };

  return (
    <div className="max-w-4xl w-full mx-auto my-8 p-6">
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
          You have lived <span className="font-bold text-indigo-600">{milestones.currentDays.toLocaleString()}</span> days so far.
        </p>
        
        {/* Echoes of Time Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2">1</span>
            Echoes of Time
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.echoesOfTime.slice(0, 9).map(milestone => (
              <MilestoneCard 
                key={milestone.id}
                milestone={milestone}
                accentColor="text-indigo-600"
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
                textColor="text-indigo-700"
              />
            ))}
          </div>
        </div>
        
        {/* Rhythms of the Universe Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">2</span>
            Rhythms of the Universe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {milestones.rhythmsOfUniverse.map(milestone => (
              <MilestoneCard 
                key={milestone.id}
                milestone={milestone}
                accentColor="text-purple-600"
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
                textColor="text-purple-700"
              />
            ))}
          </div>
        </div>
        
        {/* Moments of Significance Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-2">3</span>
            Moments of Significance
          </h3>
          <div className="space-y-4">
            {milestones.momentsOfSignificance.map(milestone => (
              <SignificantMomentCard 
                key={milestone.id}
                milestone={milestone}
                accentColor="text-teal-600"
                bgColor="bg-teal-50"
                borderColor="border-teal-200"
                textColor="text-teal-700"
              />
            ))}
          </div>
        </div>
        
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
