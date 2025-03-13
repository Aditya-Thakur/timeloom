// timelineUtils.ts
// Utility functions for the LifeJourneyTimeline component

// Extract year from the date format (MM/DD/YYYY)
export const getYearFromDateString = (dateString: string): number => {
    if (dateString != "") {
      return new Date(dateString).getFullYear();
    }
    return new Date().getFullYear(); // Default to current year if parsing fails
  };
  
  // Create clickable icon button with plus indicator
  export const createClickableIconButton = (
    icon: React.ReactNode, 
    onClick: () => void, 
    isPast: boolean, 
    ariaLabel: string,
    isDesktop: boolean = true // Different styling for desktop vs mobile
  ) => {
    return (
      <button
        onClick={onClick}
        className={`
          ${isDesktop ? 'mb-2 rounded-full bg-teal-50 hover:bg-teal-100 p-2' : 'mb-2 rounded-full bg-teal-50 hover:bg-teal-100 p-3'} 
          transition-all transform hover:scale-105 shadow-sm hover:shadow border border-teal-100 
          active:translate-y-0.5 ${isPast ? 'text-teal-600' : 'text-gray-400'}
        `}
        aria-label={ariaLabel}
      >
        <div className="relative">
          {icon}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
        </div>
        <span className="sr-only">Click to view details</span>
      </button>
    );
  };