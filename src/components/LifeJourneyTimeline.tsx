// LifeJourneyTimeline.tsx (Modal Enhancement with Climate Impact)
import React, { JSX, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Thermometer } from 'lucide-react';
import { Milestone } from './types';
import ClimateImpactOverlay from './ClimateImpactOverlay';

interface LifeJourneyTimelineProps {
  milestones: Milestone[];
  showClimateImpact?: boolean; // Optional prop to toggle climate impact display
}

// Define life goals for each life stage
const lifeStageGoals: Record<number, string[]> = {
  0: [
    "First smile and laugh",
    "Learning to crawl",
    "First words spoken"
  ],
  1: [
    "Learning to read",
    "Making first friends",
    "Developing independence"
  ],
  2: [
    "Developing personal identity",
    "Building deeper friendships",
    "Exploring interests and passions"
  ],
  3: [
    "Starting career journey",
    "Building meaningful relationships",
    "Financial independence"
  ],
  4: [
    "Career advancement",
    "Creating a family/home",
    "Contributing to community"
  ],
  5: [
    "Mentoring others",
    "Work-life balance mastery",
    "Legacy planning"
  ],
  6: [
    "Sharing wisdom with younger generations",
    "Pursuing postponed dreams",
    "Finding purpose in retirement"
  ],
  7: [
    "Reflecting on life accomplishments",
    "Finding peace and contentment",
    "Leaving a positive legacy"
  ]
};

