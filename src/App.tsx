import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BackgroundEffects from './components/BackgroundEffects';
import VideoFrame from './components/VideoFrame';

function App() {
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);
  
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
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
          duration: 2.5, 
          ease: "power3.out" 
        }
      );
    }
    
    const fogElements = document.querySelectorAll('.fog-element');
    fogElements.forEach((fog, index) => {
      gsap.to(fog, {
        x: `${(index % 2 === 0 ? '+=' : '-=')}${Math.random() * 20 + 15}%`, 
        opacity: Math.random() * 0.2 + 0.1, 
        duration: Math.random() * 25 + 20, 
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    const createBloodDrip = () => {
      if (!containerRef.current) return;
      
      const drip = document.createElement('div');
      const dripWidth = Math.random() * 2 + 0.5;
      const dripHeight = Math.random() * 10 + 4;
      const dripOpacity = Math.random() * 0.3 + 0.7;
      
      drip.className = 'absolute bg-[#8B0000] rounded-b-full animate-blood-drip';
      drip.style.cssText = `
        width: ${dripWidth}px; 
        height: ${dripHeight}px; 
        left: ${Math.random() * 100}%; 
        top: 0; 
        opacity: 0;
        filter: blur(${dripWidth / 4}px);
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;
      `;
      
      containerRef.current.appendChild(drip);
      
      gsap.timeline()
        .to(drip, {
          opacity: dripOpacity,
          duration: 0.5,
          ease: "power1.in"
        })
        .to(drip, {
          y: window.innerHeight,
          duration: 3 + Math.random() * 2,
          ease: "power2.in",
          delay: Math.random() * 0.5
        })
        .to(drip, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => drip.remove()
        }, "-=0.5");
    };

    
    const createRandomDrip = () => {
      createBloodDrip();
      setTimeout(createRandomDrip, Math.random() * 3000 + 1000);
    };
    
    createRandomDrip();
    
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
        web.className = 'spider-web absolute opacity-0';
        
        Object.entries(position).forEach(([key, value]) => {
          if (key !== 'rotate') {
            web.style[key as any] = `${value}`;
          }
        });
        
        if (position.rotate) {
          web.style.transform = `rotate(${position.rotate}deg) translate3d(0, 0, 0)`;
        }
        
        containerRef.current?.appendChild(web);
        
        gsap.to(web, {
          opacity: 0.3,
          duration: 2,
          delay: Math.random() * 2
        });
      });
    };
    
    createSpiderWebs();
    
    const createBloodSplatters = () => {
      if (!containerRef.current) return;
      
      for (let i = 0; i < 5; i++) {
        const splatter = document.createElement('div');
        splatter.className = 'blood-splatter';
        
        const scale = Math.random() * 1.5 + 0.5;
        const rotation = Math.random() * 360;
        
        splatter.style.cssText = `
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          transform: scale(${scale}) rotate(${rotation}deg) translate3d(0, 0, 0);
          opacity: 0;
          will-change: transform, opacity;
        `;
        
        containerRef.current.appendChild(splatter);
        
        gsap.to(splatter, {
          opacity: 0.2 + (Math.random() * 0.1),
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 3
        });
      }
    };
    
    createBloodSplatters();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
    const handleEnterClick = () => {    setIsEntered(true);        if (containerRef.current) {      const tl = gsap.timeline();            tl.to(containerRef.current, {        backgroundColor: 'rgba(5, 0, 0, 0.9)',        duration: 1.5,        ease: "power2.in"      })      .to(containerRef.current, {        backgroundColor: '#0a0505',        duration: 2,        ease: "power2.out"      });            const flash = document.createElement('div');      flash.style.cssText = `        position: fixed;        inset: 0;        background-color: rgba(139, 0, 0, 0.1);        z-index: 100;        pointer-events: none;        opacity: 0;      `;            document.body.appendChild(flash);            gsap.to(flash, {        opacity: 0.3,        duration: 0.2,        ease: "power1.in",        onComplete: () => {          gsap.to(flash, {            opacity: 0,            duration: 0.5,            ease: "power1.out",            onComplete: () => flash.remove()          });        }      });    }

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
      </div>
      
      {!isEntered ? (
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
            Multimedia <span className="text-[#8B0000] font-bold">System</span> 
          </p>
          
          <button 
            className="px-8 py-4 bg-[#8B0000] hover:bg-[#410000] text-white font-bold rounded-md transition-all duration-300 transform hover:scale-105 relative overflow-hidden shadow-lg shadow-[#8B0000]/30"
            onClick={handleEnterClick}
          >
            <span className="relative z-10 tracking-wider text-lg">REVEAL THE TRUTH</span>
            <span className="absolute inset-0 bg-white/10 animate-pulse opacity-0 hover:opacity-100 transition-opacity"></span>
          </button>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-start min-h-screen transition-all duration-1000">
          <div ref={teamRef} className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-4xl md:text-6xl font-bold text-[#8B0000] mb-12 animate-flicker horror-text text-center">
              HAUNTED MEMBERS
            </h2>            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[
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
                return (
                  <div 
                    key={nim} 
                    className="group bg-gradient-to-br from-black/60 to-[#200000]/60 backdrop-blur-md p-6 lg:p-8 rounded-xl 
                             border border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-500 
                             shadow-lg hover:shadow-[#8B0000]/30 hover:shadow-xl transform hover:-translate-y-2 
                             cursor-pointer overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-[#8B0000] transition-colors duration-300 line-clamp-2">
                      {name}
                    </h3>
                    <p className="text-base lg:text-lg text-[#cccccc] tracking-wider font-mono opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {nim}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <VideoFrame 
              videoId="dQw4w9WgXcQ"
              title="Our Video"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

