import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Share2, Sparkles } from 'lucide-react';

// Define TypeScript interfaces for our data structures
interface Milestone {
  id: string;
  days: number;
  date: string;
  isPast: boolean;
  daysUntil?: number;
  description?: string;
}

interface MilestonesData {
  echoesOfTime: Milestone[];
  rhythmsOfUniverse: Milestone[];
  momentsOfSignificance: Milestone[];
  currentDays: number;
  hasSpecialMilestone: boolean;
}

const TimeLoom: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<MilestonesData | null>(null);
  const [loadingFact, setLoadingFact] = useState<string>('');
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);

  // Fun facts for loading screen
  const loadingFacts: string[] = [
    "A million seconds is about 11.5 days, while a billion seconds is about 31.7 years!",
    "The average human heart beats 2.5 billion times in a lifetime.",
    "If you're 30 years old, you've spent about 10 years sleeping.",
    "Your 10,000th day occurs when you're about 27.4 years old.",
    "Every second, about 4 babies are born worldwide."
  ];

  // Validate date of birth input
  const validateDate = (date: string): boolean => {
    if (!date) {
      setIsValid(false);
      setErrorMessage('Please enter a date');
      return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    
    if (selectedDate > today) {
      setIsValid(false);
      setErrorMessage('Date cannot be in the future');
      return false;
    }
    
    setIsValid(true);
    setErrorMessage('');
    return true;
  };

  // Calculate milestones based on date of birth
  const calculateMilestones = (dob: string): MilestonesData => {
    const birthDate = new Date(dob);
    const today = new Date();
    
    // Milestone types
    const echoesOfTime: Milestone[] = []; // 1,000s days
    const rhythmsOfUniverse: Milestone[] = []; // 1,111s days
    const momentsOfSignificance: Milestone[] = []; // Major life milestones
    
    // Calculate 1,000s of days
    for (let i = 1; i <= 40; i++) {
      const daysToAdd = i * 1000;
      const milestoneDate = new Date(birthDate);
      milestoneDate.setDate(birthDate.getDate() + daysToAdd);
      
      if (milestoneDate <= today) {
        echoesOfTime.push({
          id: `echo-${i}`,
          days: daysToAdd,
          date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          isPast: true
        });
      } else {
        echoesOfTime.push({
          id: `echo-${i}`,
          days: daysToAdd,
          date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          isPast: false,
          daysUntil: Math.ceil((milestoneDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        });
      }
    }
    
    // Calculate 1,111s of days
    for (let i = 1; i <= 9; i++) {
      const daysToAdd = i * 1111;
      const milestoneDate = new Date(birthDate);
      milestoneDate.setDate(birthDate.getDate() + daysToAdd);
      
      if (milestoneDate <= today) {
        rhythmsOfUniverse.push({
          id: `rhythm-${i}`,
          days: daysToAdd,
          date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          isPast: true
        });
      } else {
        rhythmsOfUniverse.push({
          id: `rhythm-${i}`,
          days: daysToAdd,
          date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          isPast: false,
          daysUntil: Math.ceil((milestoneDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        });
      }
    }
    
    // Calculate significant moments
    const significantDays = [
      { days: 365, description: "First Year" },
      { days: 3652, description: "10 Years" },
      { days: 7305, description: "20 Years" },
      { days: 10957, description: "30 Years" },
      { days: 14610, description: "40 Years" },
      { days: 18262, description: "50 Years" },
      { days: 21915, description: "60 Years" },
      { days: 25567, description: "70 Years" },
      { days: 29220, description: "80 Years" },
      { days: 32872, description: "90 Years" },
      { days: 36525, description: "100 Years" }
    ];
    
    significantDays.forEach((milestone, index) => {
      const milestoneDate = new Date(birthDate);
      milestoneDate.setDate(birthDate.getDate() + milestone.days);
      
      if (milestoneDate <= today) {
        momentsOfSignificance.push({
          id: `significant-${index}`,
          days: milestone.days,
          description: milestone.description,
          date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          isPast: true
        });
      } else {
        momentsOfSignificance.push({
          id: `significant-${index}`,
          days: milestone.days,
          description: milestone.description,
          date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          isPast: false,
          daysUntil: Math.ceil((milestoneDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        });
      }
    });
    
    // Check for Easter Eggs
    const ageInDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const hasSpecialMilestone = [12345, 23456, 42000, 10101, 20202].includes(ageInDays);
    
    return {
      echoesOfTime,
      rhythmsOfUniverse,
      momentsOfSignificance,
      currentDays: ageInDays,
      hasSpecialMilestone
    };
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateDate(dateOfBirth)) {
      setIsLoading(true);
      setLoadingFact(loadingFacts[Math.floor(Math.random() * loadingFacts.length)]);
      
      // Simulate calculation time for better UX
      setTimeout(() => {
        const calculatedMilestones = calculateMilestones(dateOfBirth);
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
    }
  };

  // Generate shareable image (simulated)
  const generateShareableImage = (): void => {
    alert("Image generated! In a real implementation, this would create a downloadable image of your milestones.");
  };

  // Rotate through loading facts
  useEffect(() => {
    let interval: number | undefined;
    
    if (isLoading) {
      interval = window.setInterval(() => {
        setLoadingFact(loadingFacts[Math.floor(Math.random() * loadingFacts.length)]);
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-indigo-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">TimeLoom</h1>
        <p className="text-indigo-100">Discover the rhythm of your life's journey</p>
      </header>
      
      {!milestones && !isLoading && (
        <div className="max-w-md w-full mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <Calendar className="h-12 w-12 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Begin Your Timeline Journey</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="dob">
                When were you born?
              </label>
              <input
                type="date"
                id="dob"
                className={`w-full p-3 border rounded-lg ${!isValid ? 'border-red-500' : 'border-gray-300'}`}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
              {!isValid && (
                <p className="text-red-500 mt-1">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Discover My Milestones
            </button>
          </form>
        </div>
      )}
      
      {isLoading && (
        <div className="max-w-md w-full mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="flex justify-center mb-6">
            <Clock className="h-12 w-12 text-indigo-500 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Weaving Your Timeline...</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse w-full"></div>
          </div>
          <p className="text-gray-600 italic">{loadingFact}</p>
        </div>
      )}
      
      {milestones && !isLoading && (
        <div className="max-w-4xl w-full mx-auto my-8 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Life in Numbers</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={generateShareableImage} 
                  className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              You have lived <span className="font-bold text-indigo-600">{milestones.currentDays.toLocaleString()}</span> days so far.
            </p>
            
            {/* Echoes of Time Section */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2">1</span>
                Echoes of Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {milestones.echoesOfTime.slice(0, 9).map(milestone => (
                  <div 
                    key={milestone.id}
                    className={`p-4 rounded-lg border ${milestone.isPast ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <p className="text-3xl font-bold text-indigo-600">{milestone.days.toLocaleString()}</p>
                    <p className="text-gray-600">days</p>
                    <p className={`text-sm mt-2 ${milestone.isPast ? 'text-indigo-700' : 'text-gray-600'}`}>
                      {milestone.date}
                    </p>
                    {!milestone.isPast && milestone.daysUntil && (
                      <p className="text-xs text-gray-500 mt-1">
                        {milestone.daysUntil.toLocaleString()} days from now
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rhythms of the Universe Section */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">2</span>
                Rhythms of the Universe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {milestones.rhythmsOfUniverse.map(milestone => (
                  <div 
                    key={milestone.id}
                    className={`p-4 rounded-lg border ${milestone.isPast ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <p className="text-3xl font-bold text-purple-600">{milestone.days.toLocaleString()}</p>
                    <p className="text-gray-600">days</p>
                    <p className={`text-sm mt-2 ${milestone.isPast ? 'text-purple-700' : 'text-gray-600'}`}>
                      {milestone.date}
                    </p>
                    {!milestone.isPast && milestone.daysUntil && (
                      <p className="text-xs text-gray-500 mt-1">
                        {milestone.daysUntil.toLocaleString()} days from now
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Moments of Significance Section */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-2">3</span>
                Moments of Significance
              </h3>
              <div className="space-y-4">
                {milestones.momentsOfSignificance.map(milestone => (
                  <div 
                    key={milestone.id}
                    className={`p-4 rounded-lg border flex justify-between items-center ${milestone.isPast ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div>
                      <p className="font-bold text-lg">{milestone.description}</p>
                      <p className={`text-sm ${milestone.isPast ? 'text-teal-700' : 'text-gray-600'}`}>
                        {milestone.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-600">{milestone.days.toLocaleString()}</p>
                      <p className="text-gray-600">days</p>
                      {!milestone.isPast && milestone.daysUntil && (
                        <p className="text-xs text-gray-500">
                          {milestone.daysUntil.toLocaleString()} days from now
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fun Facts Section */}
            <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold mb-2">Fun Facts</h3>
              <p className="text-gray-700">
                On your 10,000th day, the top song was likely playing on the radio, 
                and a gallon of gas cost around $3.50. The world was a different place!
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-bounce">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Cosmic Coincidence Discovered!</h2>
            <p className="text-gray-700 mb-6">
              You've reached a rare numerical milestone! The universe is celebrating with you today.
            </p>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-200"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
      
      <footer className="w-full bg-gray-800 text-white p-4 text-center mt-auto">
        <p>©2025 TimeLoom - Weaving the fabric of your timeline</p>
      </footer>
    </div>
  );
};

export default TimeLoom;