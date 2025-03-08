// TimeLoom.tsx
import React, { useState, useEffect } from 'react';
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
  const [isChangingDOB, setIsChangingDOB] = useState<boolean>(false);

  // Check for saved DOB on component mount
  useEffect(() => {
    const savedDOBs = localStorage.getItem('userDOBHistory');
    if (savedDOBs) {
      const parsedDOBs = JSON.parse(savedDOBs);
      if (parsedDOBs.length > 0) {
        // Auto-submit with the last saved DOB
        handleSubmit(parsedDOBs[parsedDOBs.length - 1]);
      }
    }
  }, []);

  // Handle form submission
  const handleSubmit = (dob: string): void => {
    setIsLoading(true);
    setIsChangingDOB(false);
    
    // Save DOB to local storage
    const savedDOBs = localStorage.getItem('userDOBHistory');
    const dobHistory = savedDOBs ? JSON.parse(savedDOBs) : [];
    
    // Add new DOB if it's different from the last one
    if (dobHistory.length === 0 || dobHistory[dobHistory.length - 1] !== dob) {
      dobHistory.push(dob);
      localStorage.setItem('userDOBHistory', JSON.stringify(dobHistory));
    }
    
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

  // Handle change DOB request
  const handleChangeDOB = (): void => {
    setIsChangingDOB(true);
    setMilestones(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center w-full">
      <Header />
      
      {(!milestones || isChangingDOB) && !isLoading && (
        <DateEntryForm 
          onSubmit={handleSubmit} 
          isChangingDOB={isChangingDOB}
        />
      )}
      
      {isLoading && (
        <LoadingScreen loadingFacts={LOADING_FACTS} />
      )}
      
      {milestones && !isLoading && !isChangingDOB && (
        <MilestonesDisplay 
          milestones={milestones} 
          onChangeDOB={handleChangeDOB}
        />
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