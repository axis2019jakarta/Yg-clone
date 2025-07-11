// File: pages/music.jsx
import { useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import MusicList from '../components/MusicList';
import MusicUpload from '../components/MusicUpload';
import styles from '../styles/MusicPage.module.css'; // Buat file CSS ini nanti

export default function MusicPage() {
  const session = useSession();
  const [activeTab, setActiveTab] = useState('browse');
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Music Library</h1>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'browse' ? styles.active : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Music
          </button>
          {session && (
            <button 
              className={`${styles.tab} ${activeTab === 'upload' ? styles.active : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Music
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.content}>
        {activeTab === 'browse' ? (
          <MusicList />
        ) : (
          session ? (
            <MusicUpload />
          ) : (
            <div className={styles.authMessage}>
              <p>Please sign in to upload music.</p>
              <button className={styles.signInButton}>
                Sign In
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
                           
