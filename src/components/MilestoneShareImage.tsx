// MilestoneShareImage.tsx - Component for generating milestone share images with fixes
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

            {/* Improved Earth Icon at the bottom of the timeline */}
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
              zIndex: 2,
              overflow: 'hidden' // Keep the globe contained in the circle
            }}>
              {/* More realistic Earth globe SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
                <circle cx="32" cy="32" r="28" fill="#5DADE2" />

                {/* Continents */}
                <path d="M18,17 C20,15 26,16 28,18 C30,20 32,21 34,19 C36,17 39,19 38,22 C37,25 40,27 42,25 C44,23 46,25 45,27 C44,29 45,32 48,30 C51,28 52,33 50,35 C48,37 48,40 52,40 C56,40 58,43 55,46 C52,49 48,48 46,46 C44,44 40,45 38,48 C36,51 33,51 31,49 C29,47 26,48 24,50 C22,52 18,51 17,49 C16,47 14,46 12,48 C10,50 8,48 7,46 C6,44 8,42 10,42 C12,42 13,39 11,37 C9,35 12,32 15,33 C18,34 21,32 19,29 C17,26 18,22 16,20 C14,18 16,19 18,17" fill="#2E7D32" />
                <path d="M41,13 C43,11 46,12 47,14 C48,16 50,17 52,16 C54,15 56,17 55,19 C54,21 56,23 58,21 C60,19 61,22 59,24 C57,26 58,29 61,30 C57,32 56,36 54,38 C52,40 48,38 46,36 C44,34 42,36 40,38 C38,40 34,38 32,35 C30,32 26,33 24,36 C22,39 19,37 18,35 C17,33 15,32 14,34 C13,36 10,35 9,33 C8,31 13,32 18,29 C23,26 25,20 20,18 C15,16 25,17 28,15 C31,13 39,15 41,13" fill="#4CAF50" />

                {/* Soft gloss effect */}
                <ellipse cx="24" cy="22" rx="18" ry="14" fill="rgba(255,255,255,0.1)" />
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
                    marginRight: '8px',
                    flexGrow: 1, // Allow this div to grow and take available space
                    maxWidth: '75%' // But limit its maximum width
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
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap', // Prevent wrapping
                      overflow: 'hidden',   // Hide overflow
                      textOverflow: 'ellipsis' // Add ellipsis if needed
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
          timeloom-eta.vercel.app
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