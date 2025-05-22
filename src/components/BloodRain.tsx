import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BloodRain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createBloodDrop = () => {
      if (!containerRef.current) return;
      
      const drop = document.createElement('div');
      drop.className = 'blood-drop';
      
      drop.style.left = `${Math.random() * 100}%`;
      
      const size = Math.random() * 2 + 1;
      drop.style.width = `${size}px`;
      drop.style.height = `${Math.random() * 8 + 8}px`;
      
      const duration = Math.random() * 3 + 3;
      drop.style.animationDuration = `${duration}s`;
      
      drop.style.opacity = `${Math.random() * 0.3 + 0.7}`;
      
      const red = Math.floor(Math.random() * 50) + 100;
      drop.style.backgroundColor = `rgb(${red}, 0, 0)`;
      
      drop.style.boxShadow = `0 0 3px rgba(0, 0, 0, 0.5)`;
      
      containerRef.current.appendChild(drop);
      
      gsap.fromTo(drop, 
        { y: '-10vh' },
        { 
          y: '110vh', 
          duration: duration,
          ease: "power1.in",
          onComplete: () => {
            drop.remove();
          }
        }
      );
    };
    
    const createBloodSplash = () => {
      if (!containerRef.current) return;
      
      const splash = document.createElement('div');
      splash.className = 'blood-splash';
      
      splash.style.left = `${Math.random() * 80 + 10}%`;
      splash.style.top = `${Math.random() * 80 + 10}%`;
      
      containerRef.current.appendChild(splash);
      
      gsap.fromTo(splash,
        { scale: 0.1, opacity: 0 },
        { 
          scale: 1,
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(splash, {
                opacity: 0,
                scale: 1.2,
                duration: 1,
                ease: "power1.out",
                onComplete: () => splash.remove()
              });
            }, 1000);
          }
        }
      );
      
      for (let i = 0; i < 5; i++) {
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        drip.style.left = `${Math.random() * 100}%`;
        drip.style.top = `${Math.random() * 100}%`;
        containerRef.current.appendChild(drip);
        
        gsap.to(drip, {
          y: `${50 + Math.random() * 100}px`,
          opacity: 0,
          duration: 2 + Math.random(),
          ease: "power1.in",
          onComplete: () => drip.remove()
        });
      }
    };
    
    const createBloodWriting = () => {
      if (!containerRef.current) return;
      
      const writing = document.createElement('div');
      writing.className = 'blood-writing';
      writing.style.position = 'absolute';
      writing.style.top = `${Math.random() * 70 + 15}%`;
      writing.style.left = `${Math.random() * 70 + 15}%`;
      writing.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
      writing.style.color = 'var(--blood-red)';
      writing.style.fontSize = '3rem';
      writing.style.fontFamily = 'Horror Font, cursive';
      
      containerRef.current.appendChild(writing);
      
      gsap.fromTo(writing,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 2,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(writing, {
                opacity: 0,
                y: 50,
                duration: 3,
                ease: "power2.in",
                onComplete: () => writing.remove()
              });
            }, 5000);
          }
        }
      );
    };
    
    const createBloodPuddle = () => {
      if (!containerRef.current) return;
      
      const puddle = document.createElement('div');
      puddle.className = 'blood-puddle';
      puddle.style.left = `${Math.random() * 80 + 10}%`;
      puddle.style.bottom = '0';
      
      containerRef.current.appendChild(puddle);
      
      gsap.fromTo(puddle,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(puddle, {
              scale: 1.1,
              opacity: 0.6,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );
    };
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createBloodDrop(), i * 200);
    }
    
    const dropInterval = setInterval(createBloodDrop, 600);
    
    const splashInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createBloodSplash();
      }
    }, 8000);
    
    const writingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        createBloodWriting();
      }
    }, 15000);
    
    const puddleInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createBloodPuddle();
      }
    }, 12000);
    
    return () => {
      clearInterval(dropInterval);
      clearInterval(splashInterval);
      clearInterval(writingInterval);
      clearInterval(puddleInterval);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="blood-rain-container"></div>
  );
};

export default BloodRain;