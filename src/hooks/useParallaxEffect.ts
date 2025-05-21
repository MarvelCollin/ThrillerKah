import { useState, useEffect, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  easing?: string;
}

const useParallaxEffect = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { 
    speed = 0.5, 
    direction = 'up',
    easing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
  } = options;
  
  const [offset, setOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const factor = direction === 'up' ? -1 : 1;
      setOffset(scrollY * speed * factor);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, speed, direction]);
  
  const style = {
    transform: `translate3d(0, ${offset}px, 0)`,
    transition: `transform 0.1s ${easing}`
  };
  
  const mouseEffect = {
    transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
    transition: 'transform 0.5s ease-out'
  };
    return { style, offset, mousePosition, mouseEffect };
};

const useInteractiveElement = (
  threshold: number = 0.5
) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const ref = (element: HTMLElement | null) => {
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  };
  
  return { ref, isVisible };
};

// Export hooks
export { useParallaxEffect, useInteractiveElement };
