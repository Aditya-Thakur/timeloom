// MilestoneShareImage.tsx - Component for generating milestone share images
import { forwardRef, ForwardedRef } from 'react';
import { MilestonesData } from './constants/types';
import LifeStageSVG from './LifeStageSVG';

interface MilestoneShareImageProps {
  milestones: MilestonesData;
}

const MilestoneShareImage = forwardRef<HTMLDivElement, MilestoneShareImageProps>(
  ({ milestones }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div 
        ref={ref} 
        className="w-full max-w-lg p-6 rounded-lg border-2 shadow-lg"
        style={{ 
          background: 'linear-gradient(to bottom right, #eef2ff, #f5f3ff)',
          borderColor: '#c7d2fe'
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold" style={{ color: '#3730a3' }}>My Life Journey</h3>
            <p style={{ color: '#4f46e5' }}>
              I've lived <span className="font-bold">{milestones.currentDays.toLocaleString()}</span> days
            </p>
          </div>
          <div className="bg-white rounded-full p-2 shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2"/>
              <path d="M20 12V20L25 25" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Milestone Journey Timeline */}
          <div className="relative pt-6 pb-2">
            <div className="absolute top-10 left-0 right-0 h-1 z-0" style={{ backgroundColor: '#a5b4fc' }}></div>
            
            <div className="flex justify-between items-start relative z-10">
              {milestones.momentsOfSignificance.slice(0, 5).map((milestone, index) => (
                <div key={index} className="flex flex-col items-center" style={{width: '20%'}}>
                  <div className="p-2 rounded-full mb-1" style={{ 
                    backgroundColor: milestone.isPast ? '#e0e7ff' : '#f3f4f6', 
                    color: milestone.isPast ? '#4f46e5' : '#9ca3af' 
                  }}>
                    <LifeStageSVG index={index} isPast={milestone.isPast} />
                  </div>
                  <div className="w-3 h-3 rounded-full mb-1" style={{ 
                    backgroundColor: milestone.isPast ? '#6366f1' : '#d1d5db' 
                  }}></div>
                  <p className="text-sm font-bold" style={{ 
                    color: milestone.isPast ? '#4f46e5' : '#9ca3af' 
                  }}>
                    {milestone.days.toLocaleString()}
                  </p>
                  <p className="text-xs text-center mt-1" style={{ color: '#4b5563' }}>
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Achievements */}
          <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <h4 className="font-bold mb-2" style={{ color: '#4338ca' }}>Key Milestones</h4>
            <div className="grid grid-cols-2 gap-3">
              {milestones.momentsOfSignificance
                .filter(m => m.isPast)
                .slice(0, 4)
                .map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                      backgroundColor: '#e0e7ff', 
                      color: '#4f46e5' 
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm" style={{ color: '#374151' }}>{milestone.description}</span>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Days Lived Badge - With better contrast and focus on days */}
          <div className="flex justify-between items-center rounded-lg p-4" style={{ 
            backgroundColor: 'white', 
            border: '1px solid #c7d2fe' 
          }}>
            <div>
              <p className="text-sm" style={{ color: '#4338ca' }}>Earth Days Lived</p>
              <p className="text-xl font-bold" style={{ color: '#312e81' }}>{milestones.currentDays.toLocaleString()} days</p>
            </div>
            <div style={{ backgroundColor: '#e0e7ff', padding: '0.5rem', borderRadius: '9999px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ 
                backgroundColor: '#4f46e5', 
                color: 'white', 
                height: '2.5rem', 
                width: '2.5rem', 
                borderRadius: '9999px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span className="text-sm font-bold">TL</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-right text-xs" style={{ color: '#6b7280' }}>
          Generated with TimeLoom • timeloom.com
        </div>
      </div>
    );
  }
);

MilestoneShareImage.displayName = 'MilestoneShareImage';

export default MilestoneShareImage;