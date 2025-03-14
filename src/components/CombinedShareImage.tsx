// CombinedShareImage.tsx
import { forwardRef, ForwardedRef, useState, useEffect } from 'react';
import { MilestonesData } from './constants/types';
import { calculateLifeStatistics } from './utils/lifeStatistics';
import { getClimateDataForYear } from './constants/climateData';
import { LifeStageBadge } from './shareComponents/LifeStageBadge';
import { LifeProgressBar } from './shareComponents/LifeProgressBar';
import { LifeStatistics } from './shareComponents/LifeStatistics';
import { WorldEvents } from './shareComponents/WorldEvents';
import { ClimateSnapshot } from './shareComponents/ClimateSnapshot';
import { MotivationalQuote } from './shareComponents/MotivationalQuote';

interface CombinedShareImageProps {
  milestones: MilestonesData;
  dateOfBirth: string;
}

const CombinedShareImage = forwardRef<HTMLDivElement, CombinedShareImageProps>(
  ({ milestones, dateOfBirth }, ref: ForwardedRef<HTMLDivElement>) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const birthDate = new Date(dateOfBirth);
    const birthYear = birthDate.getFullYear();
    const currentYear = new Date().getFullYear();
    
    // Calculate statistics for the user's life
    const lifeStats = calculateLifeStatistics(milestones.currentDays);
    
    // Get climate data for visualization
    const birthClimateData = getClimateDataForYear(birthYear);
    const currentClimateData = getClimateDataForYear(currentYear);
    
    // Determine next upcoming milestone
    const upcomingMilestone = milestones.momentsOfSignificance
      .filter(m => !m.isPast)
      .sort((a, b) => a.daysUntil! - b.daysUntil!)[0];

    useEffect(() => {
      const fetchUnsplashImage = async () => {
        try {
          const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
          if (!accessKey) {
            console.error("Unsplash API key not found");
            return;
          }

          // Fetch a curated image that works well with overlay text
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=cosmos,starry,gradient&orientation=portrait&client_id=${accessKey}`
          );

          if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
          }

          const data = await response.json();
          setBackgroundImage(data.urls.regular);
        } catch (error) {
          console.error("Error fetching Unsplash image:", error);
        }
      };

      fetchUnsplashImage();
    }, []);

    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '900px',
          boxSizing: 'border-box',
          padding: '24px',
          backgroundColor: '#1a1a2e', // Dark blue fallback
          backgroundImage: backgroundImage
            ? `linear-gradient(to bottom, rgba(26, 26, 46, 0.85), rgba(40, 40, 80, 0.9)), url(${backgroundImage})`
            : 'linear-gradient(to bottom, #1a1a2e, #16213e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          border: '2px solid #30305a',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial, sans-serif',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header - Title and Days Count with Visual Flair */}
        <div style={{
          textAlign: 'center',
          marginBottom: '16px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.7), rgba(81, 45, 168, 0.4))',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '4px',
            color: '#b19cd9'
          }}>
            Life Journey
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '0 0 6px 0',
            color: '#fff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            {milestones.currentDays.toLocaleString()}
          </h2>
          <p style={{
            fontSize: '16px',
            margin: '0',
            color: '#e0e0fa',
          }}>
            days on Earth and counting
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto auto auto',
          gap: '16px',
          flexGrow: 1
        }}>
          {/* Achievement Badges Section - Spans both columns */}
          <div style={{
            gridColumn: '1 / span 2',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '12px',
            background: 'linear-gradient(to right, rgba(66, 39, 90, 0.7), rgba(115, 75, 109, 0.7))',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
          }}>
            {/* Render 3 achievement badges based on past milestones */}
            {milestones.momentsOfSignificance
              .filter(m => m.isPast)
              .slice(0, 3)
              .map((milestone, index) => (
                <LifeStageBadge
                  key={index}
                  milestone={milestone}
                  index={index}
                />
              ))}
          </div>

          {/* Left Column - Life Statistics */}
          <div style={{
            gridColumn: '1',
            gridRow: '2',
            backgroundColor: 'rgba(30, 30, 60, 0.8)',
            padding: '14px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <LifeStatistics statistics={lifeStats} />
          </div>

          {/* Right Column - Motivational Quote */}
          <div style={{
            gridColumn: '2',
            gridRow: '2',
            background: 'linear-gradient(135deg, rgba(70, 30, 108, 0.7), rgba(116, 55, 148, 0.4))',
            padding: '14px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <MotivationalQuote 
              dayCount={milestones.currentDays}
              isPastHalfCentury={milestones.currentDays > 18250} // Over 50 years
            />
          </div>

          {/* World Events - Spans both columns */}
          <div style={{
            gridColumn: '1 / span 2',
            gridRow: '3',
            backgroundColor: 'rgba(40, 40, 70, 0.8)',
            padding: '14px',
            borderRadius: '10px'
          }}>
            <WorldEvents 
              birthYear={birthYear} 
              currentYear={currentYear}
            />
          </div>

          {/* Climate Impact Comparison - Spans both columns */}
          <div style={{
            gridColumn: '1 / span 2',
            gridRow: '4',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(30, 30, 60, 0.8)',
            padding: '14px',
            borderRadius: '10px'
          }}>
            <ClimateSnapshot 
              birthClimateData={birthClimateData}
              currentClimateData={currentClimateData}
              birthYear={birthYear}
              currentYear={currentYear}
            />
          </div>
        </div>

        {/* Footer with Next Milestone Progress */}
        {upcomingMilestone && (
          <div style={{
            marginTop: '16px',
            padding: '14px',
            backgroundColor: 'rgba(50, 50, 80, 0.8)',
            borderRadius: '10px',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <LifeProgressBar 
              nextMilestone={upcomingMilestone}
              currentDays={milestones.currentDays}
            />
          </div>
        )}

        {/* Branding Footer */}
        <div style={{
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#a0a0d0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #9c27b0, #673ab7)',
              marginRight: '6px'
            }}></div>
            <span style={{ fontWeight: 'bold' }}>TimeLoom</span>
          </div>
          <span>Weave your story • Share your journey</span>
        </div>
      </div>
    );
  }
);

CombinedShareImage.displayName = 'CombinedShareImage';

export default CombinedShareImage;