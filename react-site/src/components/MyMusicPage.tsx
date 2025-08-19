import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleYandexMusicWidget from './SimpleYandexMusicWidget';
import '../styles/music.css';

const MyMusicPage: React.FC = () => {
  useEffect(() => {
    // Обновляем заголовок страницы
    document.title = 'Моя музыка - oldzoomer | Плейлист из Яндекс Музыки';
    
    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Музыкальные предпочтения oldzoomer - плейлист из Яндекс Музыки');

    return () => {
      // Cleanup
      document.title = 'oldzoomer - Фидошник и Java-разработчик | Персональная страница';
    };
  }, []);

  return (
    <div className="page-container">
      <Link to="/" className="back-link" aria-label="Вернуться на главную страницу">
        ← Назад на главную
      </Link>
      
      <h1 aria-label="Моя музыка">Моя музыка</h1>
      <h2 aria-label="Плейлист из Яндекс Музыки">Плейлист из Яндекс Музыки</h2>
      
      <p className="music-description">
        Здесь собраны треки, которые я слушаю во время работы и в свободное время.
      </p>
      
      <section className="music-section" aria-labelledby="playlist-heading">
        <h3 id="playlist-heading">Мой основной плейлист:</h3>
        
        <SimpleYandexMusicWidget
          userId="gavrilovegor519-2"
          playlistId="3"
          height={500}
          className="music-iframe"
        />
      </section>
    </div>
  );
};

export default MyMusicPage;
