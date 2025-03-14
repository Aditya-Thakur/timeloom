// ShareablePage.tsx - Completely revised for better mobile experience
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Smartphone, Camera, Share2 } from 'lucide-react';
import { MilestonesData } from './constants/types';
import { generateImageFromRef } from './utils/imageUtils';
import MilestoneShareImage from './MilestoneShareImage';
import ClimateShareImage from './ClimateShareImage';
import CombinedShareImage from './CombinedShareImage';
import ShareControls from './ShareControls';
import MobileShareContainer from './MobileShareContainer';

interface ShareablePageProps {
  milestones: MilestonesData;
  dateOfBirth: string;
  onClose: () => void;
}

// Define image dimensions constants
const COMBINED_IMAGE_WIDTH = 600;
const COMBINED_IMAGE_HEIGHT = 900;
const MILESTONE_IMAGE_WIDTH = 500;
const MILESTONE_IMAGE_HEIGHT = 889;
const CLIMATE_IMAGE_WIDTH = 500;
const CLIMATE_IMAGE_HEIGHT = 800;

const ShareablePage: React.FC<ShareablePageProps> = ({
  milestones,
  dateOfBirth,
  onClose
}) => {
  // Tab options now include 'combined' as first option
  const [activeTab, setActiveTab] = useState<'combined' | 'milestones' | 'climate'>('combined');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [showMobileTips, setShowMobileTips] = useState<boolean>(false);
  
  // Refs for each image type
  const combinedImageRef = useRef<HTMLDivElement>(null);
  const milestonesImageRef = useRef<HTMLDivElement>(null);
  const climateImageRef = useRef<HTMLDivElement>(null);

  // Check if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileDevice(isMobile);
      
      // Automatically show mobile tips on first load for mobile users
      if (isMobile) {
        setShowMobileTips(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate image on component mount with a delay for mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      generateCurrentImage();
    }, isMobileDevice ? 800 : 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate new image on tab change with a delay
  useEffect(() => {
    setShareableUrl(null);
    setGenerationError(null);
    
    const timer = setTimeout(() => {
      generateCurrentImage();
    }, 500); // Slight delay to allow the tab switch animation to complete
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Function to get the current reference based on active tab
  const getCurrentRef = () => {
    switch(activeTab) {
      case 'combined':
        return combinedImageRef;
      case 'milestones':
        return milestonesImageRef;
      case 'climate':
        return climateImageRef;
    }
  };

  // Function to generate the current image based on active tab
  const generateCurrentImage = async () => {
    setGenerationError(null);

    try {
      // Get the current ref
      const ref = getCurrentRef();

      // Ensure the ref is properly mounted
      if (!ref?.current) {
        console.error(`Reference for ${activeTab} image is not available`);
        setGenerationError(`Could not generate ${activeTab} image. Please try again.`);
        return;
      }

      // Start generation
      setIsGenerating(true);

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
        <h1 className="text-lg font-bold text-gray-900">Share Your Journey</h1>
        <div className="w-24"></div> {/* Empty div for flex spacing */}
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Mobile-optimized notice for mobile users */}
        {isMobileDevice && (
          <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-start border border-indigo-100">
            <Smartphone className="text-indigo-500 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-indigo-700 mb-1">Ready for Instagram & More</h3>
              <p className="text-sm text-indigo-600">
                Your image is properly sized for Instagram Stories and other social media. 
                <button 
                  onClick={() => setShowMobileTips(!showMobileTips)}
                  className="ml-1 underline font-medium"
                >
                  {showMobileTips ? 'Hide tips' : 'Show sharing tips'}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Mobile sharing tips (collapsible) */}
        {isMobileDevice && showMobileTips && (
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 shadow-sm">
            <div className="flex items-start">
              <Camera className="text-indigo-500 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Mobile Sharing Guide</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal ml-5">
                  <li>Tap <strong>Download</strong> to save the image to your device</li>
                  <li>Open your social media app of choice (Instagram, WhatsApp, etc.)</li>
                  <li>For Instagram Stories: Tap <strong>+</strong> at the top, select your downloaded image</li>
                  <li>For WhatsApp Status: Go to <strong>Status</strong> tab, tap the camera icon</li>
                </ol>
                <div className="mt-3 p-2 bg-gray-50 rounded-md text-xs text-gray-500">
                  <strong>Tip:</strong> These images are designed in portrait format, perfect for Stories and Status updates!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('combined')}
              className={`w-1/3 py-4 px-4 text-center font-medium text-sm md:text-base transition-colors focus:outline-none
                ${activeTab === 'combined' ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Complete Picture
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`w-1/3 py-4 px-4 text-center font-medium text-sm md:text-base transition-colors focus:outline-none
                ${activeTab === 'milestones' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Life Journey
            </button>
            <button
              onClick={() => setActiveTab('climate')}
              className={`w-1/3 py-4 px-4 text-center font-medium text-sm md:text-base transition-colors focus:outline-none
                ${activeTab === 'climate' ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Climate Impact
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

        {/* Image Preview Container with enhanced mobile solution */}
        <div className="flex justify-center mb-8">
          <div className={`transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
            {activeTab === 'combined' ? (
              /* Combined Image with mobile container */
              <MobileShareContainer 
                isVisible={activeTab === 'combined'} 
                width={COMBINED_IMAGE_WIDTH} 
                height={COMBINED_IMAGE_HEIGHT}
              >
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <CombinedShareImage
                    ref={combinedImageRef}
                    milestones={milestones}
                    dateOfBirth={dateOfBirth}
                  />
                </div>
              </MobileShareContainer>
            ) : activeTab === 'milestones' ? (
              /* Milestone Image with mobile container */
              <MobileShareContainer 
                isVisible={activeTab === 'milestones'} 
                width={MILESTONE_IMAGE_WIDTH} 
                height={MILESTONE_IMAGE_HEIGHT}
              >
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <MilestoneShareImage
                    ref={milestonesImageRef}
                    milestones={milestones}
                  />
                </div>
              </MobileShareContainer>
            ) : (
              /* Climate Image with mobile container */
              <MobileShareContainer 
                isVisible={activeTab === 'climate'} 
                width={CLIMATE_IMAGE_WIDTH} 
                height={CLIMATE_IMAGE_HEIGHT}
              >
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <ClimateShareImage
                    ref={climateImageRef}
                    dateOfBirth={dateOfBirth}
                  />
                </div>
              </MobileShareContainer>
            )}
          </div>
        </div>

        {/* Loading indicator if generating */}
        {isGenerating && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50 pointer-events-none">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
              <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${
                activeTab === 'combined' ? 'border-purple-600' : 
                activeTab === 'milestones' ? 'border-indigo-600' : 'border-amber-600'
              } mr-3`}></div>
              <span className="text-gray-700 font-medium">Preparing your image...</span>
            </div>
          </div>
        )}

        {/* Quick action buttons for mobile */}
        {isMobileDevice && shareableUrl && !isGenerating && (
          <div className="sticky bottom-4 right-4 z-30 flex justify-end">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My TimeLoom Journey',
                    text: `I've lived ${milestones.currentDays.toLocaleString()} days! Check out my life journey with TimeLoom.`,
                    url: window.location.href,
                  }).catch(err => {
                    console.error('Error sharing:', err);
                  });
                }
              }}
              className={`flex items-center gap-2 py-3 px-6 rounded-full shadow-lg ${
                activeTab === 'combined' ? 'bg-purple-600' : 
                activeTab === 'milestones' ? 'bg-indigo-600' : 'bg-amber-600'
              } text-white`}
            >
              <Share2 size={20} />
              <span className="font-medium">Quick Share</span>
            </button>
          </div>
        )}

        {/* Share Controls */}
        <ShareControls
          imageUrl={shareableUrl}
          isGenerating={isGenerating}
          activeTab={activeTab}
          currentDays={milestones.currentDays}
          onTriggerGenerate={generateCurrentImage}
        />

        {/* Description of Each Share Image Type */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About Your Share Options</h2>
          
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${activeTab === 'combined' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-purple-700 mb-2">Complete Picture</h3>
              <p className="text-gray-700 text-sm">
                Our most engaging shareable image featuring personal life statistics, milestone badges, inspirational quotes,
                technological advancements from your lifetime, and a climate change visualization. Perfect for social media!
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${activeTab === 'milestones' ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-indigo-700 mb-2">Life Journey</h3>
              <p className="text-gray-700 text-sm">
                A beautiful visualization of your key life milestones, showing both past achievements and future goals
                on a visually appealing timeline. Great for reflecting on your journey!
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${activeTab === 'climate' ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-amber-700 mb-2">Climate Impact</h3>
              <p className="text-gray-700 text-sm">
                A powerful data visualization showing how climate indicators have changed during your lifetime,
                with projections for future decades. A thought-provoking image to share with friends!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShareablePage;