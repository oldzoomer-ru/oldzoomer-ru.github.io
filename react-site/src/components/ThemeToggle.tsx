import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, changeTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
      default:
        return actualTheme === 'dark' ? '🌙' : '☀️';
    }
  };

  const getNextTheme = () => {
    switch (theme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'auto';
      case 'auto':
      default:
        return 'light';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Светлая тема';
      case 'dark':
        return 'Темная тема';
      case 'auto':
      default:
        return 'Автоматически';
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={() => changeTheme(getNextTheme())}
      aria-label={`Переключить тему. Текущая: ${getThemeLabel()}`}
      title={`Переключить тему (${getThemeLabel()})`}
    >
      <span className="theme-icon" aria-hidden="true">
        {getIcon()}
      </span>
      <span className="theme-label">
        {getThemeLabel()}
      </span>
    </button>
  );
};

export default ThemeToggle;
