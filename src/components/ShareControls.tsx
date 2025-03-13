// ShareControls.tsx - Enhanced component with better error handling
import React, { useState } from 'react';
import { Download, Instagram, Facebook, Twitter, RefreshCw } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);

  // Handle download with error tracking
  const handleDownload = () => {
    setError(null);
    
    if (!imageUrl) {
      // Trigger a new generation if we don't have an image
      onTriggerGenerate();
      return;
    }
    
    try {
      downloadImage(
        imageUrl, 
        `timeloom-${activeTab}-${new Date().getTime()}.png`
      );
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download image. Please try again.');
    }
  };

  // Handle share with error tracking
  const handleShare = (platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp') => {
    setError(null);
    
    if (!imageUrl) {
      // Trigger a new generation if we don't have an image
      onTriggerGenerate();
      return;
    }
    
    try {
      const shareText = activeTab === 'milestones' 
        ? `I've lived ${currentDays.toLocaleString()} days! Check out my life milestones with TimeLoom.`
        : `Here's how climate has changed throughout my lifetime. Generated with TimeLoom.`;
      
      shareToSocialMedia(platform, imageUrl, shareText);
    } catch (err) {
      console.error('Share error:', err);
      setError(`Failed to share to ${platform}. Please try again.`);
    }
  };

  // Force regeneration of image
  const handleRegenerate = () => {
    setError(null);
    onTriggerGenerate();
  };

  return (
    <div className="rounded-lg shadow-sm p-6 bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 text-gray-900">Share Your Image</h3>
        <p className="text-sm text-gray-600">
          Download your personalized image or share it directly on social media.
        </p>
        
        {/* Regenerate button */}
        <button 
          onClick={handleRegenerate}
          className="mt-2 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <RefreshCw size={14} className="mr-1" />
          Regenerate Image
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isGenerating ? (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={handleDownload}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Download size={24} />
            <span className="text-sm font-medium">Download</span>
          </button>
          
          <button
            onClick={() => handleShare('instagram')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg text-white transition-opacity"
            style={{ 
              background: 'linear-gradient(to bottom right, #8b5cf6, #ec4899)',
            }}
          >
            <Instagram size={24} />
            <span className="text-sm font-medium">Instagram</span>
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Facebook size={24} />
            <span className="text-sm font-medium">Facebook</span>
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors"
          >
            <Twitter size={24} />
            <span className="text-sm font-medium">Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
          </button>
        </div>
      )}
      
      {/* Additional helper text */}
      <p className="mt-4 text-xs text-gray-500">
        Note: If the download doesn't work, try clicking "Regenerate Image" first.
      </p>
    </div>
  );
};

export default ShareControls;