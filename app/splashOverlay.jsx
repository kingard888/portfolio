'use client';

import { useState, useRef, useEffect } from 'react';

export default function SplashOverlay() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/assets/bgm.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;
  }, []);

  const handleStart = () => {
    setIsFading(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setTimeout(() => {
      setIsStarted(true);
    }, 500);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {!isStarted && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#090c15',
            backgroundImage: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.25) 0%, rgba(9, 12, 21, 0.98) 75%)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            opacity: isFading ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: isFading ? 'none' : 'auto',
          }}
        >
          {/* Card Overlay Box */}
          <div
            style={{
              backgroundColor: 'rgba(15, 19, 32, 0.85)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '24px',
              padding: '40px 28px',
              maxWidth: '360px',
              width: '90%',
              boxShadow: '0 0 50px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.15)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
            }}
          >
            <div
              style={{
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontSize: '11px',
                color: '#c084fc',
                fontWeight: '600',
              }}
            >
              ✦ WELCOME TO EXPERIENCE ✦
            </div>

            <h1
              style={{
                fontSize: '38px',
                fontWeight: '900',
                letterSpacing: '4px',
                margin: 0,
                background: 'linear-gradient(135deg, #c084fc, #f472b6, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VERYARD
            </h1>

            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>
              Klik tombol di bawah untuk masuk ke portfolio dengan efek suara & audio penuh.
            </p>

            <button
              onClick={handleStart}
              style={{
                marginTop: '10px',
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #9333ea, #6366f1)',
                border: '1px solid rgba(192, 132, 252, 0.6)',
                borderRadius: '50px',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '14px',
                letterSpacing: '2px',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(147, 51, 234, 0.6)',
              }}
            >
              ▶ PRESS START
            </button>
          </div>
        </div>
      )}

      {isStarted && (
        <button
          onClick={togglePlay}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 99999,
            backgroundColor: 'rgba(15, 18, 28, 0.85)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '30px',
            padding: '10px 18px',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isPlaying ? '🎵 Pause BGM' : '🔇 Play BGM'}
        </button>
      )}
    </>
  );
}
