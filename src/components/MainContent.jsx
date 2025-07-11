import React, { useState, useEffect } from 'react';
// Impor klien supabase yang baru kita buat
import { supabase } from '../supabaseClient'; 

const MainContent = () => {
  // State untuk menyimpan data lagu dan status loading
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      // Perintah untuk mengambil semua data dari tabel 'songs'
      const { data, error } = await supabase
        .from('songs') // Pastikan nama tabel Anda 'songs'
        .select('*');

      if (error) {
        console.error('Error fetching songs:', error);
      } else {
        setSongs(data);
      }
      setLoading(false);
    };

    fetchSongs();
  }, []); // Array kosong berarti ini hanya berjalan sekali

  // Tampilkan pesan loading saat data sedang diambil
  if (loading) {
    return (
      <main className="bg-[#181818] text-white p-8 col-span-12 md:col-span-10">
        <p>Loading music from Supabase...</p>
      </main>
    );
  }

  return (
    <main className="bg-[#181818] text-white p-8 col-span-12 md:col-span-10 overflow-y-auto" style={{ height: 'calc(100vh - 152px)' }}>
      <h2 className="text-2xl font-bold mb-6">Trending Music</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Tampilkan setiap lagu dari state 'songs' */}
        {songs.map((song) => (
          <div key={song.id} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 cursor-pointer">
            <img 
              src={song.image_url || 'https://placehold.co/400'} // Tampilkan gambar atau placeholder
              alt={song.title} 
              className="w-full h-40 object-cover rounded-md mb-3" 
            />
            <h3 className="font-bold truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
