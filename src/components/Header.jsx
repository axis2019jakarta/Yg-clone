import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#212121] text-white p-4 flex items-center justify-between col-span-12">
      {/* Left: Logo & Menu */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <span className="text-white">Music</span><span className="text-red-600">Tube</span>
        </div>
      </div>
      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-8">
        <div className="w-full max-w-lg">
          <input type="text" placeholder="Search for music..." className="w-full bg-[#121212] border border-zinc-700 text-white rounded-full px-4 py-2 focus:outline-none focus:border-red-600" />
        </div>
      </div>
      {/* Right: Profile */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
