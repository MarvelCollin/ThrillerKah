import { useState, useEffect } from 'react';

interface ScrollAnimationHook {
  revealedItems: number[];
  activeSection: string;
  scrollY: number;
}

export const useScrollAnimation = (): ScrollAnimationHook => {
  const [scrollY, setScrollY] = useState(0);
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'features', 'gallery', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
      
      document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView && !revealedItems.includes(index)) {
          setRevealedItems(prev => [...prev, index]);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealedItems]);

  return { revealedItems, activeSection, scrollY };
}; 