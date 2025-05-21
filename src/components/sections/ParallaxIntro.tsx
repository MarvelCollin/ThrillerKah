import React, { useRef } from 'react';
import ThrillerTitle from '../ui/ThrillerTitle';
import NightmaresSubtitle from '../ui/NightmaresSubtitle';
import { useParallaxAnimation, useEyeFollowMouse } from '../../hooks/useParallaxAnimation';

const ParallaxIntro: React.FC = () => {
  // Create refs for animation targets
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const bloodRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  
  // Use custom hooks
  const { scrollProgress } = useParallaxAnimation({
    parallaxRef,
    titleRef,
    titleContainerRef,
    eyesRef,
    bloodRef,
    handRef,
    fogRef
  });
  
  const { followMouse } = useEyeFollowMouse();
  
  return (
    <div 
      ref={parallaxRef} 
      className="h-screen w-full relative overflow-hidden bg-black"
      onMouseMove={followMouse}
    >
      <div 
        ref={fogRef}
        className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900 to-black opacity-30 z-10"
      />
      
      <div
        ref={titleContainerRef}
        className="absolute w-full h-full flex flex-col items-center justify-center z-30"
        style={{
          transition: 'background-color 0.3s ease',
          backgroundColor: `rgba(0, 0, 0, ${scrollProgress * 0.7})`,
        }}
      >
        <ThrillerTitle 
          scrollProgress={scrollProgress} 
          titleRef={titleRef} 
        />
        
        <NightmaresSubtitle scrollProgress={scrollProgress} />
      </div>
      
      <div
        ref={eyesRef}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex gap-14"
      >
        <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center animate-float-medium">
          <div className="eye-pupil absolute w-12 h-12 bg-black rounded-full" />
        </div>
        <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center animate-float-slow">
          <div className="eye-pupil absolute w-12 h-12 bg-black rounded-full" />
        </div>
      </div>
      
      <div 
        ref={bloodRef}
        className="absolute inset-x-0 top-0 w-full h-0 z-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-red-900 opacity-20" />
        <div className="blood-drip" />
      </div>
      
      <div
        ref={handRef}
        className="absolute bottom-0 right-0 w-40 h-64 z-40 translate-y-1/2"
      >
        <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,160 Q30,140 30,120 Q30,100 20,80 Q10,60 20,40 Q30,20 50,10 Q70,0 80,20 Q90,40 80,60 Q70,80 80,100 Q90,120 80,140 Q70,160 50,160 Z" fill="#5d0f0f" />
          <path d="M30,140 Q35,130 40,140 Q45,150 50,140 Q55,130 60,140 Q65,150 70,140 Q75,130 80,140" fill="none" stroke="#3a0808" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute inset-0 z-50 bg-film-grain opacity-10 pointer-events-none mix-blend-overlay" />
    </div>
  );
};

export default ParallaxIntro; 