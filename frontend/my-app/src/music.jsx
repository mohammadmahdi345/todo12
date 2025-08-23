import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const playlist = [
    '/music/energy.mp3',
    '/music/epic.mp3',
    '/music/Bloody Mary Remix Slowed and Reverb.mp3',
    '/music/attractivefull_14020924_045406495_320kbps (1).mp3',
    '/music/a6421727-cf24-40f1-b1b4-fae7b4f0dce6.mp3',
    '/music/6547231b-1a00-41e9-a7d5-a0ad335cf857.mp3',
    '/music/53d266c4-2b6b-457d-83ad-835facff7323.mp3',
    '/music/4_5904286005598360355.mp3',
    '/music/[@mrboogari] BERO 02 AND SLOWED (1).mp3',
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5); // صدای پیش‌فرض 50%
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
      audio.volume = volume; // تنظیم ولوم روی صدا
      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentTrackIndex]);

  // هر وقت ولوم تغییر کرد، روی صوت اعمال کن
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const handleEnded = () => {
    nextTrack();
  };

  // هندلر تغییر صدای اسلایدر
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="music-player-container">
      <div className="music-controls">
        <button onClick={previousTrack} className="music-btn prev-btn">⏮️ آهنگ قبلی</button>
        <button onClick={togglePlay} className="music-btn play-pause-btn">
          {isPlaying ? '⏸️ توقف موسیقی' : '▶️ پخش موسیقی'}
        </button>
        <button onClick={nextTrack} className="music-btn next-btn">⏭️ آهنگ بعدی</button>
      </div>

      {/* اسلایدر تنظیم صدا */}
      <div className="volume-control">
        <label htmlFor="volume" className="volume-label">صدا:</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>


      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={handleEnded}
        controls={false}
        loop={false}
      />
    </div>
  );
};

export default MusicPlayer;
