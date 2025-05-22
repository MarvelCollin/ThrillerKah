import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingElements = () => {
  const elementsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementsRef.current) return;
    
    const elements = [
      { type: 'skull', count: 3 },
      { type: 'hand', count: 4 },
      { type: 'eye', count: 5 },
      { type: 'raven', count: 2 },
    ];
    
    elements.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.className = `floating-element ${type}`;
        
        element.style.left = `${Math.random() * 90 + 5}%`;
        element.style.top = `${Math.random() * 90 + 5}%`;
        
        const scale = Math.random() * 0.5 + 0.5;
        element.style.transform = `scale(${scale})`;
        
        element.style.opacity = `${Math.random() * 0.5 + 0.2}`;
        
        elementsRef.current?.appendChild(element);
        
        gsap.to(element, {
          x: `${Math.random() * 50 - 25}px`,
          y: `${Math.random() * 50 - 25}px`,
          rotation: Math.random() * 20 - 10,
          duration: Math.random() * 8 + 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
        
        gsap.to(element, {
          opacity: () => Math.random() * 0.3 + 0.1,
          duration: Math.random() * 5 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      }
    });
    
    const createWhisper = () => {
      if (!elementsRef.current) return;
      
      const whisper = document.createElement('div');
      whisper.className = 'whisper';
      
      whisper.style.left = `${Math.random() * 100}%`;
      whisper.style.top = `${Math.random() * 100}%`;
      
      const whisperContent = ['help', 'run', 'hide', 'behind you', 'darkness', 'fear', 'shadow'];
      whisper.textContent = whisperContent[Math.floor(Math.random() * whisperContent.length)];
      
      elementsRef.current.appendChild(whisper);
      
      gsap.fromTo(whisper, 
        { opacity: 0, scale: 0.5 }, 
        { 
          opacity: 0.6, 
          scale: 1.2,
          duration: 2,
          onComplete: () => {
            gsap.to(whisper, {
              opacity: 0,
              scale: 1.5,
              duration: 1.5,
              onComplete: () => whisper.remove()
            });
          }
        }
      );
    };
    
    const whisperInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        createWhisper();
      }
    }, 8000);
    
    return () => {
      clearInterval(whisperInterval);
    };
  }, []);
  
  return (
    <div ref={elementsRef} className="floating-elements"></div>
  );
};

export default FloatingElements;