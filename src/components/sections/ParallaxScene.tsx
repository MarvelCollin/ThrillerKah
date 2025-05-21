import React, { useEffect, useRef } from 'react';

const ParallaxScene: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clean up any existing ScrollTriggers with these IDs
    const cleanupScrollTriggers = () => {
      ScrollTrigger.getAll().forEach((st: any) => {
        if (st.vars.id && st.vars.id.includes("scene")) {
          st.kill();
        }
      });
    };
    
    cleanupScrollTriggers();
    
    // Main pin for scene
    const mainST = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: 'top top',
      end: 'bottom top',
      id: "parallax-scene",
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
    });
    
    const layers = layersRef.current?.querySelectorAll('.parallax-layer');
    
    if (layers) {
      layers.forEach((layer, i) => {
        const depth = 0.2 * i;
        
        gsap.to(layer, {
          y: `${-(100 - depth * 100)}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: sceneRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
            id: `scene-layer-${i}`,
          }
        });
      });
    }
    
    gsap.to(textRef.current, {
      y: '50%',
      opacity: 0,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: sceneRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: 1.5,
        id: "scene-text-fade",
      }
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.current,
        start: "top+=10% top",
        end: "bottom top",
        scrub: 1.5,
        id: "scene-horror-figure",
      }
    });
    
    tl.to(".horror-figure", {
      opacity: 0.9,
      scale: 1.1,
      y: -50,
      stagger: 0.1,
      ease: "power1.inOut",
      duration: 2
    });
    
    return () => {
      if (mainST) mainST.kill();
      cleanupScrollTriggers();
    };
  }, []);
  
  return (
    <div ref={sceneRef} className="h-screen relative overflow-hidden bg-black">
      <div ref={layersRef} className="absolute inset-0">
        <div className="parallax-layer absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80" />
        </div>
        
        <div className="parallax-layer absolute inset-0 z-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuODUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA3Ii8+PC9zdmc+')]" />
        </div>
        
        <div className="parallax-layer absolute inset-0 z-30">
          <div className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
            <svg width="300" height="300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#b91c1c" strokeWidth="0.5" />
              <path d="M30,50 L70,50 M50,30 L50,70" stroke="#b91c1c" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        <div className="parallax-layer absolute inset-0 z-40">
          <div className="absolute right-1/4 bottom-1/3 transform translate-x-1/2 translate-y-1/2 opacity-20">
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,50 L90,50 M10,30 L90,30 M10,70 L90,70" stroke="#b91c1c" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        <div className="parallax-layer absolute inset-0 z-50 pointer-events-none">
          <div className="horror-figure absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0">
            <svg width="100" height="120" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M25,5 L20,20 L30,20 Z" fill="#5d0f0f" />
              <path d="M20,20 L15,50 L35,50 L30,20 Z" fill="#5d0f0f" />
              <path d="M15,50 L10,60 M35,50 L40,60" stroke="#5d0f0f" strokeWidth="1" />
              <circle cx="22" cy="30" r="2" fill="#3a0808" />
              <circle cx="28" cy="30" r="2" fill="#3a0808" />
              <path d="M20,40 C25,43 25,43 30,40" stroke="#3a0808" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          <div className="horror-figure absolute right-1/3 bottom-1/4 transform translate-x-1/2 translate-y-1/2 opacity-0">
            <svg width="120" height="140" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
              <path d="M30,10 C20,10 10,25 20,40 C30,55 40,40 50,40 C60,40 50,10 30,10 Z" fill="#5d0f0f" />
              <path d="M20,30 C22,33 28,33 30,30" stroke="#3a0808" strokeWidth="1" fill="none" />
              <path d="M35,30 C37,33 43,33 45,30" stroke="#3a0808" strokeWidth="1" fill="none" />
              <path d="M30,40 L30,50 L25,60 M30,50 L35,60" stroke="#5d0f0f" strokeWidth="1" />
            </svg>
          </div>
          
          <div className="horror-figure absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0">
            <svg width="150" height="150" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#5d0f0f" strokeWidth="1" />
              <path d="M25,30 L35,30 M45,30 L55,30" stroke="#5d0f0f" strokeWidth="2" />
              <path d="M30,50 Q40,60 50,50" stroke="#5d0f0f" strokeWidth="2" fill="none" />
              <path d="M20,20 L60,60 M60,20 L20,60" stroke="#5d0f0f" strokeWidth="0.5" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
      
      <div 
        ref={textRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center"
      >
        <h2 className="text-6xl md:text-7xl font-display text-white mb-4 tracking-widest">DESCEND</h2>
        <p className="text-xl text-gray-400 max-w-lg font-sans">Your journey into the abyss begins now. Keep scrolling to face your deepest fears.</p>
      </div>
      
      <div className="absolute inset-0 z-60 pointer-events-none" style={{ 
        background: 'radial-gradient(circle at center, transparent 30%, black 100%)' 
      }} />
    </div>
  );
};

export default ParallaxScene; 