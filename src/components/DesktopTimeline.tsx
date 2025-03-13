// DesktopTimeline.tsx
import React from 'react';
import { Thermometer } from 'lucide-react';
import { Milestone } from './constants/types';
import LifeStageSVG from './LifeStageSVG';
import ClimateImpactOverlay from './climate/ClimateImpactOverlay';
import { getYearFromDateString, createClickableIconButton } from './utils/TimelineUtils';

interface DesktopTimelineProps {
  sortedMilestones: Milestone[];
  openModal: (index: number) => void;
  showClimateImpact?: boolean;
}

const DesktopTimeline: React.FC<DesktopTimelineProps> = ({
  sortedMilestones,
  openModal,
  showClimateImpact = true
}) => {
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
                  {/* Clickable Life Stage SVG with visual indicator */}
                  {createClickableIconButton(
                    <LifeStageSVG index={index} isPast={milestone.isPast} />,
                    () => openModal(index),
                    milestone.isPast,
                    `View details for ${milestone.description}`
                  )}

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
    </div>
  );
};

export default DesktopTimeline;