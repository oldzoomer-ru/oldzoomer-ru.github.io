import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="profile-header">
        <div className="profile-avatar">
          <img src="/res/avatar.png" alt="oldzoomer avatar" className="avatar-image" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">oldzoomer</h1>
          <p className="profile-title">Фидошник и Java-разработчик</p>
          <p className="profile-description">
            Люблю писать код, изучать новые технологии и участвовать в классических сетях
          </p>
        </div>
      </header>

      {/* Quick Navigation */}
      <section className="quick-nav">
        <Link to="/mymusic" className="quick-nav-item">
          <div className="quick-nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div className="quick-nav-content">
            <h3>Моя музыка</h3>
            <p>Любимые треки и плейлисты</p>
          </div>
        </Link>
        
        <Link to="/mylife" className="quick-nav-item">
          <div className="quick-nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
            </svg>
          </div>
          <div className="quick-nav-content">
            <h3>Моя история</h3>
            <p>Жизнь с аутизмом в IT</p>
          </div>
        </Link>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2>Технические навыки</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Backend</h3>
            <div className="skill-tags">
              <span className="skill-tag">Java</span>
              <span className="skill-tag">Spring Boot</span>
              <span className="skill-tag">REST API</span>
              <span className="skill-tag">JPA/Hibernate</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h3>База данных</h3>
            <div className="skill-tags">
              <span className="skill-tag">PostgreSQL</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">MS SQL Server</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h3>DevOps & Tools</h3>
            <div className="skill-tags">
              <span className="skill-tag">Linux</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Maven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Связаться со мной</h2>
        <div className="contact-grid">
          <a href="https://github.com/oldzoomer-ru" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>GitHub</h4>
              <p>Мои проекты и код</p>
            </div>
          </a>
          
          <a href="https://habr.com/ru/users/oldzoomer/" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.5 3.5L12 1 9.5 3.5 7 1v4L9.5 7.5 12 5l2.5 2.5L17 5V1l-2.5 2.5zM19 9v6h-2v4h-2v-4H9v4H7v-4H5V9h2V7h2v2h6V7h2v2h2zm-6 4v-2h-2v2h2z"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>Хабр</h4>
              <p>Статьи и мысли</p>
            </div>
          </a>
          
          <a href="https://career.habr.com/oldzoomer" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16z"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>Хабр Карьера</h4>
              <p>Резюме и навыки</p>
            </div>
          </a>
          
          <div className="contact-card fidonet-card">
            <div className="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 7H2v2h3V7zm0 4H2v2h3v-2zm0 4H2v2h3v-2zm7-8H7v2h5V7zm0 4H7v2h5v-2zm0 4H7v2h5v-2zm7-8h-5v2h5V7zm0 4h-5v2h5v-2zm0 4h-5v2h5v-2z"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>FidoNet</h4>
              <p>2:5015/519</p>
            </div>
          </div>
        </div>
        
        <div className="fidonet-note">
          <p>
            <strong>Интересный факт:</strong> Я один из самых молодых сисопов в сети FidoNet 
            и активно участвую в поддержке этой классической компьютерной сети.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>О проекте</h2>
        <p>
          Этот сайт создан с использованием React и TypeScript, оформлен в стиле libadwaita 
          (дизайн-система GNOME). Поддерживается тёмная и светлая темы, адаптивный дизайн 
          для всех устройств.
        </p>
        <p>
          Исходный код доступен на GitHub. Сайт хостится на GitHub Pages и автоматически 
          обновляется при изменениях в репозитории.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
