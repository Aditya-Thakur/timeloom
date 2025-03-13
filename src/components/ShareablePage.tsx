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
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto" style={{ backgroundColor: '#f9fafb' }}>
      <header className="sticky top-0 bg-white shadow-sm p-4 z-40 flex justify-between items-center" style={{ backgroundColor: 'white' }}>
        <button
          onClick={onClose}
          className="flex items-center hover:text-gray-900 focus:outline-none"
          style={{ color: '#374151' }}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Timeline
        </button>
        <h1 className="text-lg font-bold" style={{ color: '#111827' }}>Share Your TimeLoom Journey</h1>
        <div className="w-24"></div> {/* Empty div for flex spacing */}
      </header>
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6" style={{ backgroundColor: 'white' }}>
          <nav className="flex">
            <button
              onClick={() => setActiveTab('milestones')}
              className={`w-1/2 py-4 px-4 text-center font-medium text-lg transition-colors focus:outline-none`}
              style={{ 
                backgroundColor: activeTab === 'milestones' ? '#eef2ff' : undefined,
                color: activeTab === 'milestones' ? '#4f46e5' : '#6b7280',
                borderBottom: activeTab === 'milestones' ? '2px solid #4f46e5' : undefined
              }}
            >
              Milestones Image
            </button>
            <button
              onClick={() => setActiveTab('climate')}
              className={`w-1/2 py-4 px-4 text-center font-medium text-lg transition-colors focus:outline-none`}
              style={{ 
                backgroundColor: activeTab === 'climate' ? '#fffbeb' : undefined,
                color: activeTab === 'climate' ? '#d97706' : '#6b7280',
                borderBottom: activeTab === 'climate' ? '2px solid #d97706' : undefined
              }}
            >
              Climate Impact Image
            </button>
          </nav>
        </div>
        
        {/* Image Preview */}
        <div className="flex justify-center mb-8">
          {activeTab === 'milestones' ? (
            /* Milestone Image */
            <div style={{ opacity: isGenerating ? 0.5 : 1, transition: 'opacity 300ms' }}>
              <MilestoneShareImage 
                ref={milestonesImageRef} 
                milestones={milestones} 
              />
            </div>
          ) : (
            /* Climate Image */
            <div style={{ opacity: isGenerating ? 0.5 : 1, transition: 'opacity 300ms' }}>
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