import React from 'react';
import type { AnimatedItemProps } from '../../types';

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  index,
  revealed,
  delay = 0,
  children
}) => {
  return (
    <div
      className={`animate-on-scroll ${revealed ? 'fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedItem; 