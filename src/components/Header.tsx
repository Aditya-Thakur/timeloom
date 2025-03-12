// Header.tsx
import React from 'react';

const Header: React.FC = () => (
  <header className="w-full relative overflow-hidden py-12 text-white text-center">
    {/* SVG Background with Animations */}
    <svg
      className="absolute top-0 left-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 1000 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b46c1" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        
        {/* Climate gradient overlay */}
        <linearGradient id="climateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(219, 154, 4, 0.15)" /> {/* Amber/orange for climate on left */}
          <stop offset="50%" stopColor="rgba(219, 154, 4, 0)" />
          <stop offset="50%" stopColor="rgba(219, 154, 4, 0)" />
          <stop offset="100%" stopColor="rgba(219, 154, 4, 0.15)" /> {/* Amber/orange for climate on right */}
        </linearGradient>
        
        {/* Animated wave definitions */}
        <path id="wave1" d="M-100,50 C100,0 200,100 400,50 C600,0 700,100 900,50 C1100,0 1200,100 1400,50" />
        <path id="wave2" d="M-100,150 C100,100 200,200 400,150 C600,100 700,200 900,150 C1100,100 1200,200 1400,150" />
        <path id="wave3" d="M-100,250 C50,200 150,300 300,250 C450,200 550,300 700,250 C850,200 950,300 1100,250" />
        
        {/* Climate icon symbols */}
        <symbol id="sunIcon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
        </symbol>
        
        <symbol id="leafIcon" viewBox="0 0 24 24">
          <path d="M6,21 C8,21 14,18 16,12 C18,6 17,3 17,3 C17,3 13,4 11,10 C9,16 9,21 6,21 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M6,21 L3,18" stroke="currentColor" strokeWidth="2" />
        </symbol>
        
        <symbol id="cloudIcon" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" fill="none" />
        </symbol>
        
        <symbol id="dropletIcon" viewBox="0 0 24 24">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2" fill="none" />
        </symbol>
      </defs>

      {/* Base background */}
      <rect width="100%" height="100%" fill="url(#headerGradient)" />
      
      {/* Climate gradient overlay */}
      <rect width="100%" height="100%" fill="url(#climateGradient)" />
      
      {/* Animated flowing waves - left to right */}
      <use href="#wave1" className="wave-animation-ltr" fill="none" stroke="rgba(176,119,252,0.4)" strokeWidth="4" />
      <use href="#wave3" className="wave-animation-ltr" fill="none" stroke="rgba(217,180,255,0.25)" strokeWidth="3" />
      
      {/* Animated flowing waves - right to left */}
      <use href="#wave2" className="wave-animation-rtl" fill="none" stroke="rgba(149,76,238,0.3)" strokeWidth="5" />
      
      {/* Floating particles with animation */}
      <circle className="float-animation" cx="100" cy="50" r="3" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation-delay-1" cx="300" cy="100" r="2" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation-delay-2" cx="500" cy="75" r="4" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation" cx="700" cy="120" r="3" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation-delay-1" cx="900" cy="60" r="2" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation-delay-2" cx="200" cy="200" r="3" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation" cx="400" cy="220" r="2" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation-delay-1" cx="600" cy="180" r="4" fill="rgba(255,255,255,0.5)" />
      <circle className="float-animation-delay-2" cx="800" cy="230" r="3" fill="rgba(255,255,255,0.5)" />
      
      {/* Climate icons on the left side */}
      <use href="#sunIcon" x="50" y="60" width="24" height="24" className="climate-icon-pulse" fill="none" stroke="rgba(255, 204, 0, 0.5)" />
      <use href="#leafIcon" x="30" y="140" width="24" height="24" className="climate-icon-float" fill="none" stroke="rgba(147, 250, 165, 0.5)" />
      <use href="#dropletIcon" x="70" y="220" width="24" height="24" className="climate-icon-float-delay-1" fill="none" stroke="rgba(125, 211, 252, 0.5)" />
      
      {/* Climate icons on the right side */}
      <use href="#cloudIcon" x="900" y="80" width="24" height="24" className="climate-icon-float-delay-2" fill="none" stroke="rgba(219, 234, 254, 0.5)" />
      <use href="#dropletIcon" x="920" y="180" width="24" height="24" className="climate-icon-float" fill="none" stroke="rgba(125, 211, 252, 0.5)" />
      <use href="#sunIcon" x="880" y="240" width="24" height="24" className="climate-icon-pulse" fill="none" stroke="rgba(255, 204, 0, 0.5)" />
      
      {/* CO2 molecules subtly in the background */}
      <text x="120" y="100" className="molecule-fade" fill="rgba(255, 255, 255, 0.1)" fontSize="14">CO₂</text>
      <text x="820" y="150" className="molecule-fade-delay" fill="rgba(255, 255, 255, 0.1)" fontSize="14">CO₂</text>
      <text x="75" y="250" className="molecule-fade-delay" fill="rgba(255, 255, 255, 0.1)" fontSize="14">CO₂</text>
      <text x="850" y="70" className="molecule-fade" fill="rgba(255, 255, 255, 0.1)" fontSize="14">CO₂</text>
    </svg>
    
    {/* CSS Animations */}
    <style>{`
      /* Left to right wave animation */
      .wave-animation-ltr {
        animation: waveMoveLTR 7s linear infinite;
      }
      
      /* Right to left wave animation */
      .wave-animation-rtl {
        animation: waveMoveRTL 9s linear infinite;
      }
      
      /* Floating particles animations */
      .float-animation {
        animation: floatUpDown 4s ease-in-out infinite;
      }
      
      .float-animation-delay-1 {
        animation: floatUpDown 4s ease-in-out 2s infinite;
      }
      
      .float-animation-delay-2 {
        animation: floatUpDown 4s ease-in-out 4s infinite;
      }
      
      /* Climate icon animations */
      .climate-icon-float {
        animation: floatUpDown 8s ease-in-out infinite;
      }
      
      .climate-icon-float-delay-1 {
        animation: floatUpDown 8s ease-in-out 3s infinite;
      }
      
      .climate-icon-float-delay-2 {
        animation: floatUpDown 8s ease-in-out 5s infinite;
      }
      
      .climate-icon-pulse {
        animation: pulseFade 6s ease-in-out infinite;
      }
      
      .molecule-fade {
        animation: fadeInOut 10s ease-in-out infinite;
      }
      
      .molecule-fade-delay {
        animation: fadeInOut 10s ease-in-out 5s infinite;
      }
      
      @keyframes waveMoveLTR {
        0% {
          transform: translateX(-100px);
        }
        100% {
          transform: translateX(100px);
        }
      }
      
      @keyframes waveMoveRTL {
        0% {
          transform: translateX(100px);
        }
        100% {
          transform: translateX(-100px);
        }
      }
      
      @keyframes floatUpDown {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }
      
      @keyframes pulseFade {
        0%, 100% {
          opacity: 0.3;
          stroke-width: 1.5;
        }
        50% {
          opacity: 0.7;
          stroke-width: 2.5;
        }
      }
      
      @keyframes fadeInOut {
        0%, 100% {
          opacity: 0;
        }
        50% {
          opacity: 0.3;
        }
      }
    `}</style>
    
    {/* Header Content (on top of the SVG) */}
    <div className="relative z-10">
      <h1 className="text-3xl font-bold">TimeLoom</h1>
      <p className="text-indigo-100">Discover the rhythm of your life's journey</p>
      <p className="text-indigo-100 text-sm mt-1 opacity-80">
        <span className="inline-block mx-1 text-amber-100">⟡</span>
        Explore personal milestones and climate impacts
        <span className="inline-block mx-1 text-amber-100">⟡</span>
      </p>
    </div>
  </header>
);

export default Header;