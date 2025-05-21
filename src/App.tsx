import { useEffect, useRef } from 'react'
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
  
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((st: any) => st.kill());
    
    // --- PHASE 1: Title Animations ---
    // Initial fade-in animations
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
    }, "-=1")
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
    
    // Title section element fade out on scroll
    gsap.to([titleRef.current, subtitleRef.current, scrollPromptRef.current], {
      opacity: 0,
      y: -50,
      ease: "power2.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "5% top",
        end: "20% top",
        scrub: true,
        id: "fadeOutTitle"
      }
    });
    
    // --- PHASE 2: Door Animation ---
    // Door section setup
    ScrollTrigger.create({
      trigger: doorContainerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleClass: {targets: doorContainerRef.current, className: "visible"},
      once: true,
      id: "doorReveal"
    });
    
    // Door opening animation
    const doorTl = gsap.timeline({
      scrollTrigger: {
        trigger: doorContainerRef.current,
        start: "top 30%",
        end: "+=60%",
        scrub: 0.8,
        id: "doorOpen"
      }
    });
    
    doorTl
      .to(doorLeftRef.current, {
        rotateY: 110,
        x: "-100%",
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.inOut"
      })
      .to(doorRightRef.current, {
        rotateY: -110,
        x: "100%",
        transformOrigin: "right",
        duration: 1.5,
        ease: "power2.inOut"
      }, "<");
      
    // Add lighting effect behind the door
    doorTl
      .fromTo(".door-light", 
        { opacity: 0 },
        { opacity: 0.9, duration: 0.8 },
        "<0.5"
      );
      
    // --- PHASE 3: Video Section ---
    ScrollTrigger.create({
      trigger: videoSectionRef.current,
      start: "top 50%",
      toggleClass: {targets: videoSectionRef.current, className: "visible"},
      once: true,
      id: "videoReveal"
    });
    
    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="h-[300vh] bg-black text-white overflow-hidden">
      {/* Phase 1: Title Section */}
      <section className="h-screen flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900 to-black opacity-40"></div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)] opacity-60 pointer-events-none"></div>
        
        {/* Random blood drips */}
        <div className="absolute top-0 left-[10%] w-12 h-40 opacity-80">
          <div className="w-4 h-40 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
          <div className="w-8 h-5 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className="absolute top-0 right-[15%] w-8 h-28 opacity-60">
          <div className="w-3 h-28 mx-auto bg-gradient-to-b from-red-900 to-red-900/10"></div>
          <div className="w-6 h-4 rounded-full bg-red-900 absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        <h1 
          ref={titleRef} 
          className="text-7xl md:text-8xl font-creepy text-red-600 tracking-wider flicker-anim z-10"
        >
          THRILLER
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-400 mt-8 font-sans tracking-wider z-10 text-center px-4"
        >
          YOUR NIGHTMARE AWAITS
        </p>
        
        <div 
          ref={scrollPromptRef}
          className="absolute bottom-10 flex flex-col items-center z-10"
        >
          <p className="text-gray-500 mb-2">Scroll Down</p>
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V34M12 34L2 24M12 34L22 24" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="absolute inset-0 z-5 bg-film-grain opacity-15 pointer-events-none mix-blend-overlay"></div>

        {/* Floating particles effect */}
        <div className="particles-container absolute inset-0 pointer-events-none">
          <div className="particle w-1 h-1 bg-red-500/30 absolute top-[10%] left-[20%] animate-float-slow"></div>
          <div className="particle w-1 h-1 bg-red-500/20 absolute top-[20%] left-[50%] animate-float-medium"></div>
          <div className="particle w-1 h-1 bg-red-500/40 absolute top-[70%] left-[80%] animate-float"></div>
          <div className="particle w-2 h-2 bg-red-700/20 absolute top-[40%] left-[10%] animate-float-medium"></div>
          <div className="particle w-1 h-1 bg-red-600/30 absolute top-[60%] left-[30%] animate-float-slow"></div>
          <div className="particle w-2 h-2 bg-red-600/20 absolute top-[30%] left-[70%] animate-float"></div>
          <div className="particle w-1 h-1 bg-red-500/30 absolute top-[80%] left-[40%] animate-float-medium"></div>
          <div className="particle w-1 h-1 bg-red-600/40 absolute top-[25%] left-[65%] animate-float-slow"></div>
        </div>
      </section>
      
      {/* Phase 2: Door Animation Section */}
      <section 
        ref={doorContainerRef} 
        className="h-screen opacity-0 flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
        
        {/* Door frame and light effect */}
        <div className="relative w-[300px] h-[450px] border-8 border-gray-800 bg-black z-10 overflow-hidden">
          {/* Door light behind the door */}
          <div className="door-light absolute inset-0 bg-gradient-radial from-red-900/60 to-black opacity-0 z-10"></div>
          
          {/* Door panels */}
          <div ref={doorLeftRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#1a1a1a] border-r-2 border-gray-900 z-20">
            <div className="absolute top-1/2 right-2 w-3 h-8 bg-[#3a3a3a] rounded-sm"></div>
          </div>
          <div ref={doorRightRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#1a1a1a] border-l-2 border-gray-900 z-20">
            <div className="absolute top-1/2 left-2 w-3 h-8 bg-[#3a3a3a] rounded-sm"></div>
          </div>
        </div>
        
        {/* Handprints on the door */}
        <div className="absolute z-30 pointer-events-none">
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
        
        <div className="absolute inset-0 z-5 bg-film-grain opacity-20 pointer-events-none mix-blend-overlay"></div>
      </section>
      
      {/* Phase 3: Video Section */}
      <section 
        ref={videoSectionRef}
        className="h-screen opacity-0 flex flex-col items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80 z-0"></div>
        
        <h2 className="text-4xl md:text-5xl font-creepy text-red-600 mb-8 tracking-wider z-10 flicker-anim">ENTER THE NIGHTMARE</h2>
        
        <div className="w-full max-w-3xl px-4 z-10">
          <div className="relative pb-[56.25%] w-full overflow-hidden rounded-lg shadow-2xl border-2 border-red-900/70">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/sOnqjkJTMaA?rel=0" 
              title="Michael Jackson - Thriller (Official Video)" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="absolute inset-0 z-5 bg-film-grain opacity-10 pointer-events-none mix-blend-overlay"></div>
      </section>
    </div>
  )
}

export default App
