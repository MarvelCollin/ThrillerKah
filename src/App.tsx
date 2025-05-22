import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BackgroundEffects from './components/BackgroundEffects';
import VideoFrame from './components/VideoFrame';

function App() {
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEntered, setIsEntered] = useState(false);
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    setMousePosition({ x, y });
    
    if (document.documentElement) {
      document.documentElement.style.setProperty('--x', `${x}%`);
      document.documentElement.style.setProperty('--y', `${y}%`);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 2, 
          ease: "power4.out" 
        }
      );
    }

    
    const fogElements = document.querySelectorAll('.fog-element');
    fogElements.forEach((fog, index) => {
      gsap.to(fog, {
        x: `${(index % 2 === 0 ? '+=' : '-=')}${Math.random() * 30 + 20}%`,
        opacity: Math.random() * 0.3 + 0.2,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    
    const createBloodDrip = () => {
      if (!containerRef.current) return;
      
      const drip = document.createElement('div');
      drip.className = 'absolute w-1 h-6 bg-[#8B0000] rounded-b-full animate-blood-drip';
      drip.style.left = `${Math.random() * 100}%`;
      drip.style.top = '0';
      drip.style.opacity = '0';
      containerRef.current.appendChild(drip);
      
      
      setTimeout(() => {
        drip.remove();
      }, 4000);
    };

    
    const bloodInterval = setInterval(createBloodDrip, 3000);
    
    
    const createSpiderWebs = () => {
      if (!containerRef.current) return;
      
      const corners = [
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, left: 0, rotate: -90 },
        { bottom: 0, right: 0, rotate: 180 }
      ];
      
      corners.forEach((position) => {
        const web = document.createElement('div');
        web.className = 'spider-web absolute';
        
        
        Object.entries(position).forEach(([key, value]) => {
          if (key !== 'rotate') {
            web.style[key as any] = '0';
          }
        });
        
        if (position.rotate) {
          web.style.transform = `rotate(${position.rotate}deg)`;
        }
        
        containerRef.current?.appendChild(web);
      });
    };
    
    createSpiderWebs();
    
    
    const createBloodSplatters = () => {
      if (!containerRef.current) return;
      
      for (let i = 0; i < 5; i++) {
        const splatter = document.createElement('div');
        splatter.className = 'blood-splatter';
        splatter.style.top = `${Math.random() * 100}%`;
        splatter.style.left = `${Math.random() * 100}%`;
        splatter.style.transform = `scale(${Math.random() * 1.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
        containerRef.current.appendChild(splatter);
      }
    };
    
    createBloodSplatters();
    
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(bloodInterval);
    };
  }, []);
  const handleEnterClick = () => {
    setIsEntered(true);
        if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: '#0a0505',
        duration: 2,
        ease: "power2.inOut"
      });
    }

    setTimeout(() => {
      teamRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };
  return (
    <div className="min-h-screen overflow-hidden relative" ref={containerRef}>
      <BackgroundEffects />
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-[#8B0000]/20 rounded-br-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-[#8B0000]/20 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 border-b-2 border-l-2 border-[#8B0000]/20 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-[#8B0000]/20 rounded-tl-3xl"></div>
      </div>      {!isEntered ? (
        <section className="hero-section relative flex flex-col items-center justify-center min-h-screen p-4" ref={titleRef}>
          <div className="absolute top-20 w-40 h-40 bg-[#fffeec]/5 rounded-full blur-3xl animate-flicker"></div>
          <div className="relative mb-8">
            <h1 className="text-7xl md:text-9xl font-bold tracking-widest text-center text-white animate-flicker horror-text" style={{ fontFamily: "'Horror Font', sans-serif" }}>
              THRILLER
              <span className="text-[#8B0000]">KAH</span>
            </h1>
            <div className="animate-pulse-shadow absolute inset-0 rounded-lg blur-md -z-10"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-[#cccccc] max-w-3xl text-center mb-10 animate-float">
            Where your deepest <span className="text-[#8B0000] font-bold">fears</span> come to life
          </p>
          
          <button 
            className="px-8 py-4 bg-[#8B0000] hover:bg-[#410000] text-white font-bold rounded-md transition-all duration-300 transform hover:scale-105 relative overflow-hidden shadow-lg shadow-[#8B0000]/30"
            onClick={handleEnterClick}
          >
            <span className="relative z-10 tracking-wider text-lg">ENTER IF YOU DARE</span>
            <span className="absolute inset-0 bg-white/10 animate-pulse opacity-0 hover:opacity-100 transition-opacity"></span>
          </button>
        </section>      ) : (        <div className="flex flex-col items-center justify-start min-h-screen transition-all duration-1000">
          <div ref={teamRef} className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-4xl md:text-6xl font-bold text-[#8B0000] mb-12 animate-flicker horror-text text-center">
              TEAM MEMBERS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">{[
                "2702280352 - Marvel Collin",
                "2702249801 - Hansel Jonathan Huistra",
                "2702280384 - Mike Grady Layandri",
                "2702282433 - Muhammad Azaryan Anwar",
                "2702277420 - Beatrix Claudya Sihombing",
                "2702360151 - Farhandy Ramadhan",
                "2702290536 - Alfredo Rodrigo",
                "2702317512 - Agus Irfandono"
              ].map((member) => {
                const [nim, name] = member.split(" - ");
                return (                  <div 
                    key={nim} 
                    className="group bg-gradient-to-br from-black/60 to-[#200000]/60 backdrop-blur-md p-6 lg:p-8 rounded-xl 
                             border border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-500 
                             shadow-lg hover:shadow-[#8B0000]/30 hover:shadow-xl transform hover:-translate-y-2 
                             cursor-pointer overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-[#8B0000] transition-colors duration-300 line-clamp-2">
                      {name}
                    </h3>
                    <p className="text-base lg:text-lg text-[#cccccc] tracking-wider font-mono opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {nim}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>          {/* Video Section */}
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-12">
            <VideoFrame 
              videoId="dQw4w9WgXcQ"
              title="Watch If You Dare"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

