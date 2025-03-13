// ShareablePage.tsx - Improved implementation for better image generation
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
  const [generationError, setGenerationError] = useState<string | null>(null);
  const milestonesImageRef = useRef<HTMLDivElement>(null);
  const climateImageRef = useRef<HTMLDivElement>(null);

  // Generate image on component mount
  useEffect(() => {
    generateCurrentImage();
  }, []);

  // Generate new image on tab change
  useEffect(() => {
    setShareableUrl(null);
    setGenerationError(null);
    generateCurrentImage();
  }, [activeTab]);

  // Function to generate the current image based on active tab
  const generateCurrentImage = async () => {
    setGenerationError(null);

    try {
      // Get the current ref based on active tab
      const ref = activeTab === 'milestones' ? milestonesImageRef : climateImageRef;

      // First, ensure the ref is properly mounted
      if (!ref.current) {
        console.error(`Reference for ${activeTab} image is not available`);
        setGenerationError(`Could not generate ${activeTab} image. Please try again.`);
        return;
      }

      // Start generation
      setIsGenerating(true);

      // Wait a moment for render to complete
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate the image URL
      const imageUrl = await generateImageFromRef(ref, setIsGenerating);

      // Check if URL was generated
      if (!imageUrl) {
        throw new Error(`Failed to generate ${activeTab} image`);
      }

      setShareableUrl(imageUrl);
    } catch (error) {
      console.error('Error generating shareable image:', error);
      setGenerationError(`Failed to generate ${activeTab} image. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      <header className="sticky top-0 bg-white shadow-sm p-4 z-40 flex justify-between items-center">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
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
              className={`w-1/2 py-4 px-4 text-center font-medium text-lg transition-colors focus:outline-none
                ${activeTab === 'milestones' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Milestones Image
            </button>
            <button
              onClick={() => setActiveTab('climate')}
              className={`w-1/2 py-4 px-4 text-center font-medium text-lg transition-colors focus:outline-none
                ${activeTab === 'climate' ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Climate Impact Image
            </button>
          </nav>
        </div>

        {/* Error message */}
        {generationError && (
          <div className="bg-red-50 text-red-700 rounded-lg p-4 mb-6">
            <p>{generationError}</p>
            <button
              onClick={generateCurrentImage}
              className="mt-2 text-red-700 underline text-sm hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Image Preview */}
        <div className="flex justify-center mb-8">
          <div className={`transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
            {activeTab === 'milestones' ? (
              /* Milestone Image */
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <MilestoneShareImage
                  ref={milestonesImageRef}
                  milestones={milestones}
                />
              </div>
            ) : (
              /* Climate Image */
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ClimateShareImage
                  ref={climateImageRef}
                  dateOfBirth={dateOfBirth}
                />
              </div>
            )}
          </div>
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