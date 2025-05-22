import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BackgroundEffects from './components/BackgroundEffects';
import BloodRain from './components/BloodRain';
import FloatingElements from './components/FloatingElements';

function App() {
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
        background: 'linear-gradient(to bottom, #0a0505, #200000)',
        duration: 2,
        ease: "power2.inOut"
      });
      
      
      const createHeartbeatEffect = () => {
        gsap.to('body', {
          scale: 1.01,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      };
      
      createHeartbeatEffect();
    }
  };

  return (
    <div className="bg-dark-horror min-h-screen overflow-hidden relative" ref={containerRef}>
      {/* Spotlight Effect */}
      <div className="spotlight"></div>
      
      {/* Fog Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="fog-element absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#333333]/5 to-transparent opacity-20 animate-fog"></div>
        <div className="fog-element absolute top-20 left-10 w-full h-full bg-gradient-to-r from-[#333333]/5 via-transparent to-[#333333]/5 opacity-15 animate-fog"></div>
        <div className="fog-element absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-transparent via-[#333333]/5 to-transparent opacity-20 animate-fog"></div>
      </div>

      {/* Scratch marks in corners */}
      <div className="absolute top-10 left-5 scratch"></div>
      <div className="absolute bottom-10 right-5 scratch" style={{ transform: 'rotate(180deg)' }}></div>
      
      {/* Spider web corners */}
      <div className="absolute top-0 left-0 w-36 h-36 border-t-2 border-l-2 border-[#333333]/30 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-36 h-36 border-t-2 border-r-2 border-[#333333]/30 rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 border-b-2 border-l-2 border-[#333333]/30 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-36 h-36 border-b-2 border-r-2 border-[#333333]/30 rounded-br-3xl"></div>
      
      {!isEntered ? (
        /* Title Section */
        <section className="hero-section relative flex flex-col items-center justify-center min-h-screen p-4" ref={titleRef}>
          {/* Flickering chandelier light */}
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
        </section>
      ) : (
        /* Content after entering */
        <section className="flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-1000">
          <h2 className="text-4xl md:text-6xl font-bold text-[#8B0000] mb-6 animate-flicker horror-text">
            TEAM MEMBERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {[
              "2702280352 - Marvel Collin",
              "2702249801 - Hansel Jonathan Huistra",
              "2702280384 - Mike Grady Layandri",
              "2702282433 - Muhammad Azaryan Anwar",
              "2702277420 - Beatrix Claudya Sihombing",
              "2702360151 - Farhandy Ramadhan",
              "2702290536 - Alfredo Rodrigo",
              "2702317512 - Agus Irfandono"
            ].map((member) => (
              <div 
                key={member} 
                className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#8B0000]/20"
              >
                <h3 className="text-2xl font-bold mb-2 text-white">{member.split(" - ")[1]}</h3>
                <p className="text-[#cccccc]">{member.split(" - ")[0]}</p>
                <div className="mt-4 h-40 bg-[#0a0505]/80 rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;

