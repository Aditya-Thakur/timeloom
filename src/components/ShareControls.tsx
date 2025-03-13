// ShareControls.tsx - Component for image sharing controls
import React from 'react';
import { Download, Instagram, Facebook, Twitter } from 'lucide-react';
import { downloadImage, shareToSocialMedia } from './utils/imageUtils';

interface ShareControlsProps {
  imageUrl: string | null;
  isGenerating: boolean;
  activeTab: 'milestones' | 'climate';
  currentDays: number;
  onTriggerGenerate: () => void;
}

const ShareControls: React.FC<ShareControlsProps> = ({
  imageUrl,
  isGenerating,
  activeTab,
  currentDays,
  onTriggerGenerate
}) => {
  // Handle download
  const handleDownload = () => {
    if (!imageUrl) {
      onTriggerGenerate();
      return;
    }
    
    downloadImage(
      imageUrl, 
      `timeloom-${activeTab}-${new Date().getTime()}.png`
    );
  };

  // Handle share
  const handleShare = (platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp') => {
    if (!imageUrl) {
      onTriggerGenerate();
      return;
    }
    
    const shareText = activeTab === 'milestones' 
      ? `I've lived ${currentDays.toLocaleString()} days! Check out my life milestones with TimeLoom.`
      : `Here's how climate has changed throughout my lifetime. Generated with TimeLoom.`;
    
    shareToSocialMedia(platform, imageUrl, shareText);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Share Your Image</h3>
        <p className="text-gray-600 text-sm">
          Download your personalized image or share it directly on social media.
        </p>
      </div>
      
      {isGenerating ? (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={handleDownload}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Download size={24} />
            <span className="text-sm font-medium">Download</span>
          </button>
          
          <button
            onClick={() => handleShare('instagram')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors"
          >
            <Instagram size={24} />
            <span className="text-sm font-medium">Instagram</span>
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Facebook size={24} />
            <span className="text-sm font-medium">Facebook</span>
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            <Twitter size={24} />
            <span className="text-sm font-medium">Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareControls;