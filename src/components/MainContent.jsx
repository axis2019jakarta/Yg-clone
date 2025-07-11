import React from 'react';

const MainContent = () => {
  // Data bohongan untuk ditampilkan
  const songCards = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <main className="bg-[#181818] text-white p-8 col-span-12 md:col-span-10 overflow-y-auto" style={{ height: 'calc(100vh - 152px)' }}>
      <h2 className="text-2xl font-bold mb-6">Trending Music</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Menggunakan .map untuk me-render daftar lagu */}
        {songCards.map((id) => (
          <div key={id} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 cursor-pointer">
            <div className="w-full h-40 bg-zinc-700 rounded-md mb-3"></div>
            <h3 className="font-bold">Song Title {id}</h3>
            <p className="text-sm text-zinc-400">Artist Name</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
