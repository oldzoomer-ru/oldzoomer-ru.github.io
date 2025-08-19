import React from 'react';

interface SimpleYandexMusicWidgetProps {
  playlistId: string;
  userId: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const SimpleYandexMusicWidget: React.FC<SimpleYandexMusicWidgetProps> = ({
  playlistId,
  userId,
  width = '100%',
  height = 500,
  className = 'simple-yandex-music-widget'
}) => {
  const src = `https://music.yandex.ru/iframe/playlist/${userId}/${playlistId}`;

  return (
    <div className={className}>
      <iframe
        src={src}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; fullscreen"
        title="Яндекс Музыка плейлист"
        style={{
          width: '100%',
          height: typeof height === 'number' ? `${height}px` : height,
          border: '1px solid var(--card-border-color)',
          borderRadius: 'var(--border-radius-lg)',
          backgroundColor: 'var(--view-bg-color)'
        }}
      />
    </div>
  );
};

export default SimpleYandexMusicWidget;
