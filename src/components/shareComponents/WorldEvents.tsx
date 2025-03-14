// shareComponents/WorldEvents.tsx
import React from 'react';

interface WorldEventsProps {
  birthYear: number;
  currentYear: number;
}

export const WorldEvents: React.FC<WorldEventsProps> = ({ birthYear }) => {
  // Get technological advancements since birth year
  const getTechAdvancements = () => {
    const techs = [];
    
    // Add relevant tech advancements based on birth year
    if (birthYear <= 1990) techs.push('World Wide Web (1990)');
    if (birthYear <= 1992) techs.push('SMS Text Messaging (1992)');
    if (birthYear <= 1996) techs.push('DVDs (1996)');
    if (birthYear <= 1998) techs.push('Google Search (1998)');
    if (birthYear <= 2001) techs.push('Wikipedia (2001)');
    if (birthYear <= 2004) techs.push('Facebook (2004)');
    if (birthYear <= 2007) techs.push('iPhone (2007)');
    if (birthYear <= 2008) techs.push('App Store (2008)');
    if (birthYear <= 2009) techs.push('Bitcoin (2009)');
    if (birthYear <= 2010) techs.push('iPad (2010)');
    if (birthYear <= 2011) techs.push('Voice Assistants (2011)');
    if (birthYear <= 2012) techs.push('4G Networks (2012)');
    if (birthYear <= 2015) techs.push('Smart Watches (2015)');
    if (birthYear <= 2016) techs.push('Virtual Reality (2016)');
    if (birthYear <= 2020) techs.push('5G Networks (2020)');
    if (birthYear <= 2022) techs.push('Mainstream AI Tools (2022)');
    if (birthYear <= 2023) techs.push('Generative AI (2023)');
    
    // Only show up to 5 advancements, prioritizing recent ones
    return techs.slice(-5);
  };
  
  const techAdvancements = getTechAdvancements();
  
  return (
    <>
      <h3 style={{
        fontSize: '14px',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#bb86fc',
        textAlign: 'center'
      }}>
        Technological Evolution
      </h3>
      
      <div style={{
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '13px',
          margin: '0 0 10px 0',
          color: '#e0e0fa'
        }}>
          Technologies that emerged during your lifetime:
        </p>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '6px'
        }}>
          {techAdvancements.map((tech, index) => (
            <span key={index} style={{
              backgroundColor: 'rgba(187, 134, 252, 0.2)',
              color: '#e0e0fa',
              fontSize: '11px',
              padding: '4px 8px',
              borderRadius: '12px',
              display: 'inline-block'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};