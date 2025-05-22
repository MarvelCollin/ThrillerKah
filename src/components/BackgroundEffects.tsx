import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundEffects = () => {
  const bgEffectsRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<any[]>([]);
  
  useEffect(() => {
    if (!bgEffectsRef.current) return;
    animationsRef.current = [];
    
    const noiseTexture = document.createElement('div');
    noiseTexture.className = 'noise-texture';
    noiseTexture.style.cssText = `
      position: fixed;
      inset: 0;
      opacity: 0.035;
      z-index: 1;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      will-change: transform;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    `;
    bgEffectsRef.current!.appendChild(noiseTexture);
    
    const baseGradient = document.createElement('div');
    baseGradient.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        rgba(30, 0, 0, 0.2) 0%,
        rgba(10, 0, 0, 0.4) 60%,
        rgba(5, 0, 0, 0.6) 100%
      );
      pointer-events: none;
      z-index: 2;
      opacity: 0;
      transform: translate3d(0, 0, 0);
      will-change: transform, opacity;
    `;
    bgEffectsRef.current!.appendChild(baseGradient);
    
    gsap.to(baseGradient, {
      opacity: 0.9,
      duration: 2.5,
      ease: "power2.out"
    });
    animationsRef.current.push(baseGradient);
    
    const createAtmosphericElements = () => {
      const mistCount = window.innerWidth > 768 ? 5 : 3;
      
      for (let i = 0; i < mistCount; i++) {
        const depth = i / mistCount;
        
        const mist = document.createElement('div');
        mist.className = 'fog-element';
        mist.style.cssText = `
          position: fixed;
          top: ${30 + (Math.random() * 40)}%;
          height: ${30 + (Math.random() * 40)}vh;
          width: ${80 + (Math.random() * 40)}vw;
          left: ${-20 + (Math.random() * 20)}vw;
          opacity: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 0, 0, 0.01) 0%,
            rgba(30, 0, 0, 0.03) 70%,
            transparent 100%
          );
          filter: blur(${8 + (depth * 12)}px);
          border-radius: 40%;
          transform: translate3d(0, 0, 0) scale(${1 - (depth * 0.3)});
          z-index: ${2 + i};
          pointer-events: none;
          will-change: transform, opacity;
        `;
        
        bgEffectsRef.current!.appendChild(mist);
        
        gsap.to(mist, {
          opacity: 0.1 + (0.1 * (1 - depth)),
          duration: 3 + (depth * 2),
          delay: 1 + (depth * 0.5),
          ease: "power2.inOut"
        });
        
        const animDuration = 45 + (20 * (1 - depth));
        
        gsap.to(mist, {
          x: `${100 + (Math.random() * 20)}vw`,
          y: (Math.random() - 0.5) * 50,
          duration: animDuration,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
        
        animationsRef.current.push(mist);
      }
    };
    
    createAtmosphericElements();
    
    const vignette = document.createElement('div');
    vignette.className = 'vignette-effect';
    vignette.style.cssText = `
      position: fixed;
      inset: 0;
      box-shadow: inset 0 0 150px 60px rgba(0, 0, 0, 0.8);
      pointer-events: none;
      z-index: 5;
      opacity: 0;
      transform: translate3d(0, 0, 0);
      will-change: opacity;
    `;
    bgEffectsRef.current!.appendChild(vignette);
    
    gsap.to(vignette, {
      opacity: 1,
      duration: 4,
      ease: "power2.inOut"
    });
    animationsRef.current.push(vignette);
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(139, 0, 0, 0.05) 0%,
        rgba(20, 0, 0, 0.1) 100%
      );
      pointer-events: none;
      z-index: 4;
      opacity: 0;
      mix-blend-mode: overlay;
      transform: translate3d(0, 0, 0);
      will-change: opacity;
    `;
    bgEffectsRef.current!.appendChild(overlay);
    
    gsap.to(overlay, {
      opacity: 1,
      duration: 3,
      ease: "power2.inOut"
    });
    
    const createDustParticles = () => {
      const particleCount = window.innerWidth > 768 ? 30 : 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        const size = Math.random() * 3 + 1;
        const depth = Math.random();
        const speed = Math.random() * 100 + 50;
        
        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          background-color: rgba(255, 255, 255, ${0.1 + (depth * 0.2)});
          border-radius: 50%;
          filter: blur(${(1 - depth) * 1.5}px);
          transform: translate3d(0, 0, 0) scale(1);
          z-index: ${Math.floor(depth * 5) + 2};
          pointer-events: none;
          opacity: 0;
          will-change: transform, opacity;
        `;
        
        bgEffectsRef.current!.appendChild(particle);
        
        gsap.to(particle, {
          opacity: 0.3 + (Math.random() * 0.6),
          duration: 2 + (Math.random() * 3),
          delay: Math.random() * 2,
          ease: "power2.out"
        });
        
        gsap.to(particle, {
          y: `+=${window.innerHeight}`,
          duration: speed,
          repeat: -1,
          ease: "none",
          delay: Math.random() * speed
        });
        
        animationsRef.current.push(particle);
      }
    };
    
    createDustParticles();
    
    return () => {
      animationsRef.current.forEach((element) => {
        gsap.killTweensOf(element);
        element.remove();
      });
    };
  }, []);
  
  return (
    <div 
      ref={bgEffectsRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] background-effects"
      aria-hidden="true"
    ></div>
  );
};

export default BackgroundEffects;