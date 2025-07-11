// F// File: components/MusicList.jsx
import { useState } from 'react';
import { useMusic } from '../hooks/useMusic';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/MusicList.module.css'; // Buat file CSS ini nanti

export default function MusicList() {
  const { music, loading, error } = useMusic();
  const [currentTrack, setCurrentTrack] = useState(null);
  
  if (loading) return <div className={styles.loading}>Loading music...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  
  const getPublicUrl = (path) => {
    if (!path) return null;
    return `${supabase.supabaseUrl}/storage/v1/object/public/music-files/${path}`;
  };
  
  const handlePlay = (track) => {
    setCurrentTrack(track);
  };
  
  return (
    <div className={styles.musicContainer}>
      <h2 className={styles.title}>Music Library</h2>
      
      {currentTrack && (
        <div className={styles.nowPlaying}>
          <h3>Now Playing</h3>
          <div className={styles.playerContainer}>
            <div className={styles.playerInfo}>
              <img 
                src={getPublicUrl(currentTrack.image_path) || '/default-cover.jpg'} 
                alt={`${currentTrack.title} cover`}
                className={styles.playerCover}
              />
              <div>
                <h4>{currentTrack.title}</h4>
                <p>{currentTrack.artist}</p>
              </div>
            </div>
            <audio 
              controls 
              autoPlay
              src={getPublicUrl(currentTrack.storage_path)}
              className={styles.audioPlayer}
            />
          </div>
        </div>
      )}
      
      {music.length === 0 ? (
        <p className={styles.noMusic}>No music found. Upload some tracks!</p>
      ) : (
        <div className={styles.musicGrid}>
          {music.map((track) => (
            <div key={track.id} className={styles.musicCard}>
              <div 
                className={styles.musicCover}
                onClick={() => handlePlay(track)}
              >
                <img 
                  src={getPublicUrl(track.image_path) || '/default-cover.jpg'} 
                  alt={`${track.title} cover`} 
                />
                <div className={styles.playOverlay}>
                  <span>▶</span>
                </div>
              </div>
              <div className={styles.musicInfo}>
                <h3>{track.title}</h3>
                <p>{track.artist}</p>
                {track.album && <p className={styles.album}>{track.album}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}￼Enter
