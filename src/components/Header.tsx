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
        
        {/* Animated wave definitions */}
        <path id="wave1" d="M-100,50 C100,0 200,100 400,50 C600,0 700,100 900,50 C1100,0 1200,100 1400,50" />
        <path id="wave2" d="M-100,150 C100,100 200,200 400,150 C600,100 700,200 900,150 C1100,100 1200,200 1400,150" />
        <path id="wave3" d="M-100,250 C50,200 150,300 300,250 C450,200 550,300 700,250 C850,200 950,300 1100,250" />
      </defs>

      {/* Base background */}
      <rect width="100%" height="100%" fill="url(#headerGradient)" />
      
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
    `}</style>
    
    {/* Header Content (on top of the SVG) */}
    <div className="relative z-10">
      <h1 className="text-3xl font-bold">TimeLoom</h1>
      <p className="text-indigo-100">Discover the rhythm of your life's journey</p>
    </div>
  </header>
);

export default Header;