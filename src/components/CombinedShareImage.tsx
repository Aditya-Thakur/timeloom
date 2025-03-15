// CombinedShareImage.tsx - Updated version with fixed layout and improved badges
import { forwardRef, ForwardedRef, useState, useEffect } from 'react';
import { MilestonesData } from './constants/types';
import { calculateLifeStatistics } from './utils/lifeStatistics';
import { getClimateDataForYear } from './constants/climateData';
import { LifeStatistics } from './shareComponents/LifeStatistics';
import { WorldEvents } from './shareComponents/WorldEvents';
import { ClimateSnapshot } from './shareComponents/ClimateSnapshot';
import { MotivationalQuote } from './shareComponents/MotivationalQuote';
interface CombinedShareImageProps {
  milestones: MilestonesData;
  dateOfBirth: string;
}

const CombinedShareImage = forwardRef<HTMLDivElement, CombinedShareImageProps>(
  ({ milestones, dateOfBirth }, ref: ForwardedRef<HTMLDivElement>) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const birthDate = new Date(dateOfBirth);
    const birthYear = birthDate.getFullYear();
    const currentYear = new Date().getFullYear();
    
    // Calculate statistics for the user's life
    const lifeStats = calculateLifeStatistics(milestones.currentDays);
    
    // Get climate data for visualization
    const birthClimateData = getClimateDataForYear(birthYear);
    const currentClimateData = getClimateDataForYear(currentYear);
    
    // Determine next upcoming milestone
    const upcomingMilestone = milestones.momentsOfSignificance
      .filter(m => !m.isPast)
      .sort((a, b) => a.daysUntil! - b.daysUntil!)[0];

    useEffect(() => {
      const fetchUnsplashImage = async () => {
        try {
          const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
          if (!accessKey) {
            console.error("Unsplash API key not found");
            return;
          }

          // Fetch a curated image that works well with overlay text
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=cosmos,starry,gradient&orientation=portrait&client_id=${accessKey}`
          );

          if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
          }

          const data = await response.json();
          setBackgroundImage(data.urls.regular);
        } catch (error) {
          console.error("Error fetching Unsplash image:", error);
        }
      };

      fetchUnsplashImage();
    }, []);

    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '900px',
          boxSizing: 'border-box',
          padding: '24px',
          backgroundColor: '#1a1a2e', // Dark blue fallback
          backgroundImage: backgroundImage
            ? `linear-gradient(to bottom, rgba(26, 26, 46, 0.85), rgba(40, 40, 80, 0.9)), url(${backgroundImage})`
            : 'linear-gradient(to bottom, #1a1a2e, #16213e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          border: '2px solid #30305a',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial, sans-serif',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Column layout with single column at top */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flexGrow: 1
        }}>
          {/* Header - Title and Days Count with Visual Flair */}
          <div style={{
            textAlign: 'center',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.7), rgba(81, 45, 168, 0.4))',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '4px',
              color: '#b19cd9'
            }}>
              Life Journey
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0 0 6px 0',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {milestones.currentDays.toLocaleString()}
            </h2>
            <p style={{
              fontSize: '16px',
              margin: '0',
              color: '#e0e0fa',
            }}>
              days on Earth and counting
            </p>
          </div>

          {/* Achievement Badges Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '12px',
            background: 'linear-gradient(to right, rgba(66, 39, 90, 0.7), rgba(115, 75, 109, 0.7))',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
          }}>
            {/* Render 3 achievement badges based on past milestones */}
            {milestones.momentsOfSignificance
              .filter(m => m.isPast)
              .slice(0, 3)
              .map((milestone, index) => (
                <LifeStageBadge
                  key={index}
                  milestone={milestone}
                  index={index}
                />
              ))}
          </div>

          {/* Main Content in Two Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto auto',
            gap: '16px',
            flexGrow: 1
          }}>
            {/* Left Column - Life Statistics */}
            <div style={{
              gridColumn: '1',
              gridRow: '1',
              backgroundColor: 'rgba(30, 30, 60, 0.8)',
              padding: '14px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <LifeStatistics statistics={lifeStats} />
            </div>

            {/* Right Column - Motivational Quote */}
            <div style={{
              gridColumn: '2',
              gridRow: '1',
              background: 'linear-gradient(135deg, rgba(70, 30, 108, 0.7), rgba(116, 55, 148, 0.4))',
              padding: '14px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <MotivationalQuote 
                dayCount={milestones.currentDays}
                isPastHalfCentury={milestones.currentDays > 18250} // Over 50 years
              />
            </div>

            {/* World Events - Spans both columns */}
            <div style={{
              gridColumn: '1 / span 2',
              gridRow: '2',
              backgroundColor: 'rgba(40, 40, 70, 0.8)',
              padding: '14px',
              borderRadius: '10px'
            }}>
              <WorldEvents 
                birthYear={birthYear} 
                currentYear={currentYear}
              />
            </div>

            {/* Climate Impact Comparison - Spans both columns */}
            <div style={{
              gridColumn: '1 / span 2',
              gridRow: '3',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(30, 30, 60, 0.8)',
              padding: '14px',
              borderRadius: '10px'
            }}>
              <ClimateSnapshot 
                birthClimateData={birthClimateData}
                currentClimateData={currentClimateData}
                birthYear={birthYear}
                currentYear={currentYear}
              />
            </div>
          </div>

          {/* Footer with Next Milestone Progress */}
          {upcomingMilestone && (
            <div style={{
              padding: '14px',
              backgroundColor: 'rgba(50, 50, 80, 0.8)',
              borderRadius: '10px',
              boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <LifeProgressBar 
                nextMilestone={upcomingMilestone}
                currentDays={milestones.currentDays}
              />
            </div>
          )}

          {/* Branding Footer */}
          <div style={{
            marginTop: '12px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#a0a0d0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9c27b0, #673ab7)',
                marginRight: '6px'
              }}></div>
              <span style={{ fontWeight: 'bold' }}>TimeLoom</span>
            </div>
            <span>Weave your story • Share your journey</span>
          </div>
        </div>
      </div>
    );
  }
);

CombinedShareImage.displayName = 'CombinedShareImage';

// Updated version of the LifeStageBadge component with proper SVG icons
import { Milestone } from './constants/types';

const LifeStageBadge = ({ milestone, index }: { milestone: Milestone, index: number }) => {
  // Badge colors corresponding to different milestone stages
  const badgeColors = [
    { bg: '#bb86fc', border: '#9d4edd', text: '#fff' }, // Purple
    { bg: '#03dac6', border: '#018786', text: '#000' }, // Teal
    { bg: '#ff7597', border: '#cf6679', text: '#000' }, // Pink
  ];
  
  const color = badgeColors[index % badgeColors.length];
  
  // Get badge name based on milestone days
  const getBadgeName = () => {
    if (milestone.days === 1000) return 'Early Journeyer';
    if (milestone.days === 2000) return 'Young Explorer';
    if (milestone.days === 5000) return 'Path Finder';
    if (milestone.days === 10000) return 'Life Navigator';
    if (milestone.days === 15000) return 'Season Voyager';
    if (milestone.days === 20000) return 'Wisdom Keeper';
    if (milestone.days === 25000) return 'Time Weaver';
    if (milestone.days === 30000) return 'Legacy Creator';
    return milestone.description || 'Milestone Achieved';
  };

  // Get appropriate icon based on milestone
  const renderIcon = () => {
    // Map milestone days to specific life stage indices
    // This ensures each milestone has an appropriate icon
    let stageIndex = 0;
    
    if (milestone.days <= 1000) stageIndex = 0; // Baby/toddler
    else if (milestone.days <= 2000) stageIndex = 1; // Child
    else if (milestone.days <= 5000) stageIndex = 2; // Teenager
    else if (milestone.days <= 10000) stageIndex = 3; // Young adult
    else if (milestone.days <= 15000) stageIndex = 4; // Adult
    else if (milestone.days <= 20000) stageIndex = 5; // Middle-aged
    else if (milestone.days <= 25000) stageIndex = 6; // Older adult
    else stageIndex = 7; // Elderly/sage
    
    // Return the appropriate life stage SVG
    return renderLifeStageSVG(stageIndex, color.text);
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '74px',
        height: '74px',
        borderRadius: '50%',
        backgroundColor: color.bg,
        border: `3px solid ${color.border}`,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color.text,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Badge background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 70% 70%, transparent 65%, rgba(255, 255, 255, 0.15) 65%)`
        }}></div>
        
        {/* Custom SVG Icon Based on Life Stage */}
        {renderIcon()}
      </div>
      <div style={{
        marginTop: '8px',
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#e0e0fa',
        textAlign: 'center',
        maxWidth: '90px'
      }}>
        {getBadgeName()}
      </div>
    </div>
  );
};

// Function to render SVG icons for different life stages
const renderLifeStageSVG = (stageIndex: number, color: string | undefined) => {
  const size = 36; // Slightly smaller than badge to fit well
  
  switch(stageIndex) {
    // Baby/toddler
    case 0:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="5" />
          <path d="M8 9h8" />
          <path d="M12 14v7" />
          <path d="M9 18h6" />
          <circle cx="10" cy="7" r="1" />
          <circle cx="14" cy="7" r="1" />
        </svg>
      );
    // Child
    case 1:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M9 8h6" />
          <path d="M10 6h.01" />
          <path d="M14 6h.01" />
          <path d="M12 13v8" />
          <path d="M8 18h8" />
          <path d="M8 21h8" />
        </svg>
      );
    // Teenager
    case 2:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M10 5h.01" />
          <path d="M14 5h.01" />
          <path d="M9 11c-.72 1.5-1 3-1 5 0 2 1 3 2 3" />
          <path d="M15 11c.72 1.5 1 3 1 5 0 2-1 3-2 3" />
          <path d="M12 14v4" />
          <path d="M9 22h6" />
        </svg>
      );
    // Young adult
    case 3:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="4" />
          <path d="M10 4h.01" />
          <path d="M14 4h.01" />
          <path d="M12 10v8" />
          <path d="M8 14l4-1 4 1" />
          <path d="M9 22h6" />
        </svg>
      );
    // Adult
    case 4:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v10" />
          <path d="M8 16h8" />
          <path d="M7 20h10" />
          <path d="M7 12h10" />
        </svg>
      );
    // Middle-aged
    case 5:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <path d="M10 3.5h.01" />
          <path d="M14 3.5h.01" />
          <path d="M12 8v9" />
          <path d="M9 12h6" />
          <path d="M17 21v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1" />
        </svg>
      );
    // Older adult
    case 6:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v8" />
          <path d="M9 11h6" />
          <path d="M8 22l2-6" />
          <path d="M16 22l-2-6" />
        </svg>
      );
    // Elderly/sage
    case 7:
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
};

