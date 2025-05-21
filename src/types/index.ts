// Common prop types for UI components
export interface CursorProps {
  isHovering?: boolean;
  cursorVariant?: 'default' | 'hover' | 'text' | 'button';
  position?: { x: number; y: number };
}

// Add the missing CursorPosition interface
export interface CursorPosition {
  x: number;
  y: number;
}

export interface LoadingProps {
  progress?: number;
  isComplete?: boolean;
  onComplete?: () => void;
}

export interface ProgressBarProps {
  progress: number;
  height?: string;
  color?: string;
  className?: string;
  progressBarRef?: React.RefObject<HTMLDivElement>;
}

// Scene-related props
export interface ThrillerSceneProps {
  scrollProgress?: number;
  isVisible?: boolean;
  cursorPosition?: { x: number; y: number };
}

export interface TitleSectionProps extends ThrillerSceneProps {
  title?: string;
  subtitle?: string;
  titleRef?: React.RefObject<HTMLHeadingElement>;
  subtitleRef?: React.RefObject<HTMLParagraphElement>;
  scrollPromptRef?: React.RefObject<HTMLDivElement>;
}

export interface DoorSectionProps extends ThrillerSceneProps {
  isOpen?: boolean;
  onDoorOpen?: () => void;
  doorContainerRef?: React.RefObject<HTMLDivElement>;
  doorLeftRef?: React.RefObject<HTMLDivElement>;
  doorRightRef?: React.RefObject<HTMLDivElement>;
}

export interface VideoSectionProps extends ThrillerSceneProps {
  videoUrl?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  videoSectionRef?: React.RefObject<HTMLDivElement>;
  showVideo?: boolean;
  setShowVideo?: (show: boolean) => void;
}

export interface BackgroundEffectsProps extends ThrillerSceneProps {
  intensity?: number;
  type?: 'fog' | 'blood' | 'film-grain';
  bloodDripsRef?: React.RefObject<HTMLDivElement>;
  fogRef?: React.RefObject<HTMLDivElement>;
}

// Animation related types
export interface CursorEffectOptions {
  speed?: number;
  size?: number;
  blend?: string;
  trailLength?: number;
}

export interface AnimationProgress {
  targetProgress: number;
  currentProgress: number;
}

export interface LoadingScreenProps {
  loadingComplete: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark';

// Event types
export interface MousePositionState {
  x: number;
  y: number;
  prevX?: number;
  prevY?: number;
}

// Global window extensions
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
} 