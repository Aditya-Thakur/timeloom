// LifeStageSVG.tsx
import React from 'react';

interface LifeStageSVGProps {
  index: number;
  isPast: boolean;
  isModal?: boolean;
}

// Helper function to get the appropriate SVG based on the life stage
const LifeStageSVG: React.FC<LifeStageSVGProps> = ({ index, isPast, isModal = false }) => {
  const fillColor = isPast ? 'currentColor' : 'currentColor';
  const opacity = isPast ? '1' : '0.5';
  const size = isModal ? '64' : '40'; // Larger size for modal display

  // Early childhood (baby/toddler)
  if (index === 0) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="9" r="5" />
        <path d="M8 9h8" />
        <path d="M12 14v7" />
        <path d="M9 18h6" />
        <circle cx="10" cy="7" r="1" />
        <circle cx="14" cy="7" r="1" />
      </svg>
    );
  }
  // Child (elementary school)
  else if (index === 1) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="8" r="5" />
        <path d="M9 8h6" />
        <path d="M10 6h.01" />
        <path d="M14 6h.01" />
        <path d="M12 13v8" />
        <path d="M8 18h8" />
        <path d="M8 21h8" />
      </svg>
    );
  }
  // Teenager
  else if (index === 2) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="7" r="4" />
        <path d="M10 5h.01" />
        <path d="M14 5h.01" />
        <path d="M9 11c-.72 1.5-1 3-1 5 0 2 1 3 2 3" />
        <path d="M15 11c.72 1.5 1 3 1 5 0 2-1 3-2 3" />
        <path d="M12 14v4" />
        <path d="M9 22h6" />
      </svg>
    );
  }
  // Young adult
  else if (index === 3) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="6" r="4" />
        <path d="M10 4h.01" />
        <path d="M14 4h.01" />
        <path d="M12 10v8" />
        <path d="M8 14l4-1 4 1" />
        <path d="M9 22h6" />
      </svg>
    );
  }
  // Adult (career/family)
  else if (index === 4) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v10" />
        <path d="M8 16h8" />
        <path d="M7 20h10" />
        <path d="M7 12h10" />
      </svg>
    );
  }
  // Middle-aged
  else if (index === 5) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M10 3.5h.01" />
        <path d="M14 3.5h.01" />
        <path d="M12 8v9" />
        <path d="M9 12h6" />
        <path d="M17 21v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1" />
      </svg>
    );
  }
  // Older adult
  else if (index === 6) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v8" />
        <path d="M9 11h6" />
        <path d="M8 22l2-6" />
        <path d="M16 22l-2-6" />
      </svg>
    );
  }
  // Elderly/sage
  else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="5" r="3" />
        <path d="M10 3h.01" />
        <path d="M14 3h.01" />
        <path d="M12 8v7" />
        <path d="M9 12h6" />
        <path d="M8 22c0-4.4 3.6-8 8-8" />
        <path d="M17 16l2 3" />
      </svg>
    );
  }
};

export default LifeStageSVG;