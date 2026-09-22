'use client';

import { useEffect } from 'react';

export default function SoundEffect() {
  useEffect(() => {
    let audioBuffer = null;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    fetch('/assets/click.wav')
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((buffer) => {
        audioBuffer = buffer;
      })
      .catch(() => {});

    const handleGlobalClick = (e) => {
      if (audioBuffer) {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const source = audioCtx.createBufferSource();
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.2;
        source.buffer = audioBuffer;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(0);
      }

      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 400);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}
