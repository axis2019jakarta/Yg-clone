import React from 'react';

const MusicPlayer = () => {
  return (
    <footer className="bg-[#181818] border-t border-zinc-700 text-white p-3 flex items-center justify-between fixed bottom-0 left-0 w-full z-10 col-span-12">
      {/* Song Info */}
      <div className="flex items-center w-1/4">
        <div className="w-12 h-12 bg-zinc-700 rounded-md mr-3"></div>
        <div>
          <h4 className="font-semibold">Song Not Playing</h4>
          <p className="text-xs text-zinc-400">Artist</p>
        </div>
      </div>
      
      {/* Player Controls */}
      <div className="flex items-center justify-center space-x-4 w-1/2">
         <p className="text-zinc-400">Controls Placeholder</p>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-4 w-1/4">
        <p className="text-zinc-400">Volume Placeholder</p>
      </div>
    </footer>
  );
};

export default MusicPlayer;
