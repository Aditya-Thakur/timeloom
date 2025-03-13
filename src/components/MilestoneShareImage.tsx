// MilestoneShareImage.tsx - Component for generating milestone share images
import { forwardRef, ForwardedRef } from 'react';
import { MilestonesData } from './constants/types';

interface MilestoneShareImageProps {
  milestones: MilestonesData;
}

const MilestoneShareImage = forwardRef<HTMLDivElement, MilestoneShareImageProps>(
  ({ milestones }, ref: ForwardedRef<HTMLDivElement>) => {
    // Simplified SVG icons instead of using LifeStageSVG component
    const renderLifeStageIcon = (index: number, isPast: boolean) => {
      const color = isPast ? '#4f46e5' : '#9ca3af';
      
      // Just use a simple circle for each stage
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="15" stroke={color} strokeWidth="2" fill="white" />
          <text x="20" y="25" textAnchor="middle" fill={color} fontWeight="bold" fontSize="16">
            {index + 1}
          </text>
        </svg>
      );
    };

    return (
      <div 
        ref={ref} 
        style={{ 
          width: '100%',
          maxWidth: '32rem',
          padding: '1.5rem',
          backgroundColor: '#eef2ff',
          borderRadius: '0.5rem',
          border: '2px solid #c7d2fe',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#1f2937'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              margin: '0 0 0.25rem 0',
              color: '#3730a3'
            }}>
              My Life Journey
            </h3>
            <p style={{ 
              margin: '0', 
              color: '#4f46e5'
            }}>
              I've lived <span style={{ fontWeight: 'bold' }}>{milestones.currentDays.toLocaleString()}</span> days
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '9999px', 
            padding: '0.5rem', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2"/>
              <path d="M20 12V20L25 25" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Milestone Journey Timeline */}
          <div style={{ position: 'relative', paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
            <div style={{ 
              position: 'absolute', 
              top: '2.5rem', 
              left: '0', 
              right: '0', 
              height: '0.25rem', 
              backgroundColor: '#a5b4fc', 
              zIndex: 0 
            }}></div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              position: 'relative', 
              zIndex: 1 
            }}>
              {milestones.momentsOfSignificance.slice(0, 5).map((milestone, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  width: '20%' 
                }}>
                  <div style={{ 
                    padding: '0.5rem', 
                    borderRadius: '9999px', 
                    marginBottom: '0.25rem', 
                    backgroundColor: milestone.isPast ? '#e0e7ff' : '#f3f4f6',
                    color: milestone.isPast ? '#4f46e5' : '#9ca3af' 
                  }}>
                    {renderLifeStageIcon(index, milestone.isPast)}
                  </div>
                  <div style={{ 
                    width: '0.75rem', 
                    height: '0.75rem', 
                    borderRadius: '9999px', 
                    marginBottom: '0.25rem',
                    backgroundColor: milestone.isPast ? '#6366f1' : '#d1d5db' 
                  }}></div>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 'bold', 
                    margin: '0',
                    color: milestone.isPast ? '#4f46e5' : '#9ca3af' 
                  }}>
                    {milestone.days.toLocaleString()}
                  </p>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    textAlign: 'center', 
                    margin: '0.25rem 0 0 0',
                    color: '#4b5563' 
                  }}>
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Achievements */}
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            marginTop: '1.5rem' 
          }}>
            <h4 style={{ 
              fontWeight: 'bold', 
              marginTop: '0', 
              marginBottom: '0.5rem',
              color: '#4338ca' 
            }}>
              Key Milestones
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '0.75rem' 
            }}>
              {milestones.momentsOfSignificance
                .filter(m => m.isPast)
                .slice(0, 4)
                .map((milestone, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ 
                      height: '1.5rem', 
                      width: '1.5rem', 
                      borderRadius: '9999px', 
                      backgroundColor: '#e0e7ff', 
                      color: '#4f46e5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                      {milestone.description}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Days Lived Badge */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            marginTop: '1.5rem',
            border: '1px solid #c7d2fe'
          }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#4338ca', margin: '0 0 0.25rem 0' }}>
                Earth Days Lived
              </p>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#312e81', margin: '0' }}>
                {milestones.currentDays.toLocaleString()} days
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#e0e7ff', 
              padding: '0.5rem', 
              borderRadius: '9999px', 
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
            }}>
              <div style={{ 
                backgroundColor: '#4f46e5', 
                color: 'white', 
                height: '2.5rem', 
                width: '2.5rem', 
                borderRadius: '9999px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                TL
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'right', 
          fontSize: '0.75rem', 
          color: '#6b7280' 
        }}>
          Generated with TimeLoom • timeloom.com
        </div>
      </div>
    );
  }
);

MilestoneShareImage.displayName = 'MilestoneShareImage';

export default MilestoneShareImage;