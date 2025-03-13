// LifeJourneyTimeline.tsx (Refactored with Component Splitting)
import React, { useState, useEffect } from 'react';
import { Milestone } from './constants/types';
import MilestoneModal from './MilestoneModal';
import ReminderModal from './ReminderModal';
import MobileTimeline from './MobileTimeline';
import DesktopTimeline from './DesktopTimeline';

interface LifeJourneyTimelineProps {
  milestones: Milestone[];
  showClimateImpact?: boolean; // Optional prop to toggle climate impact display
}

const LifeJourneyTimeline: React.FC<LifeJourneyTimelineProps> = ({
  milestones,
  showClimateImpact = true // Default to showing climate impact
}) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number | null>(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  // Sort milestones by days (ascending)
  const sortedMilestones = [...milestones].sort((a, b) => a.days - b.days);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = (index: number) => {
    setSelectedMilestoneIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMilestoneIndex(null);
    // Reset reminder states when closing the main modal
    setReminderModalOpen(false);
  };

  // Open reminder modal
  const openReminderModal = () => {
    setReminderModalOpen(true);
  };

  // Close reminder modal
  const closeReminderModal = () => {
    setReminderModalOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <MobileTimeline
          sortedMilestones={sortedMilestones}
          visibleIndex={visibleIndex}
          setVisibleIndex={setVisibleIndex}
          openModal={openModal}
          showClimateImpact={showClimateImpact}
        />
      ) : (
        <DesktopTimeline
          sortedMilestones={sortedMilestones}
          openModal={openModal}
          showClimateImpact={showClimateImpact}
        />
      )}

      {/* Modals */}
      {modalOpen && selectedMilestoneIndex !== null && (
        <MilestoneModal
          milestone={sortedMilestones[selectedMilestoneIndex]}
          milestoneIndex={selectedMilestoneIndex}
          closeModal={closeModal}
          openReminderModal={openReminderModal}
          showClimateImpact={showClimateImpact}
        />
      )}
      
      {reminderModalOpen && selectedMilestoneIndex !== null && (
        <ReminderModal
          milestone={sortedMilestones[selectedMilestoneIndex]}
          closeReminderModal={closeReminderModal}
        />
      )}
    </>
  );
};

export default LifeJourneyTimeline;