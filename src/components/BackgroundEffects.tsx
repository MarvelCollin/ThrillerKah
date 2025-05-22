import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const BackgroundEffects = () => {
  const bgEffectsRef = useRef<HTMLDivElement>(null);
  const [intensity, setIntensity] = useState<number>(1);

  const increaseIntensity = () => {
    setIntensity(prev => Math.min(prev + 0.2, 3));
  };

  useEffect(() => {
    if (!bgEffectsRef.current) return;
    
    for (let i = 0; i < 70; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 9 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particle.style.opacity = `${Math.random() * 0.7 + 0.1}`;
      
      if (Math.random() > 0.5) {
        particle.style.boxShadow = `0 0 ${size * 3}px rgba(139, 0, 0, ${Math.random() * 0.8 + 0.2})`;
        particle.style.backgroundColor = `rgba(${120 + Math.random() * 100}, 0, 0, ${Math.random() * 0.6 + 0.2})`;
        particle.style.filter = `blur(${Math.random() * 2}px)`;
      } else {
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.3)`;
        particle.style.filter = `blur(${Math.random()}px)`;
      }
      
      bgEffectsRef.current.appendChild(particle);
      
      gsap.to(particle, {
        x: `${Math.random() * 300 - 150}px`,
        y: `${Math.random() * 300 - 150}px`,
        scale: Math.random() + 0.5,
        opacity: Math.random() * 0.5,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5,
        onRepeat: () => {
          if (Math.random() > 0.7) {
            gsap.to(particle, {
              x: `${Math.random() * 300 - 150}px`,
              y: `${Math.random() * 300 - 150}px`,
              duration: Math.random() * 10 + 5,
              ease: "sine.inOut"
            });
          }
        }
      });
    }
    
    const createLightningEffect = () => {
      if (!bgEffectsRef.current) return;
      
      const lightning = document.createElement('div');
      lightning.className = 'lightning';
      
      const redTint = Math.random() > 0.7;
      if (redTint) {
        lightning.style.background = 'rgba(255, 230, 230, 0.2)';
      }
      
      bgEffectsRef.current.appendChild(lightning);
      
      const playThunderSound = () => {
        const audio = new Audio();
        audio.volume = 0.2 + (Math.random() * 0.3);
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAGlgDR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAABpYxTvQoAAAAAAD/+xDEAAAKUAF39BQAIpkAL/6CgAgATkAZRLWTGMY6Wk5abMhIeHh4eEeUmZrMzMzMzV42I1VVVVVZmZmZmZmZmZmqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xDEFQAIMAF/9AQAIeMALv5IACDAABAAAP8AACAAADAAAAAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg===';
        audio.play().catch(err => console.log('Could not play thunder sound'));
      };
      
      const flashSequence = [
        { opacity: 0.9, duration: 0.08 + Math.random() * 0.1 },
        { opacity: 0.1, duration: 0.05 + Math.random() * 0.05 },
        { opacity: 0.7, duration: 0.06 + Math.random() * 0.08 },
        { opacity: 0, duration: 0.1 + Math.random() * 0.1 }
      ];
      
      gsap.to(lightning, {
        opacity: flashSequence[0].opacity,
        duration: flashSequence[0].duration,
        onComplete: () => {
          playThunderSound();
          
          gsap.to(document.body, {
            rotate: `${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 0.5}deg`,
            duration: 0.2,
            onComplete: () => {
              gsap.to(document.body, {
                rotate: '0deg',
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
              });
            }
          });
          
          gsap.to(lightning, {
            opacity: flashSequence[1].opacity,
            duration: flashSequence[1].duration,
            onComplete: () => {
              setTimeout(() => {
                gsap.to(lightning, {
                  opacity: flashSequence[2].opacity,
                  duration: flashSequence[2].duration,
                  onComplete: () => {
                    gsap.to(lightning, {
                      opacity: flashSequence[3].opacity,
                      duration: flashSequence[3].duration,
                      onComplete: () => {
                        lightning.remove();
                      }
                    });
                  }
                });
              }, 50 + Math.random() * 100);
            }
          });
        }
      });
      
      gsap.to(document.body, {
        x: (i) => i % 2 === 0 ? '+=' + (5 + Math.random() * 10) : '-=' + (5 + Math.random() * 10),
        y: (i) => i % 2 === 0 ? '+=' + (3 + Math.random() * 5) : '-=' + (3 + Math.random() * 5),
        duration: 0.08,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut"
      });
    };
    
    const lightningInterval = setInterval(() => {
      if (Math.random() < 0.1 * intensity) {
        createLightningEffect();
      }
    }, 5000);
    
    const createMistLayers = () => {
      if (!bgEffectsRef.current) return;
      
      for (let i = 0; i < 8; i++) {
        const mist = document.createElement('div');
        mist.className = 'mist-layer';
        mist.style.top = `${(i * 15) - 10 + (Math.random() * 10)}%`;
        mist.style.opacity = `${0.2 - (i * 0.02) + (Math.random() * 0.05)}`;
        mist.style.height = `${30 + Math.random() * 40}px`;
        mist.style.filter = `blur(${5 + Math.random() * 10}px)`;
        
        const redTint = Math.random() > 0.6;
        if (redTint) {
          const intensity = Math.random() * 0.04 + 0.01;
          mist.style.background = `linear-gradient(90deg, 
            transparent, 
            rgba(139, 0, 0, ${intensity}), 
            rgba(139, 0, 0, ${intensity * 0.8}), 
            transparent)`;
        } else {
          const intensity = Math.random() * 0.04 + 0.01;
          mist.style.background = `linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, ${intensity}), 
            rgba(200, 200, 200, ${intensity * 0.8}), 
            transparent)`;
        }
        
        bgEffectsRef.current.appendChild(mist);
        
        gsap.to(mist, {
          x: `${i % 2 === 0 ? '+=' : '-='}${100 + Math.random() * 50}%`,
          duration: 80 + (i * 20) + (Math.random() * 40),
          repeat: -1,
          ease: "none",
          delay: i * 10
        });
      }
    };
    
    createMistLayers();
    
    const createPulseEffect = () => {
      if (!bgEffectsRef.current) return;
      
      gsap.to(bgEffectsRef.current, {
        backgroundColor: 'rgba(41, 0, 0, 0.08)',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };
    
    createPulseEffect();
    
    const createVignette = () => {
      if (!bgEffectsRef.current) return;
      
      const vignette = document.createElement('div');
      vignette.className = 'horror-vignette';
      bgEffectsRef.current.appendChild(vignette);
      
      gsap.to(vignette, {
        opacity: 0.7,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };
    
    createVignette();
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / docHeight;
      
      setIntensity(1 + (scrollPercent * 2));
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(lightningInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intensity]);

  return (
    <div ref={bgEffectsRef} className="background-effects"></div>
  );
};

export default BackgroundEffects;