const LifeProgressBar = ({ nextMilestone, currentDays }: { nextMilestone: Milestone, currentDays: number }) => {
  // Calculate progress percentage
  const totalDaysToNextMilestone = nextMilestone.days;
  const progress = (currentDays / totalDaysToNextMilestone) * 100;
  
  // Format the milestone description nicely
  const getMilestoneTitle = () => {
    return nextMilestone.description || `${nextMilestone.days.toLocaleString()}-Day Milestone`;
  };
  
  // Calculate days remaining and percentage
  const daysRemaining = nextMilestone.daysUntil || 0;
  const percentComplete = Math.min(Math.round(progress), 99); // Cap at 99% for visibility
  
  return (
    <div>
      <h3 style={{
        fontSize: '14px',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#03dac6',
        textAlign: 'center'
      }}>
        Next Milestone Countdown
      </h3>
      
      <div style={{
        textAlign: 'center',
        marginBottom: '12px',
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#e0e0fa',
          marginBottom: '4px'
        }}>
          {getMilestoneTitle()}
        </div>
        
        <div style={{
          fontSize: '13px',
          color: '#b0b0e0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>{currentDays.toLocaleString()} days completed</span>
          <span style={{ color: '#6c6c9c' }}>•</span>
          <span>{daysRemaining.toLocaleString()} days remaining</span>
        </div>
      </div>
      
      {/* Progress Bar Container */}
      <div style={{
        height: '16px',
        backgroundColor: 'rgba(3, 218, 198, 0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        padding: '2px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Progress Fill */}
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(to right, #03dac6, #018786)',
          borderRadius: '6px',
          position: 'relative',
        }}>
          {/* Animated pulse effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '10px',
            height: '100%',
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7))',
            animation: 'pulse 1.5s infinite',
          }}></div>
          
          {/* Animation keyframes - would be defined in a real CSS file */}
          <style>{`
            @keyframes pulse {
              0% { opacity: 0.3; }
              50% { opacity: 0.7; }
              100% { opacity: 0.3; }
            }
          `}</style>
        </div>
        
        {/* Percentage Text - Positioned on the progress bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: progress > 50 ? '#fff' : '#018786',
          fontSize: '10px',
          fontWeight: 'bold',
          textShadow: progress > 50 ? '0 1px 1px rgba(0,0,0,0.3)' : 'none',
        }}>
          {percentComplete}% Complete
        </div>
        
        {/* Milestone Markers */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
        }}>
          {[25, 50, 75].map((marker) => (
            <div key={marker} style={{
              position: 'absolute',
              left: `${marker}%`,
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}></div>
          ))}
        </div>
      </div>
      
      {/* Progress Scale */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: '#a0a0d0',
        marginTop: '6px'
      }}>
        <span>0 days</span>
        <span style={{ color: '#b3b3e0' }}>{Math.round(totalDaysToNextMilestone * 0.25).toLocaleString()}</span>
        <span style={{ color: '#b3b3e0' }}>{Math.round(totalDaysToNextMilestone * 0.5).toLocaleString()}</span>
        <span style={{ color: '#b3b3e0' }}>{Math.round(totalDaysToNextMilestone * 0.75).toLocaleString()}</span>
        <span>{totalDaysToNextMilestone.toLocaleString()} days</span>
      </div>
      
      {/* Motivational Message */}
      <div style={{
        textAlign: 'center',
        fontSize: '11px',
        color: '#e0e0fa',
        marginTop: '12px',
        fontStyle: 'italic'
      }}>
        {percentComplete < 25 && "Your journey toward this milestone is just beginning!"}
        {percentComplete >= 25 && percentComplete < 50 && "You're making steady progress — keep going!"}
        {percentComplete >= 50 && percentComplete < 75 && "You're over halfway to your next milestone!"}
        {percentComplete >= 75 && percentComplete < 90 && "Almost there! The milestone is within reach."}
        {percentComplete >= 90 && "You're about to reach this significant milestone!"}
      </div>
    </div>
  );
};

export default CombinedShareImage;