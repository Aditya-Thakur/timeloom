// MobileShareContainer.tsx
import React, { useRef, useEffect, ReactNode } from 'react';

interface MobileShareContainerProps {
  children: ReactNode;
  isVisible: boolean;
  width: number;
  height: number;
}

/**
 * A container component that creates a fixed size environment for image generation
 * to ensure the complete content is captured regardless of viewport limitations.
 * 
 * This container maintains the original dimensions for HTML-to-image conversion
 * but scales the view down for display purposes on small screens.
 */
const MobileShareContainer: React.FC<MobileShareContainerProps> = ({
  children,
  isVisible,
  width,
  height
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  // Calculate scale factor based on viewport width
  const calculateScale = () => {
    if (!isMobile) return 1;
    
    // Calculate how much we need to scale down to fit in the viewport
    // We use 92% of viewport width to leave some margin
    const viewportWidth = window.innerWidth * 0.92;
    return Math.min(viewportWidth / width, 0.9);
  };
  
  const scale = calculateScale();

  useEffect(() => {
    // When component becomes visible, ensure it's properly rendered
    if (isVisible && containerRef.current) {
      // Force a repaint to ensure all content is rendered properly
      // This can help with SVGs and other complex elements
      containerRef.current.style.opacity = '0.99';
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }, 50);
    }
  }, [isVisible]);

  // Adjust container height based on the scale
  const containerHeight = isMobile ? height * scale : height;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: isMobile ? width * scale : width,
        height: containerHeight,
        overflow: 'hidden',
        margin: '0 auto',
        background: 'transparent'
      }}
    >
      {/* Content container maintains original dimensions for correct rendering */}
      <div
        ref={contentRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transformOrigin: 'top left',
          transform: isMobile ? `scale(${scale})` : 'none',
          // Important - this ensures content isn't clipped during HTML-to-canvas conversion
          overflow: 'visible'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileShareContainer;