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
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }

    setTimeout(() => {
      setIsStarted(true);
    }, 700);
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
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070913] text-white transition-opacity duration-700 ${
            isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-[0.3em] text-purple-400 uppercase">
                Interactive Portfolio
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-pulse">
                VERYARD
              </h1>
            </div>

            <p className="text-xs text-gray-400 tracking-wider max-w-xs">
              Click to launch experience with full audio & interactive effects
            </p>

            <button
              onClick={handleStart}
              className="mt-4 px-10 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-purple-400/30 cursor-pointer"
            >
              ▶ PRESS START
            </button>
          </div>
        </div>
      )}

      {isStarted && (
        <button
          onClick={togglePlay}
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 rounded-full border border-purple-500/30 bg-black/60 px-4 py-2 text-xs text-white backdrop-blur-md transition-all hover:scale-105 hover:border-purple-500 shadow-lg cursor-pointer"
        >
          {isPlaying ? '🎵 Pause BGM' : '🔇 Play BGM'}
        </button>
      )}
    </>
  );
}
