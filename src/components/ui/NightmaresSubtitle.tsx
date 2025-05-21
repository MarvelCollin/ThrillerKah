import React from 'react';

interface NightmaresSubtitleProps {
  scrollProgress: number;
}

export const NightmaresSubtitle: React.FC<NightmaresSubtitleProps> = ({ 
  scrollProgress 
}) => {
  return (
    <p 
      className="text-xl md:text-2xl text-gray-400 mt-4 font-sans tracking-widest animate-fade-in"
      style={{
        opacity: 1 - scrollProgress * 2, // Fade out faster than title
        transform: `scale(${1 - scrollProgress * 0.5})`,
      }}
    >
      YOUR NIGHTMARES AWAIT
    </p>
  );
};

export default NightmaresSubtitle; 