import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParallaxEffect, useInteractiveElement } from '../../hooks/useParallaxEffect';
import './parallaxEffects.css';

interface ParallaxIntroProps {
  onGlitchTrigger: () => void;
}

const ParallaxIntro: React.FC<ParallaxIntroProps> = ({ onGlitchTrigger }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPortal, setShowPortal] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);
  const [bloodRainIntensity, setBloodRainIntensity] = useState(0);
  const [whispers, setWhispers] = useState<Array<{ id: number; text: string; style: React.CSSProperties }>>([]);
  const [scaryMessage, setScaryMessage] = useState("THERE'S NO ESCAPE");
  const [portalProgress, setPortalProgress] = useState(0);
  const [mistIntensity, setMistIntensity] = useState(0);
  const [hauntingAudio, setHauntingAudio] = useState(false);
  
  // Refs for parallax elements
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const treesRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const bloodRainRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  // Use custom parallax hook for different layers
  const moonParallax = useParallaxEffect(moonRef, { speed: 0.2, direction: 'up' });
  const fogParallax = useParallaxEffect(fogRef, { speed: 0.1, direction: 'down' });
  const treesParallax = useParallaxEffect(treesRef, { speed: 0.3, direction: 'down' });
  const mistParallax = useParallaxEffect(mistRef, { speed: 0.05, direction: 'down' });
  
  // Use interactive elements with intersection observer
  const titleInteractive = useInteractiveElement(0.2);
  const portalInteractive = useInteractiveElement(0.9);
  const messageInteractive = useInteractiveElement(0.4);
  
  // Whispers array
  const whisperTexts = [
    "come closer",
    "don't be afraid",
    "what was that sound?",
    "behind you",
    "look again",
    "hear the whispers",
    "never look back",
    "they're watching",
    "can you feel it?",
    "the door is open"
  ];
    // Create random whispers that appear at different positions
  const createRandomWhisper = useCallback(() => {
    if (whispers.length >= 5) return; // Limit concurrent whispers
    
    const newWhisper = {
      id: Date.now(),
      text: whisperTexts[Math.floor(Math.random() * whisperTexts.length)],
      style: {
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        opacity: 0,
        transform: `rotate(${Math.random() * 10 - 5}deg)`
      }
    };
    
    setWhispers(prev => [...prev, newWhisper]);
    
    // Remove whisper after animation time
    setTimeout(() => {
      setWhispers(prev => prev.filter(w => w.id !== newWhisper.id));
    }, 10000);
  }, [whispers]);
  
  // Generate blood rain drops
  const generateBloodRain = useCallback(() => {
    if (!bloodRainRef.current) return;
    
    // Clear previous drops
    bloodRainRef.current.innerHTML = '';
    
    // Number of drops based on intensity
    const dropCount = Math.floor(bloodRainIntensity * 50);
    
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement('div');
      drop.className = 'blood-drop';
      
      // Random properties
      const left = Math.random() * 100;
      const height = Math.random() * 100 + 50;
      const delay = Math.random() * 5;
      const duration = Math.random() * 2 + 1;
      
      drop.style.left = `${left}%`;
      drop.style.height = `${height}px`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.animationDuration = `${duration}s`;
      drop.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      
      bloodRainRef.current.appendChild(drop);
    }
  }, [bloodRainIntensity]);
    // Handle scroll effects
  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrollPosition(position);
    
    // Calculate scroll percentage relative to viewport height
    const scrollPercent = position / window.innerHeight;
    
    // Trigger portal effect when scrolled far enough
    if (scrollPercent > 0.7 && !showPortal) {
      setShowPortal(true);
    }
    
    // Increase blood rain intensity based on scroll
    const newIntensity = Math.min(scrollPercent, 1);
    setBloodRainIntensity(newIntensity);
    
    // Random glitch triggers
    if (Math.random() < 0.01 * scrollPercent) {
      onGlitchTrigger();
    }
    
    // Add whispers as you scroll
    if (Math.random() < 0.02 * scrollPercent) {
      createRandomWhisper();
    }
    
    // Full transition to next section
    if (scrollPercent > 0.9 && !transitionActive) {
      setTransitionActive(true);
      onGlitchTrigger();
      
      // Additional transition effects can be triggered here
    }
  }, [onGlitchTrigger, createRandomWhisper, showPortal, transitionActive]);
    // Initialize and cleanup scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Update blood rain effect when intensity changes
  useEffect(() => {
    generateBloodRain();
  }, [bloodRainIntensity, generateBloodRain]);
  
  // Initial whisper on component mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      createRandomWhisper();
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [createRandomWhisper]);
  
  // Calculate opacity based on scroll position for fade out
  const opacity = Math.max(0, 1 - scrollPosition / (window.innerHeight * 0.9));  return (
    <div 
      ref={parallaxRef} 
      className="fixed top-0 left-0 w-full min-h-screen overflow-hidden z-0 parallax-container"
      style={{ opacity }}
    >
      {/* Night sky background with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-red-900/20 parallax-depth-3">
        <div 
          className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-70"
          style={{ transform: `translateY(${scrollPosition * 0.05}px)` }}
        ></div>
      </div>
      
      {/* Moon with parallax and mouse tracking effect */}
      <div 
        ref={moonRef}
        className="absolute right-[20%] top-[20%] w-32 h-32 rounded-full bg-gray-200 shadow-[0_0_40px_20px_rgba(255,255,255,0.3)] dreamy-float ethereal-glow"
        style={{
          ...moonParallax.style,
          transform: `translate3d(${moonParallax.mousePosition.x}px, ${scrollPosition * 0.02 + moonParallax.mousePosition.y}px, 0) scale(${1 - scrollPosition / 3000})`,
        }}
      >
        {/* Moon craters */}
        <div className="absolute top-[20%] left-[30%] w-6 h-6 rounded-full bg-gray-300/40"></div>
        <div className="absolute bottom-[25%] right-[20%] w-8 h-8 rounded-full bg-gray-300/30"></div>
        <div className="absolute top-[45%] right-[35%] w-4 h-4 rounded-full bg-gray-300/20"></div>
      </div>
      
      {/* Mist layer with flowing effect */}
      <div 
        ref={mistRef}
        className="absolute inset-0 mist-layer mist-flow parallax-depth-2"
        style={mistParallax.style}
      ></div>
      
      {/* Fog layer with parallax effect */}
      <div 
        ref={fogRef}
        className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"
        style={{
          ...fogParallax.style,
          transform: `translate3d(${fogParallax.mousePosition.x * -0.2}px, ${scrollPosition * 0.1 + fogParallax.mousePosition.y * -0.2}px, 0)`,
        }}
      ></div>
      
      {/* Trees silhouette with parallax effect */}
      <div 
        ref={treesRef}
        className="absolute bottom-0 left-0 w-full h-[30%] bg-[url('/images/forest-silhouette.png')] bg-repeat-x bg-bottom"
        style={treesParallax.style}
      ></div>
        {/* Flying bats with animations - these will move across the screen */}
      <div className="bat bat-1"></div>
      <div className="bat bat-2"></div>
      <div className="bat bat-3"></div>
      
      {/* Blood drip overlay that intensifies as you scroll */}
      <div 
        className="absolute top-0 left-0 w-full h-20 blood-drip"
        style={{ opacity: Math.min(1, scrollPosition / 300) }}
      ></div>
      
      {/* Floating main text that changes with scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          ref={titleInteractive.ref}
          className={`text-4xl md:text-7xl font-creepy text-white text-shadow tracking-widest glitch ${
            titleInteractive.isVisible ? 'animate-pulse-slow' : 'opacity-70'
          }`}
          style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}
          data-text="ENTER THE VOID"
        >
          ENTER THE <span className="text-red-600">VOID</span>
        </h1>
      </div>
      
      {/* Scary message that appears at a certain scroll position */}
      <div 
        ref={messageInteractive.ref}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          messageInteractive.isVisible && scrollPosition > window.innerHeight * 0.4 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}
        style={{ 
          transform: `translateY(${window.innerHeight * 0.2}px)`,
        }}
      >
        <div 
          className="text-xl md:text-4xl font-creepy tracking-widest text-red-600 animate-pulse-effect glitch"
          data-text={scaryMessage}
          onClick={onGlitchTrigger}
        >
          {scaryMessage}
        </div>
      </div>
      
      {/* Interactive cursor follower - subtle red glow that follows cursor */}
      <div 
        className="cursor-follower pointer-events-none" 
        style={{ 
          transform: `translate(${moonParallax.mousePosition.x * 2}px, ${moonParallax.mousePosition.y * 2}px)`,
          opacity: Math.min(scrollPosition / 500, 0.7)
        }}
      ></div>
        {/* Call to action - scroll down indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollPosition / 200) }}
      >
        <span className="text-sm tracking-widest mb-2 animate-pulse">SCROLL DOWN</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      
      {/* Noise overlay for film grain effect */}
      <div className="absolute inset-0 bg-film-grain opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default ParallaxIntro;
