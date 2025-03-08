// LoadingScreen.tsx
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LoadingScreenProps {
  loadingFacts: string[];
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadingFacts }) => {
  const [loadingFact, setLoadingFact] = useState<string>(
    loadingFacts[Math.floor(Math.random() * loadingFacts.length)]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoadingFact(loadingFacts[Math.floor(Math.random() * loadingFacts.length)]);
    }, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, [loadingFacts]);

  return (
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
  );
};

export default LoadingScreen;
