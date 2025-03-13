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
    );
  }
);

MilestoneShareImage.displayName = 'MilestoneShareImage';

export default MilestoneShareImage;