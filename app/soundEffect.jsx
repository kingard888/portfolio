'use client';

import { useEffect } from 'react';

export default function SoundEffect() {
  useEffect(() => {
    const handleGlobalClick = () => {
      const audio = new Audio('/assets/click.wav');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}
