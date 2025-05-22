import { useEffect } from 'react';

const BackgroundEffects = () => {
  useEffect(() => {
    // Create fog elements
    const createFogElements = () => {
      const container = document.createElement('div');
      container.className = 'background-effects';
      document.body.appendChild(container);

      for (let i = 0; i < 5; i++) {
        const fogElement = document.createElement('div');
        fogElement.className = 'fog-element';
        fogElement.style.cssText = `
          position: fixed;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          width: ${Math.random() * 400 + 200}px;
          height: ${Math.random() * 400 + 200}px;
          background: radial-gradient(circle, rgba(30,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
          opacity: ${Math.random() * 0.2 + 0.05};
          filter: blur(${Math.random() * 10 + 15}px);
          pointer-events: none;
          z-index: -1;
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
        `;
        container.appendChild(fogElement);
      }
    };
    
    createFogElements();
    
    return () => {
      const bgEffects = document.querySelector('.background-effects');
      if (bgEffects) {
        bgEffects.remove();
      }
    };
  }, []);

  return null;
};

export default BackgroundEffects;