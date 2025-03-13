// ShareablePage.tsx - A full screen page for sharing TimeLoom images
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { MilestonesData } from './constants/types';
import { generateImageFromRef } from './utils/imageUtils';
import MilestoneShareImage from './MilestoneShareImage';
import ClimateShareImage from './ClimateShareImage';
import ShareControls from './ShareControls';

interface ShareablePageProps {
  milestones: MilestonesData;
  dateOfBirth: string;
  onClose: () => void;
}

const ShareablePage: React.FC<ShareablePageProps> = ({
  milestones,
  dateOfBirth,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'climate'>('milestones');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);
  const milestonesImageRef = useRef<HTMLDivElement>(null);
  const climateImageRef = useRef<HTMLDivElement>(null);
  
  // Regenerate image on tab change
  useEffect(() => {
    setShareableUrl(null);
    generateCurrentImage();
  }, [activeTab]);

  // Generate current image based on active tab
  const generateCurrentImage = async () => {
    const ref = activeTab === 'milestones' ? milestonesImageRef : climateImageRef;
    if (ref.current) {
      const imageUrl = await generateImageFromRef(ref, setIsGenerating);
      setShareableUrl(imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      <header className="sticky top-0 bg-white shadow-sm p-4 z-40 flex justify-between items-center">
        <button
          onClick={onClose}
          className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Timeline
        </button>
        <h1 className="text-lg font-bold text-gray-900">Share Your TimeLoom Journey</h1>
        <div className="w-24"></div> {/* Empty div for flex spacing */}
      </header>
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('milestones')}
              className={`w-1/2 py-4 px-4 text-center font-medium text-lg transition-colors ${
                activeTab === 'milestones'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              } focus:outline-none`}
            >
              Milestones Image
            </button>
            <button
              onClick={() => setActiveTab('climate')}
              className={`w-1/2 py-4 px-4 text-center font-medium text-lg transition-colors ${
                activeTab === 'climate'
                  ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              } focus:outline-none`}
            >
              Climate Impact Image
            </button>
          </nav>
        </div>
        
        {/* Image Preview */}
        <div className="flex justify-center mb-8">
          {activeTab === 'milestones' ? (
            /* Milestone Image */
            <div className="transition-opacity duration-300" style={{ opacity: isGenerating ? 0.5 : 1 }}>
              <MilestoneShareImage 
                ref={milestonesImageRef} 
                milestones={milestones} 
              />
            </div>
          ) : (
            /* Climate Image */
            <div className="transition-opacity duration-300" style={{ opacity: isGenerating ? 0.5 : 1 }}>
              <ClimateShareImage 
                ref={climateImageRef} 
                dateOfBirth={dateOfBirth} 
              />
            </div>
          )}
        </div>
        
        {/* Share Controls */}
        <ShareControls
          imageUrl={shareableUrl}
          isGenerating={isGenerating}
          activeTab={activeTab}
          currentDays={milestones.currentDays}
          onTriggerGenerate={generateCurrentImage}
        />
      </main>
    </div>
  );
};

export default ShareablePage;