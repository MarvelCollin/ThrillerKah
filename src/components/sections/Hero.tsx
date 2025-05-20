import React, { useRef } from 'react';
import Button from '../ui/Button';

interface HeroProps {
  isGlitching: boolean;
  onGlitchTrigger: () => void;
}

const Hero: React.FC<HeroProps> = ({ isGlitching, onGlitchTrigger }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/thriller-bg.jpg')] bg-center bg-cover opacity-40 hover:scale-105 transition-all duration-2000"></div>
      
      <div className="absolute top-0 w-full blood-drip"></div>
      
      <div className="container mx-auto px-4 z-20 text-center">
        <h1 
          ref={titleRef}
          className={`font-creepy text-5xl md:text-7xl font-bold mb-6 tracking-wider text-white text-shadow ${isGlitching ? 'glitch' : 'animate-pulse-slow'}`}
          data-text="WELCOME TO DARKNESS"
        >
          WELCOME TO <span className="text-red-600">DARKNESS</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-300 fade-in">
          Experience the thrill of the unknown in our immersive thriller universe
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            onClick={onGlitchTrigger}
          >
            EXPLORE NOW
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
          <Button variant="secondary">
            WATCH TRAILER
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 