const LifeJourneyTimeline: React.FC<LifeJourneyTimelineProps> = ({ 
  milestones, 
  showClimateImpact = true // Default to showing climate impact
}) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number | null>(null);
  
  // Sort milestones by days (ascending)
  const sortedMilestones = [...milestones].sort((a, b) => a.days - b.days);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const goToPrevious = () => {
    setVisibleIndex(prev => Math.max(0, prev - 1));
  };
  
  const goToNext = () => {
    setVisibleIndex(prev => Math.min(sortedMilestones.length - 1, prev + 1));
  };
  
  const openModal = (index: number) => {
    setSelectedMilestoneIndex(index);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMilestoneIndex(null);
  };
  
  // Extract year from the date format (MM/DD/YYYY)
  const getYearFromDateString = (dateString: string): number => {
    if (dateString != "") {
      return new Date(dateString).getFullYear();
    }
    return new Date().getFullYear(); // Default to current year if parsing fails
  };
  
  // Modal component
  const MilestoneModal = () => {
    if (selectedMilestoneIndex === null) return null;
    
    const milestone = sortedMilestones[selectedMilestoneIndex];
    const goals = lifeStageGoals[selectedMilestoneIndex] || [];
    const year = getYearFromDateString(milestone.date);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
          <div className="p-6">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {milestone.description}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Life stage icon */}
            <div className="flex justify-center my-4">
              <div className={`text-teal-600 ${milestone.isPast ? '' : 'opacity-70'}`}>
                {getLifeStageSVG(selectedMilestoneIndex, milestone.isPast, true)}
              </div>
            </div>
            
            {/* Milestone details */}
            <div className="mb-6 text-center">
              <p className="text-2xl font-bold text-teal-600 mb-1">
                {milestone.days.toLocaleString()} days
              </p>
              <p className="text-md text-gray-600 mb-2">
                {milestone.date}
              </p>
              {!milestone.isPast && milestone.daysUntil && (
                <p className="text-sm text-gray-500">
                  {milestone.daysUntil.toLocaleString()} days from now
                </p>
              )}
              
              {/* Climate impact information in modal */}
              {showClimateImpact && (
                <div className="mt-4 bg-amber-50 p-4 rounded-lg text-left">
                  <h4 className="font-medium text-amber-700 mb-2">Climate Impact</h4>
                  <ClimateImpactOverlay year={year} isPast={milestone.isPast} />
                </div>
              )}
            </div>
            
            {/* Life goals section */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <h4 className="font-medium text-teal-700 mb-3">Life Milestones & Goals</h4>
              <ul className="space-y-2">
                {goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Mobile view (carousel style)
  if (isMobile) {
    const currentMilestone = sortedMilestones[visibleIndex];
    const year = getYearFromDateString(currentMilestone.date);
    
    return (
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-2">1</span>
          Moments of Significance
          {showClimateImpact && (
            <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Thermometer size={12} className="mr-1" /> Climate Impact
            </span>
          )}
        </h3>
        
        <div className="relative px-8">
          {/* Timeline Line */}
          <div className="absolute top-24 left-10 right-10 h-1 bg-teal-200 z-0"></div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={goToPrevious} 
            disabled={visibleIndex === 0}
            className={`absolute left-0 top-20 p-1 rounded-full ${visibleIndex === 0 ? 'text-gray-300' : 'text-teal-600 hover:bg-teal-100'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={goToNext} 
            disabled={visibleIndex === sortedMilestones.length - 1}
            className={`absolute right-0 top-20 p-1 rounded-full ${visibleIndex === sortedMilestones.length - 1 ? 'text-gray-300' : 'text-teal-600 hover:bg-teal-100'}`}
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Current Milestone */}
          <div className="flex justify-center items-start relative z-10">
            <div className="flex flex-col items-center">
              {/* Clickable Life Stage SVG */}
              <button 
                onClick={() => openModal(visibleIndex)}
                className={`mb-2 rounded p-1 hover:bg-teal-50 transition-colors ${currentMilestone.isPast ? 'text-teal-600' : 'text-gray-400'}`}
                aria-label={`View details for ${currentMilestone.description}`}
              >
                {getLifeStageSVG(visibleIndex, currentMilestone.isPast)}
              </button>
              
              {/* Milestone Point */}
              <div className={`w-4 h-4 rounded-full mb-1 ${currentMilestone.isPast ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
              
              {/* Days */}
              <div className={`text-lg font-bold ${currentMilestone.isPast ? 'text-teal-600' : 'text-gray-500'}`}>
                {currentMilestone.days.toLocaleString()}
              </div>
              
              {/* Description */}
              <div className="text-center">
                <p className="text-md font-medium">{currentMilestone.description}</p>
                <p className={`text-sm ${currentMilestone.isPast ? 'text-teal-700' : 'text-gray-500'}`}>
                  {currentMilestone.date}
                </p>
                {!currentMilestone.isPast && currentMilestone.daysUntil && (
                  <p className="text-sm text-gray-500">
                    {currentMilestone.daysUntil.toLocaleString()} days from now
                  </p>
                )}
                
                {/* Climate Impact Overlay for mobile view */}
                {showClimateImpact && (
                  <ClimateImpactOverlay 
                    year={year}
                    isPast={currentMilestone.isPast}
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center mt-6 gap-1">
            {sortedMilestones.map((_, index) => (
              <button 
                key={index}
                onClick={() => setVisibleIndex(index)}
                className={`w-2 h-2 rounded-full ${index === visibleIndex ? 'bg-teal-600' : 'bg-gray-300'}`}
                aria-label={`Go to milestone ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {modalOpen && <MilestoneModal />}
      </div>
    );
  }
  
  // Desktop view (full timeline)
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-2">1</span>
        Moments of Significance
        {showClimateImpact && (
          <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <Thermometer size={12} className="mr-1" /> Climate Impact
          </span>
        )}
      </h3>
      
      <div className="relative p-4 overflow-x-auto">
        {/* Timeline Container with horizontal scrolling for smaller screens */}
        <div className="min-w-max">
          {/* Timeline Line */}
          <div className="absolute top-24 left-16 right-16 h-1 bg-teal-200 z-0"></div>
          
          {/* Timeline Items */}
          <div className="flex justify-between items-start relative z-10" style={{ minWidth: `${sortedMilestones.length * 130}px` }}>
            {sortedMilestones.map((milestone, index) => {
              const year = getYearFromDateString(milestone.date);
              return (
                <div key={milestone.id} className="flex flex-col items-center mx-4" style={{ minWidth: "120px" }}>
                  {/* Clickable Life Stage SVG */}
                  <button 
                    onClick={() => openModal(index)}
                    className={`mb-2 rounded p-1 hover:bg-teal-50 transition-colors ${milestone.isPast ? 'text-teal-600' : 'text-gray-400'}`}
                    aria-label={`View details for ${milestone.description}`}
                  >
                    {getLifeStageSVG(index, milestone.isPast)}
                  </button>
                  
                  {/* Milestone Point */}
                  <div className={`w-4 h-4 rounded-full mb-1 ${milestone.isPast ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
                  
                  {/* Days */}
                  <div className={`text-lg font-bold ${milestone.isPast ? 'text-teal-600' : 'text-gray-500'}`}>
                    {milestone.days.toLocaleString()}
                  </div>
                  
                  {/* Description */}
                  <div className="text-center">
                    <p className="text-sm font-medium">{milestone.description}</p>
                    <p className={`text-xs ${milestone.isPast ? 'text-teal-700' : 'text-gray-500'}`}>
                      {milestone.date}
                    </p>
                    {!milestone.isPast && milestone.daysUntil && (
                      <p className="text-xs text-gray-500">
                        {milestone.daysUntil.toLocaleString()} days from now
                      </p>
                    )}
                    
                    {/* Climate Impact Overlay for desktop view */}
                    {showClimateImpact && (
                      <ClimateImpactOverlay 
                        year={year}
                        isPast={milestone.isPast}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {modalOpen && <MilestoneModal />}
    </div>
  );
};

// Helper function to get the appropriate SVG based on the life stage
function getLifeStageSVG(index: number, isPast: boolean, isModal = false): JSX.Element {
  const fillColor = isPast ? 'currentColor' : 'currentColor';
  const opacity = isPast ? '1' : '0.5';
  const size = isModal ? '64' : '40'; // Larger size for modal display
  
  // Early childhood (baby/toddler)
  if (index === 0) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="9" r="5" />
        <path d="M8 9h8" />
        <path d="M12 14v7" />
        <path d="M9 18h6" />
        <circle cx="10" cy="7" r="1" />
        <circle cx="14" cy="7" r="1" />
      </svg>
    );
  }
  // Child (elementary school)
  else if (index === 1) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="8" r="5" />
        <path d="M9 8h6" />
        <path d="M10 6h.01" />
        <path d="M14 6h.01" />
        <path d="M12 13v8" />
        <path d="M8 18h8" />
        <path d="M8 21h8" />
      </svg>
    );
  }
  // Teenager
  else if (index === 2) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="7" r="4" />
        <path d="M10 5h.01" />
        <path d="M14 5h.01" />
        <path d="M9 11c-.72 1.5-1 3-1 5 0 2 1 3 2 3" />
        <path d="M15 11c.72 1.5 1 3 1 5 0 2-1 3-2 3" />
        <path d="M12 14v4" />
        <path d="M9 22h6" />
      </svg>
    );
  }
  // Young adult
  else if (index === 3) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="6" r="4" />
        <path d="M10 4h.01" />
        <path d="M14 4h.01" />
        <path d="M12 10v8" />
        <path d="M8 14l4-1 4 1" />
        <path d="M9 22h6" />
      </svg>
    );
  }
  // Adult (career/family)
  else if (index === 4) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v10" />
        <path d="M8 16h8" />
        <path d="M7 20h10" />
        <path d="M7 12h10" />
      </svg>
    );
  }
  // Middle-aged
  else if (index === 5) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M10 3.5h.01" />
        <path d="M14 3.5h.01" />
        <path d="M12 8v9" />
        <path d="M9 12h6" />
        <path d="M17 21v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1" />
      </svg>
    );
  }
  // Older adult
  else if (index === 6) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v8" />
        <path d="M9 11h6" />
        <path d="M8 22l2-6" />
        <path d="M16 22l-2-6" />
      </svg>
    );
  }
  // Elderly/sage
  else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M10 3h.01" />
        <path d="M14 3h.01" />
        <path d="M12 8v7" />
        <path d="M9 12h6" />
        <path d="M8 22c0-4.4 3.6-8 8-8" />
        <path d="M17 16l2 3" />
      </svg>
    );
  }
}

export default LifeJourneyTimeline;