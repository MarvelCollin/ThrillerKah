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
    `;
    bgEffectsRef.current.appendChild(noiseTexture);
      const baseGradient = document.createElement('div');
    baseGradient.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        rgba(30, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.5) 70%,
        rgba(0, 0, 0, 0.7) 100%
      );
      opacity: 0.9;
      z-index: 2;
      pointer-events: none;
      transition: opacity 1.5s ease-in-out;
    `;
    bgEffectsRef.current.appendChild(baseGradient);
    
    const particleCount = 60; 
    const smallParticles = 40;
    
    for (let i = 0; i < particleCount; i++) {      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      
      const size = Math.random() * 10 + 3; 
      const isRed = Math.random() > 0.4;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background-color: ${isRed
          ? `rgba(255, 30, 30, ${Math.random() * 0.5 + 0.3})` 
          : `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`}; 
        box-shadow: 0 0 ${size * 5}px ${isRed
          ? `rgba(255, 0, 0, ${Math.random() * 0.6 + 0.3})` 
          : 'rgba(255, 255, 255, 0.5)'}, 
                   0 0 ${size * 1.5}px ${isRed
          ? 'rgba(255, 100, 100, 0.7)' 
          : 'rgba(255, 255, 255, 0.7)'}; 
        filter: blur(${size / 8}px); 
        border-radius: 50%;
        z-index: 10;
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
      `;
      
      bgEffectsRef.current.appendChild(particle);
      
      gsap.set(particle, {
        opacity: 0,
        scale: 0.5
      });
        const tl = gsap.timeline({repeat: -1, yoyo: true, repeatDelay: Math.random() * 0.5});
      
      tl.to(particle, {
        opacity: Math.random() * 0.6 + 0.2, 
        scale: Math.random() * 1.2 + 0.7, 
        duration: 2,
        ease: "power1.inOut"
      }).to(particle, {
        x: `${Math.random() * 180 - 90}px`, 
        y: `${Math.random() * 180 - 90}px`,
        scale: Math.random() * 1.5 + 0.8,
        boxShadow: `0 0 ${size * 6}px ${Math.random() > 0.3 
          ? `rgba(255, 0, 0, ${Math.random() * 0.5 + 0.2})` 
          : 'rgba(255, 255, 255, 0.4)'}`,
        duration: Math.random() * 18 + 25,
        ease: "sine.inOut"
      });
      
      animationsRef.current.push(tl);
    }
    
    for (let i = 0; i < smallParticles; i++) {
      const smallParticle = document.createElement('div');
      const tinySize = Math.random() * 2.5 + 0.5;
      
      smallParticle.style.cssText = `
        position: absolute;
        width: ${tinySize}px;
        height: ${tinySize}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background-color: ${Math.random() > 0.5 
          ? `rgba(255, 100, 100, ${Math.random() * 0.25 + 0.1})` 
          : `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`};
        box-shadow: 0 0 ${tinySize * 2}px ${Math.random() > 0.5
          ? 'rgba(255, 50, 50, 0.3)'
          : 'rgba(255, 255, 255, 0.2)'};
        border-radius: 50%;
        filter: blur(${tinySize / 4}px);
        z-index: 5;
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
      `;
      
      bgEffectsRef.current.appendChild(smallParticle);      const smallAnim = gsap.to(smallParticle, {
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        opacity: Math.random() * 0.2 + 0.05,
        duration: Math.random() * 30 + 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5
      });
      
      animationsRef.current.push(smallAnim);
    }
      const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0) 20%,
        rgba(10, 0, 0, 0.4) 60%,
        rgba(20, 0, 0, 0.7) 100%
      );
      pointer-events: none;
      z-index: 3;
      transition: opacity 1s ease;
    `;
    bgEffectsRef.current.appendChild(overlay);
    
    const mistCount = 4;
    for (let i = 0; i < mistCount; i++) {
      const mist = document.createElement('div');
      mist.style.cssText = `
        position: fixed;
        left: -100%;
        width: 200%;
        height: ${30 + Math.random() * 10}%;
        top: ${i * 30}%;
        opacity: ${Math.random() * 0.2 + 0.1};
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 0, 0, 0.03) 20%,
          rgba(255, 0, 0, 0.07) 50%,
          rgba(255, 0, 0, 0.03) 80%,
          transparent
        );
        filter: blur(15px);
        pointer-events: none;
        z-index: 2;
        will-change: transform;
        transform: translate3d(0, 0, 0);
      `;
      
      bgEffectsRef.current.appendChild(mist);
      
            const anim = gsap.to(mist, {
        x: '100%',
        duration: 35 + Math.random() * 15,
        repeat: -1,
        ease: "none",
        delay: i * 4
      });
      
      animationsRef.current.push(anim);
    }
      const vignette = document.createElement('div');
    vignette.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(
        ellipse at center, 
        transparent 60%, 
        rgba(0, 0, 0, 0.5) 100%
      );
      pointer-events: none;
      z-index: 4;
      opacity: 0;
    `;
    bgEffectsRef.current.appendChild(vignette);
    
    const vignetteAnim = gsap.to(vignette, {
      opacity: 0.7,
      duration: 3,
      ease: "power1.inOut"
    });
    animationsRef.current.push(vignetteAnim);
      const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(15, 0, 0, 0.7));
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      transition: opacity 1.5s ease-in-out;
    `;
    bgEffectsRef.current.appendChild(gradientOverlay);

    const gradientAnim = gsap.to(gradientOverlay, {
      opacity: 0.8,
      duration: 5,
      ease: "sine.inOut"
    });
    animationsRef.current.push(gradientAnim);    return () => {
      animationsRef.current.forEach(anim => anim.kill());
      
      if (bgEffectsRef.current) {
        bgEffectsRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div 
      ref={bgEffectsRef} 
      className="background-effects fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 0,
        background: 'radial-gradient(ellipse at center, #150000 0%, #050000 70%, #000000 100%)',
      }}
    ></div>
  );
};

export default BackgroundEffects;