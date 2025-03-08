// TimeLoom.tsx
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import DateEntryForm from './DateEntryForm';
import LoadingScreen from './LoadingScreen';
import MilestonesDisplay from './MilestonesDisplay';
import EasterEggModal from './EasterEggModal';
import { calculateMilestones } from './MilestoneCalculator';
import { MilestonesData } from './types';
import { LOADING_FACTS } from './constants';

const TimeLoom: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<MilestonesData | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (dob: string): void => {
    setIsLoading(true);
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      const calculatedMilestones = calculateMilestones(dob);
      setMilestones(calculatedMilestones);
      setIsLoading(false);
      
      if (calculatedMilestones.hasSpecialMilestone) {
        setTimeout(() => {
          setShowEasterEgg(true);
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 5000);
        }, 1000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center w-full">
      <Header />
      
      {!milestones && !isLoading && (
      <DateEntryForm onSubmit={handleSubmit} />
      )}
      
      {isLoading && (
      <LoadingScreen loadingFacts={LOADING_FACTS} />
      )}
      
      {milestones && !isLoading && (
      <MilestonesDisplay milestones={milestones} />
      )}
      
      <EasterEggModal 
      show={showEasterEgg} 
      onClose={() => setShowEasterEgg(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default TimeLoom;
