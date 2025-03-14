// MilestoneShareImage.tsx - Component for generating milestone share images in 9:16 aspect ratio
import { forwardRef, ForwardedRef, useState, useEffect } from 'react';
import { MilestonesData } from './constants/types';

interface MilestoneShareImageProps {
  milestones: MilestonesData;
}

const MilestoneShareImage = forwardRef<HTMLDivElement, MilestoneShareImageProps>(
  ({ milestones }, ref: ForwardedRef<HTMLDivElement>) => {

    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    // Separate past and future milestones
    const pastMilestones = milestones.momentsOfSignificance.filter(m => m.isPast);
    const futureMilestones = milestones.momentsOfSignificance
      .filter(m => !m.isPast && m.days <= 30000)
      .sort((a, b) => a.days - b.days);

    useEffect(() => {
      const fetchUnsplashImage = async () => {
        try {
          const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
          if (!accessKey) {
            console.error("Unsplash API key not found");
            return;
          }

          // Fetch a curated nature/landscape image
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=nature,landscape,minimal&orientation=portrait&client_id=${accessKey}`
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
          maxWidth: '500px',
          height: '889px',
          boxSizing: 'border-box',
          padding: '24px',
          backgroundColor: '#eef2ff', // Fallback color
          backgroundImage: backgroundImage
            ? `linear-gradient(to bottom, rgba(238, 242, 255, 0.21), rgba(224, 231, 255, 0.19)), url(${backgroundImage})`
            : 'linear-gradient(to bottom, #eef2ff, #e0e7ff)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          border: '2px solid #c7d2fe',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#1f2937',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '12px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 0 6px 0',
            color: '#4338ca',
            lineHeight: 1.2,
            transform: 'translateY(-2px)' // Adjust for image rendering
          }}>
            My Life Journey
          </h2>
          <p style={{
            fontSize: '18px',
            margin: '0',
            color: '#4f46e5',
            lineHeight: 1.2,
            transform: 'translateY(-2px)' // Adjust for image rendering
          }}>
            <span style={{ fontWeight: 'bold' }}>{milestones.currentDays.toLocaleString()}</span> days and counting
          </p>
        </div>

        {/* Main Content with Past and Future Milestones */}
        <div style={{
          display: 'flex',
          flexGrow: 1,
          gap: '16px'
        }}>
          {/* Left Side: Past Milestones */}
          <div style={{
            width: '42%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0 0 12px 0',
              color: '#4338ca',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              padding: '6px',
              borderRadius: '8px',
              lineHeight: 1.2,
              transform: 'translateY(-2px)' // Adjust for image rendering
            }}>
              My Journey So Far
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flexGrow: 1,
              overflowY: 'hidden'
            }}>
              {pastMilestones.map((milestone, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '10px 8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  marginRight: '-5px' // Extend slightly toward the center line
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '10px',
                    flexShrink: 0
                  }}>
                    <LifeStageSVGRenderer index={index} isPast={true} size={28} />
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#4f46e5',
                      marginTop: '2px'
                    }}>
                      {milestone.days.toLocaleString()}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'medium',
                      color: '#4b5563',
                      marginBottom: '3px',
                      lineHeight: 1.2
                    }}>
                      {milestone.description}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#6b7280',
                      lineHeight: 1.2
                    }}>
                      {milestone.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Section: Current Status and Info */}
          <div style={{
            width: '16%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            position: 'relative'
          }}>
            {/* Current Age Indicator */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              border: '3px solid #4f46e5',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#4338ca',
                transform: 'translateY(-2px)' // Adjust vertical position to prevent downward shift
              }}>
                NOW
              </div>
            </div>

            {/* Horizontal connection lines to milestone cards */}
            <div style={{
              position: 'absolute',
              top: '35px', // Center of the NOW circle
              left: '-8px',
              width: '8px',
              height: '2px',
              backgroundColor: '#4f46e5'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '35px', // Center of the NOW circle
              right: '-8px',
              width: '8px',
              height: '2px',
              backgroundColor: '#818cf8'
            }}></div>

            {/* Vertical Timeline Line */}
            <div style={{
              width: '3px',
              flexGrow: 1,
              background: 'linear-gradient(to bottom, #4f46e5, #818cf8)',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Connection branches to past milestones */}
              {pastMilestones.map((_, i) => (
                <div key={`past-branch-${i}`} style={{
                  position: 'absolute',
                  top: `${50 + i * 100}px`,
                  left: 0,
                  width: '15px',
                  height: '2px',
                  backgroundColor: '#4f46e5',
                  transform: 'translateX(-15px)'
                }}></div>
              ))}

              {/* Connection branches to future milestones */}
              {futureMilestones.map((_, i) => (
                <div key={`future-branch-${i}`} style={{
                  position: 'absolute',
                  top: `${50 + i * 100}px`,
                  right: 0,
                  width: '15px',
                  height: '2px',
                  backgroundColor: '#818cf8',
                  transform: 'translateX(15px)'
                }}></div>
              ))}
            </div>

            {/* Earth Icon at the bottom of the timeline */}
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              zIndex: 2
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>

            {/* TimeLoom text next to earth */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#4f46e5',
              transform: 'translateY(-2px)' // Adjust for image rendering
            }}>
              TimeLoom
            </div>
          </div>

          {/* Right Side: Future Milestones */}
          <div style={{
            width: '42%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0 0 12px 0',
              color: '#4338ca',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              padding: '6px',
              borderRadius: '8px',
              lineHeight: 1.2,
              transform: 'translateY(-2px)' // Adjust for image rendering
            }}>
              My Future Path
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flexGrow: 1,
              overflowY: 'hidden'
            }}>
              {futureMilestones.map((milestone, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '10px 8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  opacity: 0.85,
                  marginLeft: '-5px' // Extend slightly toward the center line
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    marginRight: '8px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'medium',
                      color: '#4b5563',
                      marginBottom: '3px',
                      lineHeight: 1.2
                    }}>
                      {milestone.description}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#6b7280',
                      lineHeight: 1.2
                    }}>
                      {milestone.date}
                    </div>
                    <div style={{
                      fontSize: '9px',
                      color: '#818cf8',
                      marginTop: '2px',
                      lineHeight: 1.2
                    }}>
                      {milestone.daysUntil?.toLocaleString()} days from now
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: 'auto',
                    flexShrink: 0
                  }}>
                    <LifeStageSVGRenderer
                      index={pastMilestones.length + index}
                      isPast={false}
                      size={28}
                    />
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#818cf8',
                      marginTop: '2px'
                    }}>
                      {milestone.days.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#6b7280',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '6px',
          borderRadius: '8px',
          transform: 'translateY(-2px)' // Adjust for image rendering
        }}>
          TimeLoom.com
        </div>
      </div>
    );
  }
);

// Simplified version of LifeStageSVG component to inline in the image
const LifeStageSVGRenderer = ({ index, isPast, size = 40 }: { index: number; isPast: boolean; size?: number }) => {
  const fillColor = isPast ? '#4f46e5' : '#818cf8';
  const opacity = isPast ? '1' : '0.8';

  // Function to render the appropriate SVG based on index
  const renderSVG = () => {
    // Using switch to determine which icon to show based on index
    // We limit the index to 0-7 to match the available life stage icons
    const limitedIndex = Math.min(7, Math.max(0, index % 8));

    switch (limitedIndex) {
      // Baby/toddler
      case 0:
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
      // Child
      case 1:
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
      // Teenager
      case 2:
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
      // Young adult
      case 3:
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
      // Adult
      case 4:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
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
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
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
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
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
  };

  return renderSVG();
};

MilestoneShareImage.displayName = 'MilestoneShareImage';

export default MilestoneShareImage;