import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Пытаемся получить сохраненную тему из localStorage
    const savedTheme = localStorage.getItem('oldzoomer-theme') as Theme;
    return savedTheme || 'auto';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateActualTheme = () => {
      if (theme === 'auto') {
        setActualTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setActualTheme(theme as 'light' | 'dark');
      }
    };

    // Обновляем тему при изменении
    updateActualTheme();

    // Слушаем изменения системной темы
    mediaQuery.addEventListener('change', updateActualTheme);

    // Применяем тему к документу
    document.documentElement.setAttribute('data-theme', actualTheme);
    
    // Обновляем meta theme-color для браузера
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', 
        actualTheme === 'dark' ? '#242424' : '#3584e4'
      );
    }

    return () => {
      mediaQuery.removeEventListener('change', updateActualTheme);
    };
  }, [theme, actualTheme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('oldzoomer-theme', newTheme);
  };

  return {
    theme,
    actualTheme,
    changeTheme,
    isDark: actualTheme === 'dark'
  };
};

export default useTheme;
