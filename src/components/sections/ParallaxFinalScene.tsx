import React, { useEffect, useRef } from 'react';

const ParallaxFinalScene: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const handPrintsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clean up any existing ScrollTriggers with these IDs
    const cleanupScrollTriggers = () => {
      ScrollTrigger.getAll().forEach((st: any) => {
        if (st.vars.id && st.vars.id.includes("final")) {
          st.kill();
        }
      });
    };
    
    cleanupScrollTriggers();
    
    // Main pin for scene
    const mainST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      id: "final-scene",
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 1.5,
        id: "final-door-anim",
      }
    });
    
    tl.to(doorRef.current, {
      scale: 1.3,
      filter: "brightness(1.5)",
      duration: 3
    });
    
    tl.to(handPrintsRef.current, {
      opacity: 0.8,
      scale: 1.1,
      duration: 2
    }, "<");
    
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1.5,
        id: "final-text-fade",
      }
    });
    
    textTl.to(textRef.current, {
      y: -30,
      opacity: 1,
      duration: 2,
      ease: "power1.out"
    });
    
    const doorPulse = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    doorPulse.to(".door-light", {
      opacity: 0.6,
      duration: 2,
      ease: "sine.inOut"
    });
    
    const handprint = gsap.utils.toArray('.handprint');
    handprint.forEach((print: Element, i: number) => {
      gsap.to(print, {
        opacity: 0.6 + (Math.random() * 0.4),
        duration: 1 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });
    
    return () => {
      if (mainST) mainST.kill();
      doorPulse.kill();
      cleanupScrollTriggers();
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black opacity-90 z-0" />
      
      <div 
        ref={doorRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-96 z-20"
      >
        <div className="relative w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="60" height="100" fill="#1a1a1a" />
            <rect x="15" y="15" width="50" height="90" fill="#0a0a0a" stroke="#2a2a2a" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="3" fill="#3a3a3a" />
            <rect x="30" y="95" width="20" height="5" fill="#3a3a3a" />
          </svg>
          <div className="door-light absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent opacity-0 mix-blend-screen" />
        </div>
      </div>
      
      <div 
        ref={handPrintsRef} 
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div className="handprint absolute top-1/4 left-1/3 opacity-0">
          <svg width="50" height="60" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,5 C5,5 5,10 10,10 C15,10 15,5 10,5 Z" fill="#5d0f0f" />
            <path d="M5,10 C1,10 1,15 5,15 C9,15 9,10 5,10 Z" fill="#5d0f0f" />
            <path d="M15,10 C11,10 11,15 15,15 C19,15 19,10 15,10 Z" fill="#5d0f0f" />
            <path d="M5,15 C1,15 1,25 5,25 C9,25 9,15 5,15 Z" fill="#5d0f0f" />
            <path d="M15,15 C11,15 11,25 15,25 C19,25 19,15 15,15 Z" fill="#5d0f0f" />
            <path d="M10,10 C6,10 6,20 10,20 C14,20 14,10 10,10 Z" fill="#5d0f0f" />
          </svg>
        </div>
        
        <div className="handprint absolute top-1/3 right-1/4 opacity-0 scale-75">
          <svg width="50" height="60" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,5 C5,5 5,10 10,10 C15,10 15,5 10,5 Z" fill="#5d0f0f" />
            <path d="M5,10 C1,10 1,15 5,15 C9,15 9,10 5,10 Z" fill="#5d0f0f" />
            <path d="M15,10 C11,10 11,15 15,15 C19,15 19,10 15,10 Z" fill="#5d0f0f" />
            <path d="M5,15 C1,15 1,25 5,25 C9,25 9,15 5,15 Z" fill="#5d0f0f" />
            <path d="M15,15 C11,15 11,25 15,25 C19,25 19,15 15,15 Z" fill="#5d0f0f" />
            <path d="M10,10 C6,10 6,20 10,20 C14,20 14,10 10,10 Z" fill="#5d0f0f" />
          </svg>
        </div>
        
        <div className="handprint absolute bottom-1/4 left-1/4 opacity-0 rotate-45">
          <svg width="50" height="60" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,5 C5,5 5,10 10,10 C15,10 15,5 10,5 Z" fill="#5d0f0f" />
            <path d="M5,10 C1,10 1,15 5,15 C9,15 9,10 5,10 Z" fill="#5d0f0f" />
            <path d="M15,10 C11,10 11,15 15,15 C19,15 19,10 15,10 Z" fill="#5d0f0f" />
            <path d="M5,15 C1,15 1,25 5,25 C9,25 9,15 5,15 Z" fill="#5d0f0f" />
            <path d="M15,15 C11,15 11,25 15,25 C19,25 19,15 15,15 Z" fill="#5d0f0f" />
            <path d="M10,10 C6,10 6,20 10,20 C14,20 14,10 10,10 Z" fill="#5d0f0f" />
          </svg>
        </div>
        
        <div className="handprint absolute top-2/3 right-1/3 opacity-0 -rotate-15 scale-90">
          <svg width="50" height="60" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,5 C5,5 5,10 10,10 C15,10 15,5 10,5 Z" fill="#5d0f0f" />
            <path d="M5,10 C1,10 1,15 5,15 C9,15 9,10 5,10 Z" fill="#5d0f0f" />
            <path d="M15,10 C11,10 11,15 15,15 C19,15 19,10 15,10 Z" fill="#5d0f0f" />
            <path d="M5,15 C1,15 1,25 5,25 C9,25 9,15 5,15 Z" fill="#5d0f0f" />
            <path d="M15,15 C11,15 11,25 15,25 C19,25 19,15 15,15 Z" fill="#5d0f0f" />
            <path d="M10,10 C6,10 6,20 10,20 C14,20 14,10 10,10 Z" fill="#5d0f0f" />
          </svg>
        </div>
      </div>
      
      <div 
        ref={textRef} 
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center z-30 opacity-0"
      >
        <h2 className="text-5xl md:text-6xl font-creepy text-red-600 mb-4 tracking-wider">DON'T OPEN</h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-md font-sans">
          Some doors are meant to stay closed. But curiosity always gets the better of us, doesn't it?
        </p>
      </div>
      
      <div className="absolute inset-0 z-40 mix-blend-overlay opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-film-grain" />
      </div>
      
      <div className="absolute inset-0 z-50 pointer-events-none" style={{ 
        background: 'radial-gradient(circle at center, transparent 40%, black 100%)' 
      }} />
    </div>
  );
};

export default ParallaxFinalScene; 