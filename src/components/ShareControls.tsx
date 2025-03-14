// Updated ShareControls.tsx with better mobile handling
import React, { useState } from 'react';
import { Download, Instagram, Facebook, Twitter, RefreshCw, Share2, Info } from 'lucide-react';
import { downloadImage, shareToSocialMedia } from './utils/imageUtils';

interface ShareControlsProps {
  imageUrl: string | null;
  isGenerating: boolean;
  activeTab: 'combined' | 'milestones' | 'climate';
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
  const [showTips, setShowTips] = useState<boolean>(false);

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
      // Get the appropriate share text based on active tab
      let shareText = '';
      
      switch(activeTab) {
        case 'combined':
          shareText = `I've lived ${currentDays.toLocaleString()} days! Check out my life journey with TimeLoom - milestones, achievements, and more.`;
          break;
        case 'milestones':
          shareText = `I've lived ${currentDays.toLocaleString()} days! Check out my life milestones with TimeLoom.`;
          break;
        case 'climate':
          shareText = `Here's how climate has changed throughout my lifetime. Generated with TimeLoom.`;
          break;
      }
      
      shareToSocialMedia(platform, imageUrl, shareText);
    } catch (err) {
      console.error('Share error:', err);
      setError(`Failed to share to ${platform}. Please try downloading and sharing manually.`);
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
        <div className="mt-2 flex items-center justify-between">
          <button 
            onClick={handleRegenerate}
            className={`flex items-center text-sm font-medium ${activeTab === 'combined' ? 'text-purple-600 hover:text-purple-700' : activeTab === 'milestones' ? 'text-indigo-600 hover:text-indigo-700' : 'text-amber-600 hover:text-amber-700'}`}
          >
            <RefreshCw size={14} className="mr-1" />
            Regenerate Image
          </button>
          
          <button 
            onClick={() => setShowTips(!showTips)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            <Info size={14} className="mr-1" />
            Sharing Tips
          </button>
        </div>
      </div>
      
      {/* Sharing tips accordion */}
      {showTips && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg text-sm border border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">Mobile Sharing Tips</h4>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>For Instagram Stories: Download the image first, then use Instagram's "Add to Story" feature.</li>
            <li>For WhatsApp Status: Download the image first, then add it from your gallery.</li>
            <li>The image is optimized for 9:16 vertical format (mobile screens).</li>
            <li>Add hashtags like #TimeLoom and #LifeJourney when sharing on social media.</li>
          </ul>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isGenerating ? (
        <div className="flex justify-center p-6">
          <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${activeTab === 'combined' ? 'border-purple-600' : activeTab === 'milestones' ? 'border-indigo-600' : 'border-amber-600'}`}></div>
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
      
      {/* Direct Share Option */}
      {imageUrl && !isGenerating && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My TimeLoom Journey',
                  text: `I've lived ${currentDays.toLocaleString()} days! Check out my life journey with TimeLoom.`,
                  url: window.location.href,
                }).catch(err => {
                  console.error('Error sharing:', err);
                  setError('Native sharing failed. Please use the download option.');
                });
              } else {
                setError('Native sharing not supported on this device. Please use the other options.');
              }
            }}
            className="flex items-center gap-2 py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
          >
            <Share2 size={16} />
            <span className="font-medium">Use Native Share (Mobile)</span>
          </button>
        </div>
      )}
      
      {/* Mobile-specific guidance */}
      <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2 text-xs">i</span>
          Mobile Sharing Instructions
        </h4>
        <div className="flex flex-col gap-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">1.</span>
            <p>Tap <strong>Download</strong> to save the image to your device</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">2.</span>
            <p>Open your preferred social media app</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">3.</span>
            <p>For Instagram: Tap <strong>+</strong> and select the downloaded image for your Story or Post</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">4.</span>
            <p>For WhatsApp: Go to <strong>Status</strong> tab and select the saved image</p>
          </div>
        </div>
      </div>
      
      {/* Additional helper text */}
      <p className="mt-4 text-xs text-gray-500">
        Note: Image is optimized for mobile viewing. For best results, download and share directly from your device's gallery.
      </p>
    </div>
  );
};

export default ShareControls;