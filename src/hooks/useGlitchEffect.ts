import { useState, useEffect } from 'react';

interface GlitchEffectHook {
  isGlitching: boolean;
  triggerGlitch: () => void;
}

export const useGlitchEffect = (interval = 10000, duration = 1000): GlitchEffectHook => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), duration);
  };

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, interval);
    
    return () => clearInterval(glitchInterval);
  }, [interval, duration]);

  return { isGlitching, triggerGlitch };
}; 