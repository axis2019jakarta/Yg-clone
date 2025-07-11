import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="grid grid-cols-12">
        {/* Header */}
        <Header />
        
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <MainContent />
      </div>
      
      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default App;
