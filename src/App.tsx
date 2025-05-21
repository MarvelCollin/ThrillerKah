import { useEffect, useRef, useState } from 'react'
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
  
  const [showVideo, setShowVideo] = useState(false);

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
    
    // Set up the scroll container effects
    document.body.style.overflow = 'hidden';
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    
    let animation = {value: 0};
    
    // Create animation timeline
    const masterTimeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const progress = masterTimeline.progress();
        if (progress > 0.7 && !showVideo) {
          // Make video section visible when reaching the end
          gsap.to(videoSectionRef.current, {
            opacity: 1,
            duration: 0.3
          });
        }
      }
    });
    
    // Title fade-out animation
    masterTimeline.to([titleRef.current, subtitleRef.current, scrollPromptRef.current], {
      opacity: 0,
      y: -30,
      duration: 20,
      stagger: 2
    }, 0);
    
    // Door appearing
    masterTimeline.fromTo(doorContainerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 20 },
      10
    );
    
    // Door opening
    masterTimeline.to(doorLeftRef.current, {
      rotateY: 110,
      x: "-100%",
      transformOrigin: "left",
      duration: 30,
      ease: "power2.inOut"
    }, 30);
    
    masterTimeline.to(doorRightRef.current, {
      rotateY: -110,
      x: "100%",
      transformOrigin: "right",
      duration: 30,
      ease: "power2.inOut"
    }, 30);
    
    // Door light effect
    masterTimeline.to(".door-light", {
      opacity: 0.9,
      duration: 20
    }, 35);
    
    // Door fade out and video appear
    masterTimeline.to(doorContainerRef.current, {
      opacity: 0,
      duration: 20
    }, 60);
    
    masterTimeline.fromTo(videoSectionRef.current,
      { opacity: 0, scale: 0.9 },
      { scale: 1, duration: 20 },
      70
    );
    
    // Update the animation based on scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = (e.deltaY * 0.002) || 0;
      const newValue = Math.min(Math.max(animation.value + delta, 0), 1);
      animation.value = newValue;
      masterTimeline.progress(newValue);
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Handle touch for mobile
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.005;
      const newValue = Math.min(Math.max(animation.value + delta, 0), 1);
      animation.value = newValue;
      masterTimeline.progress(newValue);
      touchStartY = touchY;
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [showVideo]);
  
  // Video thumbnail click
  const handleThumbnailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
  };
  
  return (
    <div ref={containerRef} className="h-screen bg-black text-white overflow-hidden relative">
      {/* Progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div className="h-full bg-red-700 progress-bar"></div>
      </div>
      
      {/* Instruction */}
      <div className="fixed bottom-5 left-0 right-0 text-center text-gray-500 text-sm z-50">
        Scroll up/down to control
      </div>
      
      {/* Common background elements */}
      <div className="absolute inset-0 bg-film-grain opacity-15 pointer-events-none mix-blend-overlay z-0"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900 to-black opacity-40 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)] opacity-60 pointer-events-none z-0"></div>
      
      {/* Random blood drips */}
      <div className="absolute top-0 left-[10%] w-12 h-40 opacity-80 z-0">
        <div className="w-4 h-40 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
        <div className="w-8 h-5 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
      </div>
      <div className="absolute top-0 right-[15%] w-8 h-28 opacity-60 z-0">
        <div className="w-3 h-28 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
        <div className="w-6 h-4 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="particles-container absolute inset-0 pointer-events-none z-0">
        <div className="particle w-1 h-1 bg-red-500/30 absolute top-[10%] left-[20%] animate-float-slow"></div>
        <div className="particle w-1 h-1 bg-red-500/20 absolute top-[20%] left-[50%] animate-float-medium"></div>
        <div className="particle w-1 h-1 bg-red-500/40 absolute top-[70%] left-[80%] animate-float"></div>
        <div className="particle w-2 h-2 bg-red-700/20 absolute top-[40%] left-[10%] animate-float-medium"></div>
        <div className="particle w-1 h-1 bg-red-600/30 absolute top-[60%] left-[30%] animate-float-slow"></div>
        <div className="particle w-2 h-2 bg-red-600/20 absolute top-[30%] left-[70%] animate-float"></div>
        <div className="particle w-1 h-1 bg-red-500/30 absolute top-[80%] left-[40%] animate-float-medium"></div>
        <div className="particle w-1 h-1 bg-red-600/40 absolute top-[25%] left-[65%] animate-float-slow"></div>
      </div>
      
      {/* Title Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 
          ref={titleRef} 
          className="text-7xl md:text-8xl font-creepy text-red-600 tracking-wider flicker-anim uppercase"
        >
          Thriller
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-400 mt-8 font-sans tracking-wider text-center px-4"
        >
          YOUR NIGHTMARE AWAITS
        </p>
        
        <div 
          ref={scrollPromptRef}
          className="absolute bottom-16 flex flex-col items-center z-10"
        >
          <p className="text-gray-500 mb-2">Scroll Down</p>
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V34M12 34L2 24M12 34L22 24" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Door Section */}
      <div 
        ref={doorContainerRef} 
        className="absolute inset-0 flex items-center justify-center opacity-0 z-20"
      >
        {/* Door frame and light effect */}
        <div className="relative w-[300px] h-[450px] border-8 border-gray-800 bg-black overflow-hidden">
          {/* Door light behind the door */}
          <div className="door-light absolute inset-0 bg-gradient-radial from-red-900/60 to-black opacity-0"></div>
          
          {/* Door panels */}
          <div ref={doorLeftRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#1a1a1a] border-r-2 border-gray-900">
            <div className="absolute top-1/2 right-2 w-3 h-8 bg-[#3a3a3a] rounded-sm"></div>
          </div>
          <div ref={doorRightRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#1a1a1a] border-l-2 border-gray-900">
            <div className="absolute top-1/2 left-2 w-3 h-8 bg-[#3a3a3a] rounded-sm"></div>
          </div>
        </div>
        
        {/* Handprints on the door */}
        <div className="absolute pointer-events-none">
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
        </div>
      </div>
      
      {/* Video Section */}
      <div 
        ref={videoSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30"
      >
        <h2 className="text-4xl md:text-5xl font-creepy text-red-600 mb-8 tracking-wider flicker-anim uppercase">Enter the Nightmare</h2>
        
        <div className="w-full max-w-3xl px-4">
          <div className="relative pb-[56.25%] w-full overflow-hidden rounded-lg shadow-2xl border-2 border-red-900/70">
            {!showVideo ? (
              <div 
                className="absolute inset-0 cursor-pointer bg-black"
                onClick={handleThumbnailClick}
              >
                {/* Thriller thumbnail with play button overlay */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://i.ytimg.com/vi/sOnqjkJTMaA/maxresdefault.jpg")' }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-700 bg-opacity-80 flex items-center justify-center">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-gray-300 px-4">
                  Click to play Michael Jackson - Thriller
                </div>
              </div>
            ) : (
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/sOnqjkJTMaA?rel=0&autoplay=1" 
                title="Michael Jackson - Thriller (Official Video)" 
                allow="autoplay" 
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
