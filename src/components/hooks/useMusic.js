// File: hooks/useMusic.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useMusic() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMusic();
  }, []);

  async function fetchMusic() {
    try {
      setLoading(true);
      
      // Menggunakan Edge Function untuk mendapatkan musik
      const { data: response, error: funcError } = await supabase.functions.invoke('get-music');
      
      if (funcError) {
        // Fallback ke query langsung jika Edge Function gagal
        console.warn('Edge function failed, falling back to direct query:', funcError);
        
        const { data, error } = await supabase
          .from('music')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setMusic(data || []);
      } else {
        setMusic(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching music:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addMusic(musicData, musicFile, coverImage) {
    try {
      if (!musicFile) {
        throw new Error('Please select a music file');
      }
      
      // 1. Upload music file to storage
      const musicFileName = `${Date.now()}-${musicFile.name}`;
      const musicPath = `music/${musicFileName}`;
      
      const { error: musicUploadError } = await supabase.storage
        .from('music-files') // Ganti dengan nama bucket Anda
        .upload(musicPath, musicFile);
        
      if (musicUploadError) throw musicUploadError;
      
      // 2. Upload cover image if provided
      let imagePath = null;
      if (coverImage) {
        const imageFileName = `${Date.now()}-${coverImage.name}`;
        imagePath = `covers/${imageFileName}`;
        
        const { error: imageUploadError } = await supabase.storage
          .from('music-files') // Ganti dengan nama bucket Anda
          .upload(imagePath, coverImage);
          
        if (imageUploadError) throw imageUploadError;
      }
      
      // 3. Save music metadata to database using Edge Function
      const { data, error } = await supabase.functions.invoke('get-music', {
        method: 'POST',
        body: {
          ...musicData,
          storage_path: musicPath,
          image_path: imagePath
        }
      });
      
      if (error) throw error;
      
      // 4. Refresh music list
      fetchMusic();
      
      return { success: true, data };
    } catch (err) {
      console.error('Error adding music:', err);
      return { success: false, error: err.message };
    }
  }

  return {
    music,
    loading,
    error,
    fetchMusic,
    addMusic
  };
            
