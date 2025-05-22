import React from 'react';

interface VideoFrameProps {
  videoId: string;
  title?: string;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoId, title }) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '1200px',
    paddingTop: '56.25%', // 16:9 Aspect Ratio
    overflow: 'hidden',
    borderRadius: '0.75rem',
    boxShadow: '0 0 30px rgba(139, 0, 0, 0.3)',
    margin: '0 auto',
  };

  const iframeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '2px solid #8B0000',
    borderRadius: 'inherit',
  };
  return (
    <div className="video-container w-full" style={{ scrollMarginTop: '2rem' }}>
      {title && (
        <h3 className="text-3xl lg:text-4xl font-bold text-[#8B0000] mb-8 text-center horror-text animate-flicker">
          {title}
        </h3>
      )}
      <div style={containerStyle}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={iframeStyle}
        />
      </div>
    </div>
  );
};

export default VideoFrame;
