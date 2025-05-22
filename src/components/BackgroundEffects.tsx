import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundEffects = () => {
  const bgEffectsRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<any[]>([]);
    useEffect(() => {
    if (!bgEffectsRef.current) return;
    
    animationsRef.current = [];
    const particleCount = 180;
    const smallParticles = 100;
    const particles: HTMLDivElement[] = [];
      for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      const size = Math.random() * 12 + 3;
      const isRed = Math.random() > 0.4;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background-color: ${isRed
          ? `rgba(255, 30, 30, ${Math.random() * 0.6 + 0.5})`
          : `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`};
        box-shadow: 0 0 ${size * 6}px ${isRed
          ? `rgba(255, 0, 0, ${Math.random() * 0.9 + 0.5})`
          : 'rgba(255, 255, 255, 0.7)'},
                   0 0 ${size * 2}px ${isRed
          ? 'rgba(255, 100, 100, 0.9)'
          : 'rgba(255, 255, 255, 0.9)'};
        filter: blur(${size / 10}px);
        border-radius: 50%;
        z-index: 10;
      `;
        bgEffectsRef.current.appendChild(particle);
      
      gsap.set(particle, {
        opacity: 0,
        scale: 0.5
      });
      
      const tl = gsap.timeline({repeat: -1, yoyo: true});
      
      tl.to(particle, {
        opacity: Math.random() * 0.9 + 0.6,
        scale: Math.random() * 1.5 + 1.0,
        duration: 1,
        ease: "power2.in"
      }).to(particle, {
        x: `${Math.random() * 250 - 125}px`, 
        y: `${Math.random() * 250 - 125}px`,
        scale: Math.random() * 2.5 + 1.2,
        boxShadow: `0 0 ${size * 12}px ${Math.random() > 0.3 
          ? `rgba(255, 0, 0, ${Math.random() * 0.95 + 0.7})` 
          : 'rgba(255, 255, 255, 0.8)'}`,
        duration: Math.random() * 12 + 8,
        ease: "sine.inOut"
      });
      
      const anim = tl;
      
      animationsRef.current.push(anim);
    }
    
    for (let i = 0; i < smallParticles; i++) {
      const smallParticle = document.createElement('div');
      const tinySize = Math.random() * 3 + 1; // Much smaller particles
      
      smallParticle.style.cssText = `
        position: absolute;
        width: ${tinySize}px;
        height: ${tinySize}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background-color: ${Math.random() > 0.5 
          ? `rgba(255, 100, 100, ${Math.random() * 0.4 + 0.2})` 
          : `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`};
        box-shadow: 0 0 ${tinySize * 3}px ${Math.random() > 0.5
          ? 'rgba(255, 50, 50, 0.4)'
          : 'rgba(255, 255, 255, 0.3)'};
        border-radius: 50%;
        filter: blur(${tinySize / 5}px);
        z-index: 5;
      `;
      
      bgEffectsRef.current.appendChild(smallParticle);
      
      // Simple animation for background particles
      const smallAnim = gsap.to(smallParticle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5
      });
      
      animationsRef.current.push(smallAnim);
    }
    
    // Create a dark overlay with vignette effect
    const overlay = document.createElement('div');    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;      background: radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0) 30%,
        rgba(20, 0, 0, 0.6) 100%
      );
      pointer-events: none;
      z-index: 3;
    `;
    bgEffectsRef.current.appendChild(overlay);
    
    const mistCount = 3;
    for (let i = 0; i < mistCount; i++) {
      const mist = document.createElement('div');      mist.style.cssText = `
        position: fixed;
        left: -100%;
        width: 200%;
        height: 40%;
        top: ${i * 40}%;        opacity: ${Math.random() * 0.3 + 0.2};
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 0, 0, 0.08) 20%,
          rgba(255, 0, 0, 0.12) 50%,
          rgba(255, 0, 0, 0.08) 80%,
          transparent
        );
        filter: blur(12px);
        pointer-events: none;
        z-index: 2;
      `;
      
      bgEffectsRef.current.appendChild(mist);
      
      const anim = gsap.to(mist, {
        x: '100%',        duration: 20 + Math.random() * 10,
        repeat: -1,
        ease: "none",
        delay: i * 3
      });
      
      animationsRef.current.push(anim);
    }
    
    // Add dark gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(20, 0, 0, 0.9));
      pointer-events: none;
      z-index: 1; /* Just behind particles but above base background */
      opacity: 0;
    `;
    bgEffectsRef.current.appendChild(gradientOverlay);

    const gradientAnim = gsap.to(gradientOverlay, {
      opacity: 1,
      duration: 4,
      ease: "sine.inOut"
    });
    animationsRef.current.push(gradientAnim);

    return () => {
      // Kill all animations
      animationsRef.current.forEach(anim => anim.kill());
      
      // Clean up elements
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
        background: 'radial-gradient(ellipse at center, #150000 0%, #000000 100%)',
      }}
    ></div>
  );
};

export default BackgroundEffects;