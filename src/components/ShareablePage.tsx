// ShareablePage.tsx - A full screen page for sharing TimeLoom images
import React, { useRef, useState, useEffect } from 'react';
import { Download, Instagram, Facebook, Twitter, ArrowLeft } from 'lucide-react';
import { MilestonesData } from './constants/types';
import LifeStageSVG from './LifeStageSVG';
import { getClimateDataForYear } from './constants/climateData';
import html2canvas from 'html2canvas';

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
  
  // Calculate birth year
  const birthYear = new Date(dateOfBirth).getFullYear();
  
  // Generate timeline years for climate data
  const generateTimelineYears = (): number[] => {
    const years = [];
    const currentYear = new Date().getFullYear();
    
    // Add birth year
    years.push(birthYear);
    
    // Add current year if different from birth year
    if (currentYear !== birthYear) {
      years.push(currentYear);
    }
    
    // Add future years at 25-year intervals
    for (let year = birthYear + 25; year <= birthYear + 100; year += 25) {
      if (year > currentYear) {
        years.push(year);
      }
    }
    
    return years.sort((a, b) => a - b);
  };
  
  const timelineYears = generateTimelineYears();

  // Generate image from ref
  const generateImage = async (ref: React.RefObject<HTMLDivElement>): Promise<string | null> => {
    if (!ref.current) return null;
    
    setIsGenerating(true);
    
    try {
      // Add a slight delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(ref.current, {
        scale: 2, // Higher quality
        backgroundColor: null,
        logging: false
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setShareableUrl(imageUrl);
      setIsGenerating(false);
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      setIsGenerating(false);
      return null;
    }
  };

  // Handle download
  const handleDownload = async () => {
    const ref = activeTab === 'milestones' ? milestonesImageRef : climateImageRef;
    const imageUrl = await generateImage(ref);
    
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `timeloom-${activeTab}-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle social media sharing
  const handleShare = async (platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp') => {
    const ref = activeTab === 'milestones' ? milestonesImageRef : climateImageRef;
    const imageUrl = shareableUrl || await generateImage(ref);
    
    if (!imageUrl) return;
    
    const shareText = activeTab === 'milestones' 
      ? `I've lived ${milestones.currentDays.toLocaleString()} days! Check out my life milestones with TimeLoom.`
      : `Here's how climate has changed throughout my lifetime. Generated with TimeLoom.`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`;
        break;
      case 'instagram':
        // Instagram requires the app and doesn't have a direct web share URL
        alert('To share on Instagram, please download the image and upload it through the Instagram app.');
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  // Generate image on tab change
  useEffect(() => {
    setShareableUrl(null);
    const timer = setTimeout(() => {
      const ref = activeTab === 'milestones' ? milestonesImageRef : climateImageRef;
      generateImage(ref);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

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
            <div 
              ref={milestonesImageRef} 
              className="w-full max-w-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg border-2 border-indigo-200 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-800">My Life Journey</h3>
                  <p className="text-indigo-600">
                    I've lived <span className="font-bold">{milestones.currentDays.toLocaleString()}</span> days
                  </p>
                </div>
                <div className="bg-white rounded-full p-2 shadow-md">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                    <path d="M20 12V20L25 25" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Milestone Journey Timeline */}
                <div className="relative pt-6 pb-2">
                  <div className="absolute top-10 left-0 right-0 h-1 bg-indigo-300 z-0"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    {milestones.momentsOfSignificance.slice(0, 5).map((milestone, index) => (
                      <div key={index} className="flex flex-col items-center" style={{width: '20%'}}>
                        <div className={`p-2 rounded-full ${milestone.isPast ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'} mb-1`}>
                          <LifeStageSVG index={index} isPast={milestone.isPast} />
                        </div>
                        <div className={`w-3 h-3 rounded-full mb-1 ${milestone.isPast ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                        <p className={`text-sm font-bold ${milestone.isPast ? 'text-indigo-600' : 'text-gray-400'}`}>
                          {milestone.days.toLocaleString()}
                        </p>
                        <p className="text-xs text-center text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Key Achievements */}
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-700 mb-2">Key Milestones</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {milestones.momentsOfSignificance
                      .filter(m => m.isPast)
                      .slice(0, 4)
                      .map((milestone, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="text-sm">{milestone.description}</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Days Lived Badge - With better contrast and focus on days */}
                <div className="flex justify-between items-center bg-white rounded-lg p-4 border border-indigo-200">
                  <div>
                    <p className="text-sm text-indigo-700">Earth Days Lived</p>
                    <p className="text-xl font-bold text-indigo-800">{milestones.currentDays.toLocaleString()} days</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-full shadow-sm">
                    <div className="bg-indigo-600 text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">TL</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-right text-xs text-gray-500">
                Generated with TimeLoom • timeloom.com
              </div>
            </div>
          ) : (
            <div 
              ref={climateImageRef} 
              className="w-full max-w-lg p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg border-2 border-amber-200 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-amber-800">My Climate Timeline</h3>
                  <p className="text-amber-600">
                    From {birthYear} to {new Date().getFullYear() + 80}
                  </p>
                </div>
                <div className="bg-white rounded-full p-2 shadow-md">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10V16M20 16V22M20 16H26M20 16H14" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M13 28C13 25.7909 14.7909 24 17 24H23C25.2091 24 27 25.7909 27 28V28C27 30.2091 25.2091 32 23 32H17C14.7909 32 13 30.2091 13 28V28Z" stroke="#D97706" strokeWidth="2"/>
                    <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" stroke="#D97706" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* CO2 Graph */}
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <h4 className="font-bold text-amber-700 mb-2">CO₂ Concentration Over Your Lifetime</h4>
                  <div className="h-32 relative">
                    {/* Y-axis */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between items-end pr-1">
                      <span className="text-xs text-gray-500">650</span>
                      <span className="text-xs text-gray-500">500</span>
                      <span className="text-xs text-gray-500">350</span>
                      <span className="text-xs text-gray-500">300</span>
                    </div>
                    
                    {/* Graph area */}
                    <div className="absolute left-8 right-0 top-0 bottom-0">
                      {/* Horizontal grid lines */}
                      <div className="absolute w-full h-full flex flex-col justify-between">
                        <div className="border-t border-gray-200 w-full"></div>
                        <div className="border-t border-gray-200 w-full"></div>
                        <div className="border-t border-gray-200 w-full"></div>
                        <div className="border-t border-gray-200 w-full"></div>
                      </div>
                      
                      {/* Graph line */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#92400E" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                        <polyline
                          points={`
                            0,${100 - (getClimateDataForYear(timelineYears[0]).co2 - 300) / 350 * 100}
                            ${timelineYears.map((year, i) => 
                              `${i * (100 / (timelineYears.length - 1))},${100 - (getClimateDataForYear(year).co2 - 300) / 350 * 100}`
                            ).join(' ')}
                          `}
                          fill="none"
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                        />
                      </svg>
                      
                      {/* X-axis labels */}
                      <div className="absolute bottom-0 w-full flex justify-between transform translate-y-4">
                        {timelineYears.map((year, i) => (
                          <div key={i} className="text-xs text-gray-500">
                            {year}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Climate Impacts */}
                <div className="grid grid-cols-3 gap-3">
                  {timelineYears.slice(0, 3).map((year, idx) => {
                    const data = getClimateDataForYear(year);
                    return (
                      <div key={idx} className="bg-white bg-opacity-70 rounded-lg p-3">
                        <h5 className="text-sm font-medium text-amber-700">{year}</h5>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">CO₂:</span>
                            <span className="font-medium">{data.co2} ppm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Temp:</span>
                            <span className="font-medium">+{data.temperature.toFixed(1)}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sea Level:</span>
                            <span className="font-medium">{data.seaLevel} cm</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Call to Action */}
                <div className="bg-amber-100 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-amber-800 mb-1">Climate Action</h4>
                  <p className="text-xs text-amber-700">
                    Taking action today can help mitigate climate change impacts. Every choice matters for future generations.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-right text-xs text-gray-500">
                Generated with TimeLoom • timeloom.com
              </div>
            </div>
          )}
        </div>
        
        {/* Share Buttons */}
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
      </main>
    </div>
  );
};

export default ShareablePage;