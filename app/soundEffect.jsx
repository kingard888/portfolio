'use client';

import { useEffect } from 'react';

export default function SoundEffect() {
  useEffect(() => {
    const audio = new Audio('/assets/click.wav');
    audio.preload = 'auto';

    const handleGlobalClick = () => {
      const sound = audio.cloneNode();
      sound.volume = 0.2;
      sound.play().catch(() => {});
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}
