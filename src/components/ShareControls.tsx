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
    <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: 'white' }}>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2" style={{ color: '#111827' }}>Share Your Image</h3>
        <p className="text-sm" style={{ color: '#4b5563' }}>
          Download your personalized image or share it directly on social media.
        </p>
      </div>
      
      {isGenerating ? (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" 
            style={{ 
              borderTopColor: '#4f46e5', 
              borderBottomColor: '#4f46e5', 
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderStyle: 'solid'
            }}>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={handleDownload}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#f3f4f6',
              color: '#374151',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            <Download size={24} />
            <span className="text-sm font-medium">Download</span>
          </button>
          
          <button
            onClick={() => handleShare('instagram')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-colors"
            style={{ 
              background: 'linear-gradient(to bottom right, #8b5cf6, #ec4899)',
              color: 'white',
              transition: 'opacity 0.2s' 
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Instagram size={24} />
            <span className="text-sm font-medium">Instagram</span>
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#2563eb',
              color: 'white',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            <Facebook size={24} />
            <span className="text-sm font-medium">Facebook</span>
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#60a5fa',
              color: 'white',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#60a5fa'}
          >
            <Twitter size={24} />
            <span className="text-sm font-medium">Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#10b981',
              color: 'white',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
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