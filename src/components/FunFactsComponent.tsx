import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, Loader2, ExternalLink } from 'lucide-react';

interface FunFactsProps {
  dateOfBirth: string; // Format: "YYYY-MM-DD"
  milestoneDays: number[]; // Array of milestone days [1000, 10000, etc]
}

interface MilestoneFact {
  day: number;
  date: string;
  fact: string;
  source: string;
  link: string;
  loading: boolean;
  error: boolean;
}

const FunFactsComponent: React.FC<FunFactsProps> = ({ dateOfBirth, milestoneDays }) => {
  const [milestoneFacts, setMilestoneFacts] = useState<MilestoneFact[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Calculate the date for X days after birth
  const calculateMilestoneDate = useCallback((daysAfterBirth: number): string => {
    const birthDate = new Date(dateOfBirth);
    const milestoneDate = new Date(birthDate);
    milestoneDate.setDate(birthDate.getDate() + daysAfterBirth);
    return milestoneDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  }, [dateOfBirth]);

  // Check if the fact contains positive keywords
  const isPositiveFact = useCallback((factText: string): boolean => {
    const positiveKeywords = ['discovered', 'invented', 'created', 'founded', 'established', 
      'opened', 'won', 'launched', 'released', 'began', 'started', 'celebrated', 'achieved', 
      'honored', 'inaugurated', 'graduated', 'accomplished', 'breakthrough', 'milestone'];
    
    return positiveKeywords.some(keyword => 
      factText.toLowerCase().includes(keyword)
    );
  }, []);

  // Fetch fun fact using a combination of APIs to get the best result
  const fetchFunFact = useCallback(async (date: string, day: number, index: number) => {
    try {
      // Format date components for API calls
      const currDate = new Date(date)
      const [year, month, dayOfMonth] = [currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate()];
      
      // Try to get a fact from Numbers API first (month/day format, not year)
      const response = await fetch(`http://numbersapi.com/${month}/${dayOfMonth}/date`);
      
      if (response.ok) {
        const fact = await response.text();
        
        // Check if it's a positive fact, if not try other APIs
        if (isPositiveFact(fact)) {
          // Set the fact in our state
          setMilestoneFacts(prev => {
            const newFacts = [...prev];
            newFacts[index] = {
              ...newFacts[index],
              fact: fact,
              source: "Numbers API",
              link: `https://www.google.com/search?q=${encodeURIComponent(fact)}`,
              loading: false,
              error: false
            };
            return newFacts;
          });
          return;
        }
      }
      
      // Fallback: Try Today In History API
      const historyResponse = await fetch(`https://history.muffinlabs.com/date/${month}/${dayOfMonth}`);
      
      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        
        if (historyData.data.Events && historyData.data.Events.length > 0) {
          let events = historyData.data.Events;
          
          // Filter for positive events
          let positiveEvents = events.filter(event => 
            isPositiveFact(event.text)
          );
          
          // Use positive events if we found any, otherwise use all events
          const filteredEvents = positiveEvents.length > 0 ? positiveEvents : events;
          
          // Try to find an event from the specific year if possible
          const eventFromYear = filteredEvents.find(event => event.year === year);
          
          // If no event from the exact year, get a random one
          const event = eventFromYear || filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
          
          setMilestoneFacts(prev => {
            const newFacts = [...prev];
            newFacts[index] = {
              ...newFacts[index],
              fact: event.text,
              source: "History API",
              link: `https://en.wikipedia.org/wiki/${event.year}`,
              loading: false,
              error: false
            };
            return newFacts;
          });
          return;
        }
      }
      
      // Final fallback: Wikipedia API
      const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${parseInt(month, 10)}/${parseInt(dayOfMonth, 10)}`);
      
      if (wikiResponse.ok) {
        const wikiData = await wikiResponse.json();
        
        if (wikiData.events && wikiData.events.length > 0) {
          // Filter for positive events if possible
          let events = wikiData.events;
          let positiveEvents = events.filter(event => isPositiveFact(event.text));
          
          // Use positive events if we found any, otherwise use all events
          const filteredEvents = positiveEvents.length > 0 ? positiveEvents : events;
          
          // Try to find events closer to the target year
          const sortedEvents = [...filteredEvents].sort((a, b) => {
            return Math.abs(parseInt(a.year) - parseInt(year)) - Math.abs(parseInt(b.year) - parseInt(year));
          });
          
          const event = sortedEvents[0]; // Get the closest match by year
          
          setMilestoneFacts(prev => {
            const newFacts = [...prev];
            newFacts[index] = {
              ...newFacts[index],
              fact: event.text,
              source: "Wikipedia",
              link: event.pages && event.pages[0] ? event.pages[0].content_urls.desktop.page : `https://en.wikipedia.org/wiki/${event.year}`,
              loading: false,
              error: false
            };
            return newFacts;
          });
          return;
        }
      }
      
      throw new Error('No suitable facts found');
      
    } catch (error) {
      console.error(`Error fetching fun fact for ${date}:`, error);
      setMilestoneFacts(prev => {
        const newFacts = [...prev];
        newFacts[index] = {
          ...newFacts[index],
          fact: "Could not find a historical fact for this exact date.",
          source: "",
          link: "",
          loading: false,
          error: true
        };
        return newFacts;
      });
    }
  }, [isPositiveFact]);

  // Initialize milestone facts only once
  useEffect(() => {
    if (!isInitialized) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      
      // Initialize facts array with loading state
      const initialFacts: MilestoneFact[] = [
        {
          day: 0,
          date: dateOfBirth,
          fact: "",
          source: "",
          link: "",
          loading: true,
          error: false
        },
        ...milestoneDays.map(day => ({
          day,
          date: calculateMilestoneDate(day),
          fact: "",
          source: "",
          link: "",
          loading: true,
          error: false
        }))
      ];
      
      // Filter out future dates
      const pastFacts = initialFacts.filter(fact => {
        const factDate = new Date(fact.date);
        return factDate <= today;
      });
      
      setMilestoneFacts(pastFacts);
      setIsInitialized(true);
    }
  }, [dateOfBirth, milestoneDays, calculateMilestoneDate, isInitialized]);

  // Separate useEffect for fetching the facts to prevent loops
  useEffect(() => {
    if (isInitialized && milestoneFacts.length > 0) {
      // Only fetch facts that are still loading
      milestoneFacts.forEach((fact, index) => {
        if (fact.loading) {
          fetchFunFact(fact.date, fact.day, index);
        }
      });
    }
  }, [isInitialized, fetchFunFact, milestoneFacts]);

  if (milestoneFacts.length === 0) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-2">Fun Facts</h3>
        <p className="text-gray-700">No milestone dates in the past to show facts for.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-xl font-semibold mb-2">Fun Facts From Your Timeline</h3>
      
      <div className="space-y-4 mt-3">
        {milestoneFacts.map((fact, index) => (
          <div key={index} className="bg-white p-3 rounded-md shadow-sm">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div className="w-full">
                <h4 className="font-medium text-indigo-700">
                  {fact.day === 0 
                    ? "On your birthday" 
                    : `On your ${fact.day.toLocaleString()}${getDaySuffix(fact.day)} day`}
                  <span className="text-gray-500 text-sm ml-2">
                    ({new Date(fact.date).toLocaleDateString()})
                  </span>
                </h4>
                
                {fact.loading ? (
                  <div className="flex items-center text-gray-500 mt-1">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading historical fact...
                  </div>
                ) : fact.error ? (
                  <p className="text-gray-500 mt-1">Could not load a historical fact for this date.</p>
                ) : (
                  <div>
                    <p className="text-gray-700 mt-1">
                      {fact.fact}
                    </p>
                    {fact.link && (
                      <div className="mt-2 text-right">
                        <a 
                          href={fact.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          Read more
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get the suffix for a day number (1st, 2nd, 3rd, etc.)
const getDaySuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export default FunFactsComponent;