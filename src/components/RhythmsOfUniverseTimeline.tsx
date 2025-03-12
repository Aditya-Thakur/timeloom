// RhythmsOfUniverseTimeline.tsx
import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, X, Clock, Moon, Calendar,
  Wifi, Globe, Music, Activity, Heart, Star
} from 'lucide-react';
import { RhythmsOfUniverseTimelineProps } from './constants/types';

interface RhythmCycleInfo {
  completedCycles: number;
  nextCycleDate: Date;
  daysUntilNextCycle: number;
}

const RhythmsOfUniverseTimeline: React.FC<RhythmsOfUniverseTimelineProps & { dateOfBirth?: string }> = ({
  milestones,
  dateOfBirth
}) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('cards'); // Default to card view

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate cycle information based on DOB
  const calculateCycleInfo = (cycleString: string): RhythmCycleInfo | null => {
    if (!dateOfBirth) return null;

    const today = new Date();
    const dob = new Date(dateOfBirth);

    // Get the number of hours, days, months, or years from the cycle string
    let cycleInMilliseconds: number;

    if (cycleString === "Various" || cycleString === "Variable" || cycleString === "Daily to Generational" || cycleString === "Billions of years") {
      // Cannot calculate for vague cycles
      return null;
    }

    // Extract numeric value and unit from cycle string
    const match = cycleString.match(/(\d+\.?\d*)(?:\s+)?(hours?|days?|months?|years?)?/i);
    if (!match) return null;

    const value = parseFloat(match[1]);
    const unit = (match[2] || 'days').toLowerCase();

    // Convert unit to milliseconds
    const millisecondsInHour = 60 * 60 * 1000;
    const millisecondsInDay = 24 * millisecondsInHour;
    const millisecondsInMonth = 30.44 * millisecondsInDay; // Average month
    const millisecondsInYear = 365.25 * millisecondsInDay;

    switch (unit) {
      case 'hour':
      case 'hours':
        cycleInMilliseconds = value * millisecondsInHour;
        break;
      case 'day':
      case 'days':
        cycleInMilliseconds = value * millisecondsInDay;
        break;
      case 'month':
      case 'months':
        cycleInMilliseconds = value * millisecondsInMonth;
        break;
      case 'year':
      case 'years':
        cycleInMilliseconds = value * millisecondsInYear;
        break;
      default:
        // Default to days if unit is not specified
        cycleInMilliseconds = value * millisecondsInDay;
    }

    // Calculate age in milliseconds
    const ageInMilliseconds = today.getTime() - dob.getTime();

    // Calculate number of completed cycles
    const completedCycles = Math.floor(ageInMilliseconds / cycleInMilliseconds);

    // Calculate next cycle date
    const nextCycleMilliseconds = dob.getTime() + ((completedCycles + 1) * cycleInMilliseconds);
    const nextCycleDate = new Date(nextCycleMilliseconds);

    // Calculate days until next cycle
    const daysUntilNextCycle = Math.ceil((nextCycleDate.getTime() - today.getTime()) / millisecondsInDay);

    return {
      completedCycles,
      nextCycleDate,
      daysUntilNextCycle
    };
  };

  const goToPrevious = () => {
    setVisibleIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setVisibleIndex(prev => Math.min(milestones.length - 1, prev + 1));
  };

  const openModal = (index: number) => {
    setSelectedMilestoneIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMilestoneIndex(null);
  };

  // Format a date to be more readable
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Color mapping for each rhythm type
  const getRhythmColors = (iconType: string) => {
    switch (iconType) {
      case 'daily':
        return { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', text: 'text-blue-700', tagBg: 'bg-blue-100', tagText: 'text-blue-600' };
      case 'monthly':
        return { bg: 'bg-indigo-50', border: 'border-indigo-200', iconBg: 'bg-indigo-100', text: 'text-indigo-700', tagBg: 'bg-indigo-100', tagText: 'text-indigo-600' };
      case 'yearly':
        return { bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-100', text: 'text-green-700', tagBg: 'bg-green-100', tagText: 'text-green-600' };
      case 'cosmic':
        return { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-100', text: 'text-purple-700', tagBg: 'bg-purple-100', tagText: 'text-purple-600' };
      case 'biological':
        return { bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-red-100', text: 'text-red-700', tagBg: 'bg-red-100', tagText: 'text-red-600' };
      case 'technological':
        return { bg: 'bg-cyan-50', border: 'border-cyan-200', iconBg: 'bg-cyan-100', text: 'text-cyan-700', tagBg: 'bg-cyan-100', tagText: 'text-cyan-600' };
      case 'social':
        return { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-100', text: 'text-amber-700', tagBg: 'bg-amber-100', tagText: 'text-amber-600' };
      case 'creative':
        return { bg: 'bg-pink-50', border: 'border-pink-200', iconBg: 'bg-pink-100', text: 'text-pink-700', tagBg: 'bg-pink-100', tagText: 'text-pink-600' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', iconBg: 'bg-gray-100', text: 'text-gray-700', tagBg: 'bg-gray-100', tagText: 'text-gray-600' };
    }
  };

  // Get icon based on milestone type
  const getMilestoneIcon = (iconType: string, size: number = 24) => {
    switch (iconType) {
      case 'daily':
        return <Clock size={size} />;
      case 'monthly':
        return <Moon size={size} />;
      case 'yearly':
        return <Calendar size={size} />;
      case 'cosmic':
        return <Star size={size} />;
      case 'biological':
        return <Heart size={size} />;
      case 'technological':
        return <Wifi size={size} />;
      case 'social':
        return <Globe size={size} />;
      case 'creative':
        return <Music size={size} />;
      default:
        return <Activity size={size} />;
    }
  };

  // Modal component
  const RhythmModal = () => {
    if (selectedMilestoneIndex === null) return null;

    const milestone = milestones[selectedMilestoneIndex];
    const colors = getRhythmColors(milestone.iconType);
    const cycleInfo = calculateCycleInfo(milestone.cycle);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
          <div className="p-6">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${colors.text}`}>
                {milestone.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            {/* Rhythm icon */}
            <div className="flex justify-center my-4">
              <div className={`${colors.text} p-4 ${colors.iconBg} rounded-full`}>
                {getMilestoneIcon(milestone.iconType, 48)}
              </div>
            </div>

            {/* Milestone details */}
            <div className="mb-6">
              <p className="text-gray-600 mb-4">{milestone.description}</p>
              <p className={`text-md ${colors.text} font-medium mb-2`}>
                Cycle: {milestone.cycle}
              </p>

              {/* Cycle information - only shown if DOB is provided */}
              {cycleInfo && (
                <div className={`${colors.bg} p-4 rounded-lg my-4`}>
                  <h4 className={`font-medium ${colors.text} mb-3`}>Your Cycle Information</h4>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Completed Cycles:</span> {cycleInfo.completedCycles.toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Next Cycle Date:</span> {formatDate(cycleInfo.nextCycleDate)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Days Until Next Cycle:</span> {cycleInfo.daysUntilNextCycle}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {milestone.tags.map((tag, idx) => (
                  <span key={idx} className={`${colors.tagBg} ${colors.tagText} px-3 py-1 rounded-full text-sm`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Rhythm goals section */}
            <div className={`${colors.bg} p-4 rounded-lg`}>
              <h4 className={`font-medium ${colors.text} mb-3`}>Harmony Goals</h4>
              <ul className="space-y-2">
                {milestone.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className={`h-6 w-6 rounded-full ${colors.iconBg} ${colors.text} flex items-center justify-center mr-2 flex-shrink-0 mt-0.5`}>
                      <Star size={14} />
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

  // Card View Component
  const CardView = () => {
    // Show all items on desktop, show paginated items on mobile
    const itemsToShow = isMobile ? [milestones[visibleIndex]] : milestones;

    return (
      <div>
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPrevious}
              disabled={visibleIndex === 0}
              className={`p-1 rounded-full ${visibleIndex === 0 ? 'text-gray-300' : 'text-purple-600 hover:bg-purple-100'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-sm text-purple-600">{visibleIndex + 1} of {milestones.length}</div>
            <button
              onClick={goToNext}
              disabled={visibleIndex === milestones.length - 1}
              className={`p-1 rounded-full ${visibleIndex === milestones.length - 1 ? 'text-gray-300' : 'text-purple-600 hover:bg-purple-100'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {itemsToShow.map((milestone, index) => {
            const colors = getRhythmColors(milestone.iconType);
            const cycleInfo = calculateCycleInfo(milestone.cycle);

            return (
              <div
                key={milestone.id}
                className={`p-4 rounded-lg border ${colors.border} ${colors.bg} hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => openModal(isMobile ? visibleIndex : index)}
              >
                <div className="flex items-center mb-2">
                  <div className={`p-2 rounded-full ${colors.iconBg} ${colors.text} mr-2`}>
                    {getMilestoneIcon(milestone.iconType)}
                  </div>
                  <h4 className={`font-medium ${colors.text}`}>{milestone.title}</h4>
                </div>
                <p className={`text-sm ${colors.text} mb-2`}>{milestone.cycle}</p>

                {/* Add cycle information to card if available */}
                {cycleInfo && (
                  <div className="mb-3">
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {cycleInfo.completedCycles.toLocaleString()} cycles completed
                    </p>
                    <p className="text-xs text-gray-500">
                      Next: {formatDate(cycleInfo.nextCycleDate)}
                    </p>
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-3">{milestone.description.substring(0, 80)}
                  {milestone.description.length > 80 ? '...' : ''}
                </p>

                <div className="flex flex-wrap gap-1 mt-1">
                  {milestone.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className={`${colors.tagBg} ${colors.tagText} px-2 py-0.5 rounded-full text-xs`}>
                      {tag}
                    </span>
                  ))}
                  {milestone.tags.length > 2 && (
                    <span className={`${colors.text} text-xs`}>+{milestone.tags.length - 2}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {isMobile && (
          <div className="flex justify-center mt-4 gap-1">
            {milestones.map((_, index) => (
              <button
                key={index}
                onClick={() => setVisibleIndex(index)}
                className={`w-2 h-2 rounded-full ${index === visibleIndex ? 'bg-purple-600' : 'bg-gray-300'}`}
                aria-label={`Go to rhythm ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Timeline View
  const TimelineView = () => {
    if (isMobile) {
      const currentMilestone = milestones[visibleIndex];
      const colors = getRhythmColors(currentMilestone.iconType);
      const cycleInfo = calculateCycleInfo(currentMilestone.cycle);

      return (
        <div>
          <div className="relative px-8">
            {/* Timeline Line */}
            <div className="absolute top-24 left-10 right-10 h-1 bg-purple-200 z-0"></div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              disabled={visibleIndex === 0}
              className={`absolute left-0 top-20 p-1 rounded-full ${visibleIndex === 0 ? 'text-gray-300' : 'text-purple-600 hover:bg-purple-100'}`}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              disabled={visibleIndex === milestones.length - 1}
              className={`absolute right-0 top-20 p-1 rounded-full ${visibleIndex === milestones.length - 1 ? 'text-gray-300' : 'text-purple-600 hover:bg-purple-100'}`}
            >
              <ChevronRight size={24} />
            </button>

            {/* Current Milestone */}
            <div className="flex justify-center items-start relative z-10">
              <div className="flex flex-col items-center">
                {/* Clickable Rhythm Icon */}
                <button
                  onClick={() => openModal(visibleIndex)}
                  className={`mb-2 rounded-full p-3 ${colors.iconBg} hover:bg-opacity-80 ${colors.text} transition-colors`}
                  aria-label={`View details for ${currentMilestone.title}`}
                >
                  {getMilestoneIcon(currentMilestone.iconType, 32)}
                </button>

                {/* Milestone Point */}
                <div className={`w-4 h-4 rounded-full mb-1 ${colors.text.replace('text', 'bg')}`}></div>

                {/* Title and Cycle Count */}
                <div className={`text-lg font-bold ${colors.text}`}>
                  {currentMilestone.title}
                </div>

                {cycleInfo && (
                  <div className="text-center mt-1">
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {cycleInfo.completedCycles.toLocaleString()} cycles
                    </p>
                    <p className="text-xs text-gray-500">
                      Next: {formatDate(cycleInfo.nextCycleDate)}
                    </p>
                  </div>
                )}

                {/* Description & Tags */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">{currentMilestone.cycle}</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {currentMilestone.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className={`${colors.tagBg} ${colors.tagText} px-2 py-0.5 rounded-full text-xs`}>
                        {tag}
                      </span>
                    ))}
                    {currentMilestone.tags.length > 2 && (
                      <span className={`${colors.text} text-xs`}>+{currentMilestone.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center mt-6 gap-1">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setVisibleIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === visibleIndex ? colors.text.replace('text', 'bg') : 'bg-gray-300'}`}
                  aria-label={`Go to rhythm ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Desktop view (full timeline)
    return (
      <div className="relative p-4 overflow-x-auto">
        {/* Timeline Container with horizontal scrolling */}
        <div className="min-w-max">
          {/* Timeline Line */}
          <div className="absolute top-24 left-16 right-16 h-1 bg-purple-200 z-0"></div>

          {/* Timeline Items */}
          <div className="flex justify-between items-start relative z-10" style={{ minWidth: `${milestones.length * 150}px` }}>
            {milestones.map((milestone, index) => {
              const colors = getRhythmColors(milestone.iconType);
              const cycleInfo = calculateCycleInfo(milestone.cycle);

              return (
                <div key={milestone.id} className="flex flex-col items-center mx-4" style={{ minWidth: "140px" }}>
                  {/* Clickable Rhythm Icon */}
                  <button
                    onClick={() => openModal(index)}
                    className={`mb-2 rounded-full p-3 ${colors.iconBg} hover:bg-opacity-80 ${colors.text} transition-colors`}
                    aria-label={`View details for ${milestone.title}`}
                  >
                    {getMilestoneIcon(milestone.iconType, 28)}
                  </button>

                  {/* Milestone Point */}
                  <div className={`w-4 h-4 rounded-full mb-1 ${colors.text.replace('text', 'bg')}`}></div>

                  {/* Title */}
                  <div className={`text-md font-bold ${colors.text} text-center`}>
                    {milestone.title}
                  </div>

                  {/* Cycle Count */}
                  {cycleInfo && (
                    <div className="text-center mt-1">
                      <p className={`text-xs font-semibold ${colors.text}`}>
                        {cycleInfo.completedCycles.toLocaleString()} cycles
                      </p>
                      <p className="text-xs text-gray-500">
                        Next: {formatDate(cycleInfo.nextCycleDate).split(',')[0]}
                      </p>
                    </div>
                  )}

                  {/* Cycle & Tags */}
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">{milestone.cycle}</p>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {milestone.tags.slice(0, 1).map((tag, idx) => (
                        <span key={idx} className={`${colors.tagBg} ${colors.tagText} px-2 py-0.5 rounded-full text-xs whitespace-nowrap`}>
                          {tag}
                        </span>
                      ))}
                      {milestone.tags.length > 1 && (
                        <span className={`${colors.text} text-xs`}>+{milestone.tags.length - 1}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // View toggle buttons
  const ViewToggle = () => (
    <div className="flex justify-end mb-4">
      <div className="bg-gray-100 rounded-lg p-1 inline-flex">
        <button
          onClick={() => setViewMode('timeline')}
          className={`px-3 py-1 text-sm rounded-md ${viewMode === 'timeline'
            ? 'bg-purple-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'}`}
        >
          Timeline
        </button>
        <button
          onClick={() => setViewMode('cards')}
          className={`px-3 py-1 text-sm rounded-md ${viewMode === 'cards'
            ? 'bg-purple-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'}`}
        >
          Cards
        </button>
      </div>
    </div>
  );

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">2</span>
        Rhythms of the Universe
      </h3>

      {dateOfBirth ? (
        <>
          <ViewToggle />
          {viewMode === 'cards' ? <CardView /> : <TimelineView />}
        </>
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">Please enter your date of birth to see your personal rhythm information.</p>
        </div>
      )}

      {modalOpen && <RhythmModal />}
    </div>
  );
};

export default RhythmsOfUniverseTimeline;