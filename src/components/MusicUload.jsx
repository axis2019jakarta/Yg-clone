// File: components/MusicUpload.jsx
import { useState } from 'react';
import { useMusic } from '../hooks/useMusic';
import styles from '../styles/MusicUpload.module.css'; // Buat file CSS ini nanti

export default function MusicUpload() {
  const { addMusic } = useMusic();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: ''
  });
  const [musicFile, setMusicFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMusicFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setMusicFile(file);
    } else {
      setMessage({ type: 'error', text: 'Please select a valid audio file' });
      e.target.value = null;
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
    } else {
      setMessage({ type: 'error', text: 'Please select a valid image file' });
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!musicFile) {
      setMessage({ type: 'error', text: 'Please select a music file' });
      return;
    }
    
    try {
      setUploading(true);
      setMessage({ type: '', text: '' });
      
      const result = await addMusic(formData, musicFile, coverImage);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Music uploaded successfully!' });
        // Reset form
        setFormData({
          title: '',
          artist: '',
          album: '',
          genre: ''
        });
        setMusicFile(null);
        setCoverImage(null);
        
        // Reset file inputs
        document.getElementById('musicFile').value = '';
        if (document.getElementById('coverImage')) {
          document.getElementById('coverImage').value = '';
        }
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      console.error('Error uploading music:', error);
      setMessage({ type: 'error', text: 'Error uploading music: ' + error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.title}>Upload Music</h2>
      
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="album">Album</label>
          <input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="musicFile">Music File</label>
          <input
            type="file"
            id="musicFile"
            accept="audio/*"
            onChange={handleMusicFileChange}
            required
            className={styles.fileInput}
          />
          {musicFile && (
            <div className={styles.fileInfo}>
              Selected: {musicFile.name} ({(musicFile.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="coverImage">Cover Image (Optional)</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleCoverImageChange}
            className={styles.fileInput}
          />
          {coverImage && (
            <div className={styles.fileInfo}>
              Selected: {coverImage.name} ({(coverImage.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={uploading}
          className={styles.submitButton}
        >
          {uploading ? 'Uploading...' : 'Upload Music'}
        </button>
      </form>
    </div>
  );
      
