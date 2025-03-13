// MobileTimeline.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, Thermometer } from 'lucide-react';
import { Milestone } from './constants/types';
import LifeStageSVG from './LifeStageSVG';
import ClimateImpactOverlay from './climate/ClimateImpactOverlay';
import { getYearFromDateString, createClickableIconButton } from './utils/TimelineUtils';

interface MobileTimelineProps {
  sortedMilestones: Milestone[];
  visibleIndex: number;
  setVisibleIndex: (index: number) => void;
  openModal: (index: number) => void;
  showClimateImpact?: boolean;
}

const MobileTimeline: React.FC<MobileTimelineProps> = ({
  sortedMilestones,
  visibleIndex,
  setVisibleIndex,
  openModal,
  showClimateImpact = true
}) => {
  const currentMilestone = sortedMilestones[visibleIndex];
  const year = getYearFromDateString(currentMilestone.date);

  const goToPrevious = () => {
    setVisibleIndex(Math.max(0, visibleIndex - 1));
  };

  const goToNext = () => {
    setVisibleIndex(Math.min(sortedMilestones.length - 1, visibleIndex + 1));
  };

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
            {/* Clickable Life Stage SVG with visual indicator */}
            {createClickableIconButton(
              <LifeStageSVG index={visibleIndex} isPast={currentMilestone.isPast} />,
              () => openModal(visibleIndex),
              currentMilestone.isPast,
              `View details for ${currentMilestone.description}`,
              false // mobile styling
            )}

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
    </div>
  );
};

export default MobileTimeline;