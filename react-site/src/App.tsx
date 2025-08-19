import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MyMusicPage from './components/MyMusicPage';
import MyLifePage from './components/MyLifePage';
import ThemeToggle from './components/ThemeToggle';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mymusic" element={<MyMusicPage />} />
          <Route path="/mylife" element={<MyLifePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
