import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-[#212121] text-white p-4 col-span-2 hidden md:block">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-zinc-700">
              <span className="ml-3">Home</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-zinc-700">
              <span className="ml-3">Trending</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-zinc-700">
              <span className="ml-3">Library</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-zinc-700">
              <span className="ml-3">Playlists</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
