import { useState } from 'react';

interface VideoFrameProps {
  videoId: string;
  title: string;
}

const VideoFrame = ({ videoId, title }: VideoFrameProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="video-container mb-0 relative">
      {title && (
        <h3 className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-5 text-center horror-text animate-flicker">
          {title}
        </h3>
      )}
      <div className="video-frame relative w-full aspect-video max-w-4xl mx-auto rounded-md overflow-hidden shadow-lg shadow-[#8B0000]/30 mb-0">
        <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center transition-opacity duration-500" 
             style={{ opacity: isLoaded ? 0 : 1 }}>
          <div className="w-12 h-12 border-4 border-t-transparent border-red-800 rounded-full animate-spin"></div>
        </div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          className="z-0"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoFrame;
