import React from 'react';

interface ThrillerTitleProps {
  scrollProgress: number;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

export const ThrillerTitle: React.FC<ThrillerTitleProps> = ({ 
  scrollProgress, 
  titleRef 
}) => {
  // Calculate title animation styles based on scroll progress
  const getLetterStyles = (index: number, letter: string) => {
    const scale = 1 + (scrollProgress * 0.5) + (index * 0.1 * scrollProgress);
    const rotation = (scrollProgress * 5) * (index % 2 === 0 ? 1 : -1);
    const letterOpacity = letter === ' ' ? 0 : 1;
    
    return {
      display: 'inline-block',
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transition: 'transform 0.1s ease',
      opacity: letterOpacity,
      textShadow: `0 0 ${5 + scrollProgress * 20}px rgba(255, 0, 0, ${0.5 + scrollProgress * 0.5})`,
    };
  };

  return (
    <h1 
      ref={titleRef} 
      className="text-8xl md:text-9xl font-creepy tracking-widest flicker-anim"
      style={{
        color: `rgb(${180 + scrollProgress * 75}, 0, 0)`,
      }}
    >
      {Array.from("THRILLER").map((letter, index) => (
        <span key={index} style={getLetterStyles(index, letter)}>
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default ThrillerTitle; 