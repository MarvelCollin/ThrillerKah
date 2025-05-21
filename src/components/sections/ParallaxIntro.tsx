import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const ParallaxIntro: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const bloodRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clear any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach((st: any) => st.kill());
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // Increase for smoother scrubbing effect
        pin: true,
        anticipatePin: 1, // Helps with smoother pinning
        pinSpacing: true,
        markers: false,
        id: "parallax-intro", // Unique identifier to prevent conflicts
        invalidateOnRefresh: true, // Recalculate positions on refresh
        fastScrollEnd: true, // Better performance
      }
    });
    
    // Main timeline animations
    tl.to(titleRef.current, {
      scale: 1.5,
      y: -100,
      duration: 2,
      ease: "power1.inOut" // Smoother ease
    }, 0);
    
    tl.to(eyesRef.current, {
      y: -150,
      scale: 1.2,
      opacity: 0.8,
      duration: 3,
      ease: "power1.inOut"
    }, 0);
    
    tl.to(bloodRef.current, {
      height: "100%",
      duration: 4,
      ease: "power1.inOut"
    }, 0);
    
    tl.to(handRef.current, {
      y: -80,
      x: 20,
      rotation: 10,
      duration: 3,
      ease: "power1.inOut"
    }, 0);
    
    tl.to(fogRef.current, {
      opacity: 0.7,
      scale: 1.3,
      duration: 4,
      ease: "power1.inOut"
    }, 0);
    
    // Separate timeline for eye animation
    const eyesSt = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    eyesSt.to(".eye-pupil", {
      scale: 1.2,
      duration: 0.5,
      stagger: 0.1,
      ease: "sine.inOut" // Smoother sine ease
    });
    
    return () => {
      tl.kill();
      eyesSt.kill();
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
    };
  }, []);
  
  const followMouse = (e: React.MouseEvent) => {
    const eyeBalls = document.querySelectorAll('.eye-pupil');
    eyeBalls.forEach((ball) => {
      const rect = (ball as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / 25;
      const y = (e.clientY - rect.top) / 25;
      window.gsap.to(ball, {
        x: x,
        y: y,
        duration: 0.3,
        overwrite: "auto" // Prevent conflicting animations
      });
    });
  };
  
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
        className="absolute w-full h-full flex flex-col items-center justify-center z-30"
      >
        <h1 
          ref={titleRef} 
          className="text-8xl md:text-9xl font-creepy text-red-600 tracking-widest flicker-anim"
        >
          THRILLER
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mt-4 font-sans tracking-widest animate-fade-in">
          YOUR NIGHTMARES AWAIT
        </p>
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