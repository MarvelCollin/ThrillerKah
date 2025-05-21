import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import './App.css'

// Add type declarations for GSAP
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const doorContainerRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const bloodDripsRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  
  const [showVideo, setShowVideo] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [youtubeError, setYoutubeError] = useState(false);
  
  // Optimized - memoize event handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
  }, []);
  
  const handleYoutubeError = useCallback((e: React.SyntheticEvent<HTMLIFrameElement>) => {
    console.warn("YouTube iframe failed to load properly", e);
    setYoutubeError(true);
  }, []);
  
  const handleThumbnailClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
    setYoutubeError(false); // Reset error state when trying to play
  }, []);
  
  // Mouse movement and initial loading effect
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate initial loading with reduced time
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000); // Reduced from 1500ms
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((st: any) => st.kill());
    
    // Initial animations
    const tl = gsap.timeline();
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.8,
      delay: 0.5,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1.2")
    .from(scrollPromptRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power2.out" 
    }, "-=0.8");
    
    // Scroll prompt animation
    gsap.to(scrollPromptRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
      delay: 2
    });
    
    // Animate fog effect
    if (fogRef.current) {
      gsap.to(fogRef.current, {
        backgroundPosition: '100% 0%',
        repeat: -1,
        duration: 60,
        ease: "none"
      });
    }
    
    // Set up the scroll container effects
    document.body.style.overflow = 'hidden';
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    
    // Animation control values
    let targetProgress = 0;
    let internalCurrentProgress = 0;
    let lastTime = 0;
    
    // Create animation timeline - with extended durations for longer scrolling
    const masterTimeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const progress = masterTimeline.progress();
        
        // Section visibility control - ensure clean transitions
        // Title section visibility (fully visible 0-0.3, fade out 0.3-0.4)
        const titleSectionOpacity = progress < 0.3 ? 1 : Math.max(0, 1 - ((progress - 0.3) * 10));
        gsap.set(".title-section", { opacity: titleSectionOpacity });
        
        // Door section visibility (start fade in at 0.35, fully visible 0.4-0.7, fade out 0.7-0.8)
        const doorSectionOpacity = progress < 0.35 ? 0 : 
                                 progress < 0.4 ? ((progress - 0.35) * 20) : 
                                 progress < 0.7 ? 1 : 
                                 Math.max(0, 1 - ((progress - 0.7) * 10));
        gsap.set(".door-container", { opacity: doorSectionOpacity });
        
        // Video section visibility (start fade in at 0.75, fully visible at 0.85)
        const videoSectionOpacity = progress < 0.75 ? 0 : 
                                  progress < 0.85 ? ((progress - 0.75) * 10) : 1;
        gsap.set(videoSectionRef.current, { opacity: videoSectionOpacity });
        
        // Video thumbnail control
        if (progress > 0.9 && !showVideo) {
          // Auto-play video when reaching the very end
          setShowVideo(true);
        } else if (progress < 0.7 && showVideo) {
          // Hide video when scrolling back to door scene
          setShowVideo(false);
        }
        
        // Update progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }
        
        // Dynamic fog intensity based on progress
        if (fogRef.current) {
          const fogOpacity = 0.2 + (progress * 0.3); // Increase fog as we progress
          fogRef.current.style.opacity = fogOpacity.toString();
        }
        
        // Dynamic blood drips based on progress
        if (bloodDripsRef.current) {
          const bloodOpacity = 0.4 + (progress * 0.6);
          bloodDripsRef.current.style.opacity = bloodOpacity.toString();
        }
        
        // Update current progress
        setCurrentProgress(progress);
      }
    });
    
    // Title animations - longer duration for more gradual transition
    masterTimeline.to([titleRef.current, subtitleRef.current, scrollPromptRef.current], {
      opacity: 0,
      y: -50,
      duration: 60, // Increased duration for longer scroll
      stagger: 5
    }, 0);
    
    // Door appearing
    masterTimeline.fromTo(doorContainerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 40 },
      35 // Start later
    );
    
    // Door opening - longer duration
    masterTimeline.to(doorLeftRef.current, {
      rotateY: 110,
      x: "-100%",
      transformOrigin: "left",
      duration: 50, // Extended duration
      ease: "power2.inOut"
    }, 70); // Start later
    
    masterTimeline.to(doorRightRef.current, {
      rotateY: -110,
      x: "100%",
      transformOrigin: "right",
      duration: 50, // Extended duration
      ease: "power2.inOut"
    }, 70); // Start later
    
    // Door light effect
    masterTimeline.to(".door-light", {
      opacity: 0.9,
      duration: 40
    }, 75);
    
    // Background atmosphere intensifies
    masterTimeline.to(".particles-container", {
      opacity: 0.9,
      scale: 1.2,
      duration: 40
    }, 65);
    
    // Door shaking effect as it opens
    masterTimeline.to(".door-container", {
      x: "random(-5, 5)",
      y: "random(-3, 3)",
      repeat: 15, // More repetitions
      repeatRefresh: true,
      duration: 0.2,
      ease: "power1.inOut"
    }, 70);
    
    // Door fade out and video appear
    masterTimeline.to(doorContainerRef.current, {
      opacity: 0,
      duration: 40
    }, 120);
    
    // Video section appearing
    masterTimeline.fromTo(videoSectionRef.current,
      { opacity: 0, scale: 0.9 },
      { scale: 1, duration: 40 },
      140
    );
    
    // Animation loop for smooth scrolling with lerping
    const animateScroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = Math.min(time - lastTime, 50) / 1000; // Limit to 50ms and convert to seconds
      lastTime = time;
      
      // Smooth lerping for progress - improved for smoother scrolling
      const ease = 0.03; // Lower = smoother but slower response (reduced from 0.05)
      internalCurrentProgress += (targetProgress - internalCurrentProgress) * Math.min(ease * (60 * deltaTime), 1);
      
      // Apply to timeline with slight rounding to avoid micro-jitters
      masterTimeline.progress(Math.round(internalCurrentProgress * 1000) / 1000);
      
      // Continue animation loop
      requestAnimationFrame(animateScroll);
    };
    
    // Start animation loop
    requestAnimationFrame(animateScroll);
    
    // Update the animation based on scroll
    const handleWheel = (e: WheelEvent) => {
      // Always prevent default scrolling
      e.preventDefault();
      e.stopPropagation();
      
      // Adjust sensitivity and direction - reduced for slower progression
      const sensitivity = 0.0004; // Lower = less sensitive, longer scroll (reduced from 0.0008)
      const delta = e.deltaY * sensitivity;
      
      // Update target progress with clamping 0-1
      targetProgress = Math.min(Math.max(targetProgress + delta, 0), 1);
    };
    
    // Global handler to ensure we capture events even when hovering over iframe
    const handleGlobalWheel = (e: WheelEvent) => {
      handleWheel(e);
    };
    
    window.addEventListener('wheel', handleGlobalWheel, { passive: false, capture: true });
    
    // Handle touch for mobile
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const touchY = e.touches[0].clientY;
      
      // Adjust sensitivity for touch - reduced for slower progression
      const sensitivity = 0.0015;
      const delta = (touchStartY - touchY) * sensitivity;
      
      // Update target with clamping 0-1
      targetProgress = Math.min(Math.max(targetProgress + delta, 0), 1);
      
      touchStartY = touchY;
    };
    
    // Global handlers for touch events
    const handleGlobalTouchStart = (e: TouchEvent) => {
      handleTouchStart(e);
    };
    
    const handleGlobalTouchMove = (e: TouchEvent) => {
      handleTouchMove(e);
    };
    
    window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false, capture: true });
    
    return () => {
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
      window.removeEventListener('wheel', handleGlobalWheel, { capture: true });
      window.removeEventListener('touchstart', handleGlobalTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleGlobalTouchMove, { capture: true });
      document.body.style.overflow = '';
    };
  }, [showVideo]);
  
  // Add a useEffect for consistent animation updates and particle generation
  useEffect(() => {
    // This ensures animations that depend on currentProgress update smoothly
    const elements = document.querySelectorAll('.progress-animated');
    elements.forEach(el => {
      (el as HTMLElement).style.setProperty('--progress', `${currentProgress}`);
    });
    
    // Dynamic particle generation based on scroll progress
    if (currentProgress > 0.4 && currentProgress < 0.8) {
      const particlesContainer = document.querySelector('.particles-container');
      if (particlesContainer && Math.random() > 0.8) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const hue = Math.random() * 20;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 2;
        
        particle.className = 'particle';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `hsl(${hue}, 80%, 40%)`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = '0';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
        
        // Remove the particle after animation completes
        setTimeout(() => {
          if (particlesContainer.contains(particle)) {
            particlesContainer.removeChild(particle);
          }
        }, (duration + delay) * 1000);
      }
    }
  }, [currentProgress]);
  
  return (
    <>
      {/* Initial loading screen */}
      <div className={`fixed inset-0 bg-black z-[100] flex items-center justify-center transition-opacity duration-1000 ${loadingComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-creepy text-red-600 tracking-wider flicker-anim mb-4">
            ThrillerKah
          </h1>
          <div className="w-48 h-1 mx-auto bg-gray-800 rounded overflow-hidden">
            <div className="h-full bg-red-700 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    
      <div 
        ref={containerRef} 
        className="h-screen bg-black text-white overflow-hidden relative"
      >
        {/* Custom cursor effect */}
        <div 
          className="pointer-events-none fixed w-8 h-8 rounded-full mix-blend-difference z-[60] hidden md:block" 
          style={{
            transform: `translate(${cursorPosition.x * window.innerWidth}px, ${cursorPosition.y * window.innerHeight}px) translate(-50%, -50%)`,
            background: 'rgba(255, 50, 50, 0.3)',
            boxShadow: '0 0 30px 10px rgba(255, 50, 50, 0.2)'
          }}
        ></div>
        
        {/* Interactive fog effect that follows cursor */}
        <div 
          ref={fogRef}
          className="absolute inset-0 bg-fog-texture bg-repeat opacity-20 pointer-events-none z-0"
          style={{
            backgroundSize: '200% 200%',
            filter: `blur(${12 + (currentProgress * 8)}px)`,
            transform: `translate(${(cursorPosition.x - 0.5) * -20}px, ${(cursorPosition.y - 0.5) * -20}px)`,
            transition: 'filter 0.3s ease-out'
          }}
        ></div>
        
        {/* Progress indicator */}
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800 z-50">
          <div 
            ref={progressBarRef} 
            className="h-full bg-red-700 progress-bar w-0"
            style={{
              boxShadow: `0 0 ${10 + (currentProgress * 15)}px rgba(220, 38, 38, ${0.5 + (currentProgress * 0.5)})`
            }}
          ></div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="fixed bottom-5 left-0 right-0 text-center text-gray-500 text-sm z-50 progress-animated"
          style={{
            opacity: currentProgress < 0.95 ? 1 : 0,
            transform: `translateY(${currentProgress > 0.9 ? '20px' : '0'})`
          }}
        >
          <div className="inline-block bg-black bg-opacity-50 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="mr-2">Scroll to continue</span>
            <svg className="inline-block animate-pulse-slow" width="16" height="24" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V34M12 34L2 24M12 34L22 24" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Instruction */}
        <div className="fixed bottom-5 left-0 right-0 text-center text-gray-500 text-sm z-50">
          Scroll up/down to control
        </div>
        
        {/* Common background elements */}
        <div className="absolute inset-0 bg-film-grain opacity-15 pointer-events-none mix-blend-overlay z-0"
          style={{
            opacity: 0.15 + (currentProgress * 0.1)
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900 to-black opacity-40 z-0"
          style={{
            opacity: 0.4 + (currentProgress * 0.2)
          }}
        ></div>
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)] opacity-60 pointer-events-none z-0"
          style={{
            opacity: 0.6 + (currentProgress * 0.2),
            background: `radial-gradient(circle, rgba(0,0,0,0) ${40 - (currentProgress * 15)}%, rgba(0,0,0,1) 100%)`
          }}
        ></div>
        
        {/* Enhanced blood drips with more variation */}
        <div ref={bloodDripsRef} className="absolute inset-0 pointer-events-none z-0"
          style={{
            filter: `saturate(${1 + (currentProgress * 0.5)}) contrast(${1 + (currentProgress * 0.2)})`,
            transition: 'filter 0.5s ease-out'
          }}
        >
          {/* Random blood drips */}
          <div className="absolute top-0 left-[10%] w-12 h-40 opacity-80">
            <div className="w-4 h-40 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
            <div className="w-8 h-5 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="absolute top-0 right-[15%] w-8 h-28 opacity-60">
            <div className="w-3 h-28 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
            <div className="w-6 h-4 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="absolute top-0 left-[35%] w-6 h-56 opacity-70 animate-blood-drip">
            <div className="w-2 h-56 mx-auto bg-gradient-to-b from-red-900 to-red-900/5"></div>
            <div className="w-4 h-3 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="absolute top-0 right-[30%] w-10 h-48 opacity-50 animate-blood-drip-slow">
            <div className="w-3 h-48 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
            <div className="w-7 h-4 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="absolute top-0 left-[65%] w-7 h-32 opacity-60 animate-blood-drip-delayed">
            <div className="w-2 h-32 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
            <div className="w-5 h-3 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        {/* Floating particles effect - enhanced with more particles */}
        <div className="particles-container absolute inset-0 pointer-events-none z-0">
          <div className="particle w-1 h-1 bg-red-500/30 absolute top-[10%] left-[20%] animate-float-slow"></div>
          <div className="particle w-1 h-1 bg-red-500/20 absolute top-[20%] left-[50%] animate-float-medium"></div>
          <div className="particle w-1 h-1 bg-red-500/40 absolute top-[70%] left-[80%] animate-float"></div>
          <div className="particle w-2 h-2 bg-red-700/20 absolute top-[40%] left-[10%] animate-float-medium"></div>
          <div className="particle w-1 h-1 bg-red-600/30 absolute top-[60%] left-[30%] animate-float-slow"></div>
          <div className="particle w-2 h-2 bg-red-600/20 absolute top-[30%] left-[70%] animate-float"></div>
          <div className="particle w-1 h-1 bg-red-500/30 absolute top-[80%] left-[40%] animate-float-medium"></div>
          <div className="particle w-1 h-1 bg-red-600/40 absolute top-[25%] left-[65%] animate-float-slow"></div>
          
          {/* Additional particles */}
          <div className="particle w-1 h-1 bg-red-500/20 absolute top-[15%] left-[85%] animate-float-slow"></div>
          <div className="particle w-2 h-2 bg-red-700/30 absolute top-[45%] left-[25%] animate-float-medium-reverse"></div>
          <div className="particle w-1 h-1 bg-red-600/20 absolute top-[75%] left-[55%] animate-float-slow-reverse"></div>
          <div className="particle w-3 h-3 bg-red-800/10 absolute top-[35%] left-[75%] animate-float-super-slow"></div>
          <div className="particle w-2 h-2 bg-red-500/15 absolute top-[65%] left-[15%] animate-float-circular"></div>
          <div className="particle w-1 h-1 bg-red-600/25 absolute top-[5%] left-[45%] animate-float-zigzag"></div>
        </div>
        
        {/* Title Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 title-section">
          <h1 
            ref={titleRef} 
            className="text-7xl md:text-8xl font-creepy tracking-wider flicker-anim uppercase"
            style={{
              textShadow: '0 0 15px rgba(220, 38, 38, 0.8)',
              transform: `translate(${(cursorPosition.x - 0.5) * -10}px, ${(cursorPosition.y - 0.5) * -10}px)`,
              filter: `hue-rotate(${cursorPosition.x * 10}deg)`
            }}
          >
            {Array.from("Thriller").map((char, index) => (
              <span 
                key={index}
                className="inline-block"
                style={{
                  transform: `
                    translateY(${Math.sin((index * 0.5) + (currentProgress * 5)) * 10}px) 
                    rotate(${Math.sin((index * 0.2) + (currentProgress * 3)) * 5}deg)
                    scale(${1 + (currentProgress * 0.05) + (Math.sin((index * 0.5) + (currentProgress * 2)) * 0.1)})
                  `,
                  opacity: currentProgress > 0.8 ? (1 - ((currentProgress - 0.8) * 5)) : 1,
                  color: `hsl(${0 + (index * 5) + (currentProgress * 20)}, ${70 + (currentProgress * 30)}%, ${50 - (currentProgress * 10)}%)`,
                  textShadow: `
                    0 0 ${5 + (currentProgress * 20)}px rgba(${180 + (currentProgress * 75)}, 0, 0, ${0.5 + (currentProgress * 0.5)})
                  `,
                  transition: 'transform 0.05s ease-out, color 0.05s ease-out'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-400 mt-8 font-sans tracking-wider text-center px-4"
            style={{
              transform: `translate(${(cursorPosition.x - 0.5) * -5}px, ${(cursorPosition.y - 0.5) * -5}px)`,
              opacity: currentProgress > 0.4 ? (1 - ((currentProgress - 0.4) * 1.6)) : 1
            }}
          >
            YOUR NIGHTMARE AWAITS
          </p>
          
          <div 
            ref={scrollPromptRef}
            className="absolute bottom-16 flex flex-col items-center z-10"
          >
            <p className="text-gray-500 mb-2">Scroll Down</p>
            <svg className="animate-pulse-slow" width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V34M12 34L2 24M12 34L22 24" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Door Section */}
        <div 
          ref={doorContainerRef} 
          className="door-container absolute inset-0 flex items-center justify-center opacity-0 z-20"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Door frame and light effect */}
          <div className="relative w-[300px] h-[450px] border-8 border-gray-800 bg-black overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.9)] door-zoom"
            style={{
              transform: currentProgress > 0.6 ? `scale(${1 + (currentProgress - 0.6) * 8}) translateZ(${(currentProgress - 0.6) * 500}px)` : 'scale(1)',
              transition: 'transform 0.5s ease-out'
            }}
          >
            {/* Door light behind the door */}
            <div className="door-light absolute inset-0 bg-gradient-radial from-red-900/60 to-black opacity-0"></div>
            
            {/* Creepy scene behind door */}
            <div 
              className="absolute inset-0 opacity-0 door-background transition-opacity duration-1000"
              style={{
                filter: `blur(${Math.max(0, (currentProgress - 0.7) * 10)}px)`
              }}
            >
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-black via-red-900/20 to-black"></div>
                
                {/* Shadowy figure silhouette */}
                <div className="absolute h-[50%] w-[30%] bg-black/40 rounded-full blur-xl top-[25%]"></div>
                <svg className="absolute h-[70%] top-[15%] opacity-60" viewBox="0 0 100 200" fill="none">
                  <path d="M50,30 C40,30 30,50 30,70 C30,90 40,110 50,110 C60,110 70,90 70,70 C70,50 60,30 50,30 Z" fill="black"/>
                  <path d="M30,70 L30,180 L70,180 L70,70 Z" fill="black"/>
                </svg>
              </div>
            </div>
            
            {/* Door panels */}
            <div 
              ref={doorLeftRef} 
              className="absolute inset-y-0 left-0 w-1/2 bg-[#1a1a1a] border-r-2 border-gray-900 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.12\'/%3E%3C/svg%3E")',
                backgroundSize: '150px'
              }}
            >
              <div className="absolute top-1/2 right-2 w-3 h-8 bg-[#3a3a3a] rounded-sm"></div>
            </div>
            <div 
              ref={doorRightRef} 
              className="absolute inset-y-0 right-0 w-1/2 bg-[#1a1a1a] border-l-2 border-gray-900 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.12\'/%3E%3C/svg%3E")',
                backgroundSize: '150px'
              }}
            >
              <div className="absolute top-1/2 left-2 w-3 h-8 bg-[#3a3a3a] rounded-sm"></div>
            </div>
          </div>
          
          {/* Handprints on the door - more dynamic with cursor interaction */}
          <div 
            className="absolute pointer-events-none"
            style={{
              transform: `translate(${(cursorPosition.x - 0.5) * 20}px, ${(cursorPosition.y - 0.5) * 20}px)`
            }}
          >
            <div className="handprint absolute top-1/3 left-[250px] opacity-60 scale-75">
              <svg width="50" height="60" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,5 C5,5 5,10 10,10 C15,10 15,5 10,5 Z" fill="#5d0f0f" />
                <path d="M5,10 C1,10 1,15 5,15 C9,15 9,10 5,10 Z" fill="#5d0f0f" />
                <path d="M15,10 C11,10 11,15 15,15 C19,15 19,10 15,10 Z" fill="#5d0f0f" />
                <path d="M5,15 C1,15 1,25 5,25 C9,25 9,15 5,15 Z" fill="#5d0f0f" />
                <path d="M15,15 C11,15 11,25 15,25 C19,25 19,15 15,15 Z" fill="#5d0f0f" />
                <path d="M10,10 C6,10 6,20 10,20 C14,20 14,10 10,10 Z" fill="#5d0f0f" />
              </svg>
            </div>
            
            <div className="handprint absolute top-1/2 right-[250px] opacity-60 rotate-12">
              <svg width="50" height="60" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,5 C5,5 5,10 10,10 C15,10 15,5 10,5 Z" fill="#5d0f0f" />
                <path d="M5,10 C1,10 1,15 5,15 C9,15 9,10 5,10 Z" fill="#5d0f0f" />
                <path d="M15,10 C11,10 11,15 15,15 C19,15 19,10 15,10 Z" fill="#5d0f0f" />
                <path d="M5,15 C1,15 1,25 5,25 C9,25 9,15 5,15 Z" fill="#5d0f0f" />
                <path d="M15,15 C11,15 11,25 15,25 C19,25 19,15 15,15 Z" fill="#5d0f0f" />
                <path d="M10,10 C6,10 6,20 10,20 C14,20 14,10 10,10 Z" fill="#5d0f0f" />
              </svg>
            </div>
            
            <div className="handprint absolute bottom-1/4 left-[180px] opacity-50 -rotate-5 scale-90 animate-pulse-slow">
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
        </div>
        
        {/* Video Section */}
        <div 
          ref={videoSectionRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30 video-section"
          style={{
            background: `radial-gradient(circle, rgba(10,10,10,0.8) 0%, rgba(0,0,0,1) 100%)`,
            backdropFilter: 'blur(5px)'
          }}
        >
          <h2 
            className="text-4xl md:text-5xl font-creepy text-red-600 mb-8 tracking-wider flicker-anim uppercase"
            style={{
              textShadow: '0 0 15px rgba(220, 38, 38, 0.8)',
              transform: `translate(${(cursorPosition.x - 0.5) * -15}px, ${(cursorPosition.y - 0.5) * -15}px)`,
              animation: 'textReveal 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards'
            }}
          >
            Enter the Nightmare
          </h2>
          
          <div className="w-full max-w-3xl px-4 transform transition-all duration-700"
            style={{
              transform: currentProgress > 0.8 ? 'scale(1)' : 'scale(0.95)',
              opacity: currentProgress > 0.8 ? 1 : 0.8,
              boxShadow: `0 0 ${30 + (currentProgress * 30)}px rgba(220, 38, 38, 0.3)`,
              animation: 'fadeIn 0.8s ease forwards'
            }}
          >
            <div className="relative pb-[56.25%] w-full overflow-hidden rounded-lg shadow-2xl border-2 border-red-900/70">
              {!showVideo ? (
                <div 
                  className="absolute inset-0 cursor-pointer bg-black group"
                  onClick={handleThumbnailClick}
                >
                  {/* Thriller thumbnail with play button overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700" 
                    style={{ 
                      backgroundImage: 'url("https://i.ytimg.com/vi/sOnqjkJTMaA/maxresdefault.jpg")',
                      transform: `scale(${1 + ((1 - currentProgress) * 0.1)})`,
                      filter: `brightness(${0.7 + (currentProgress * 0.3)}) contrast(${1 + (currentProgress * 0.2)})` 
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-red-700 bg-opacity-80 flex items-center justify-center hover:scale-110 transition-transform transform duration-300 group-hover:bg-red-600 pulse-effect">
                      <svg className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-gray-300 px-4 animate-fade-in">
                    Click to play Michael Jackson - Thriller
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full">
                  {youtubeError ? (
                    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4">
                      <div className="text-red-600 font-creepy text-2xl mb-4">Video failed to load</div>
                      <p className="text-gray-400 text-center mb-4">
                        Unable to load the YouTube video due to Content Security Policy or connection issues.
                      </p>
                      <a 
                        href="https://www.youtube.com/watch?v=sOnqjkJTMaA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded transition-colors"
                      >
                        Watch on YouTube
                      </a>
                      <button 
                        className="mt-4 text-gray-500 underline"
                        onClick={() => setShowVideo(false)}
                      >
                        Return to thumbnail
                      </button>
                    </div>
                  ) : (
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/sOnqjkJTMaA?rel=0&autoplay=1&modestbranding=1&iv_load_policy=3" 
                      title="Michael Jackson - Thriller (Official Video)" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ pointerEvents: 'auto' }}
                      onError={handleYoutubeError}
                    ></iframe>
                  )}
                  <div 
                    className="absolute inset-0 w-full h-full z-10" 
                    style={{ pointerEvents: 'none' }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Overlay to capture events */}
        <div className="absolute inset-0 z-50" style={{ pointerEvents: 'none' }}></div>
      </div>
    </>
  )
}

export default App
