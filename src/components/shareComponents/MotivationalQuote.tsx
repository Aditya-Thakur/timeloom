// shareComponents/MotivationalQuote.tsx
import React from 'react';

interface MotivationalQuoteProps {
  dayCount: number;
  isPastHalfCentury: boolean;
}

export const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ 
  dayCount 
}) => {
  // Get an appropriate quote based on the number of days
  const getQuote = () => {
    // Early life quotes (up to around 20 years)
    if (dayCount < 7300) {
      return {
        text: "Every day is a canvas; paint it with experiences, curiosity, and joy.",
        author: "Life's Wisdom"
      };
    }
    // Mid-life quotes (around 20-50 years)
    else if (dayCount < 18250) {
      return {
        text: "Your journey has already created a remarkable story. The best chapters are still being written.",
        author: "Time's Reflection"
      };
    }
    // Later life quotes (50+ years)
    else {
      return {
        text: "Wisdom gathered through thousands of sunrises becomes the light that guides others on their path.",
        author: "Legacy's Promise"
      };
    }
  };
  
  const quote = getQuote();
  
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
        Life Reflection
      </h3>
      
      <div style={{
        position: 'relative',
        padding: '0 6px'
      }}>
        {/* Decorative quote marks */}
        <div style={{
          position: 'absolute',
          top: '-5px',
          left: '-2px',
          fontSize: '28px',
          color: 'rgba(187, 134, 252, 0.3)',
          fontFamily: 'Georgia, serif'
        }}>
          "
        </div>
        
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#e0e0fa',
          textAlign: 'center',
          margin: '8px 0',
          fontStyle: 'italic'
        }}>
          {quote.text}
        </p>
        
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          right: '0',
          fontSize: '28px',
          color: 'rgba(187, 134, 252, 0.3)',
          fontFamily: 'Georgia, serif'
        }}>
          "
        </div>
        
        <p style={{
          fontSize: '11px',
          color: '#a0a0d0',
          textAlign: 'right',
          marginTop: '6px',
          marginRight: '8px'
        }}>
          — {quote.author}
        </p>
      </div>
    </>
  );
};