import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

interface AnimationRefs {
  parallaxRef: RefObject<HTMLDivElement | null>;
  titleContainerRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  eyesRef: RefObject<HTMLDivElement | null>;
  bloodRef: RefObject<HTMLDivElement | null>;
  handRef: RefObject<HTMLDivElement | null>;
  fogRef: RefObject<HTMLDivElement | null>;
}

export const useParallaxAnimation = (refs: AnimationRefs) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;
    
    // Check if refs are valid
    if (!refs.parallaxRef.current || 
        !refs.titleContainerRef.current || 
        !refs.eyesRef.current ||
        !refs.bloodRef.current ||
        !refs.handRef.current ||
        !refs.fogRef.current) {
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clear any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach((st: any) => st.kill());
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.parallaxRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // Increase for smoother scrubbing effect
        pin: true,
        anticipatePin: 1, // Helps with smoother pinning
        pinSpacing: true,
        markers: false,
        id: "parallax-intro", // Unique identifier to prevent conflicts
        invalidateOnRefresh: true, // Recalculate positions on refresh
        fastScrollEnd: true, // Better performance
        onUpdate: (self: any) => {
          // Update scroll progress state
          setScrollProgress(self.progress);
        }
      }
    });
    
    // Title container animation - zoom in to cover the screen
    tl.to(refs.titleContainerRef.current, {
      scale: 6,
      duration: 4,
      ease: "power2.inOut"
    }, 0);
    
    // Eyes animation
    tl.to(refs.eyesRef.current, {
      y: -150,
      scale: 1.2,
      opacity: 0.8,
      duration: 3,
      ease: "power1.inOut"
    }, 0);
    
    // Blood animation
    tl.to(refs.bloodRef.current, {
      height: "100%",
      duration: 4,
      ease: "power1.inOut"
    }, 0);
    
    // Hand animation
    tl.to(refs.handRef.current, {
      y: -80,
      x: 20,
      rotation: 10,
      duration: 3,
      ease: "power1.inOut"
    }, 0);
    
    // Fog animation
    tl.to(refs.fogRef.current, {
      opacity: 0.7,
      scale: 1.3,
      duration: 4,
      ease: "power1.inOut"
    }, 0);
    
    // Separate timeline for eye animation
    const eyesSt = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    eyesSt.to(".eye-pupil", {
      scale: 1.2,
      duration: 0.5,
      stagger: 0.1,
      ease: "sine.inOut" // Smoother sine ease
    });
    
    return () => {
      tl.kill();
      eyesSt.kill();
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
    };
  }, [refs]);
  
  return { scrollProgress };
};

export const useEyeFollowMouse = () => {
  const followMouse = (e: React.MouseEvent) => {
    const eyeBalls = document.querySelectorAll('.eye-pupil');
    eyeBalls.forEach((ball) => {
      const rect = (ball as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / 25;
      const y = (e.clientY - rect.top) / 25;
      window.gsap.to(ball, {
        x: x,
        y: y,
        duration: 0.3,
        overwrite: "auto" // Prevent conflicting animations
      });
    });
  };
  
  return { followMouse };
}; 