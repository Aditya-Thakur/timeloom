// EasterEggModal.tsx
import React from 'react';
import { Sparkles } from 'lucide-react';

interface EasterEggModalProps {
  show: boolean;
  onClose: () => void;
}

const EasterEggModal: React.FC<EasterEggModalProps> = ({ show, onClose }) => {
  if (!show) return null;
  
  return (
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
          onClick={onClose}
          className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-200"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default EasterEggModal;
