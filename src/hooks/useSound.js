import { useState } from 'react';

export function useSound() {
  const [soundOn, setSoundOn] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const playSound = (src) => {
    if (soundOn) {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.play();
    }
  };

  return { soundOn, setSoundOn, volume, setVolume, playSound };
}
