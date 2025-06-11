import React from 'react';
import styles from '../../styles/VolumeControl.module.scss';

function VolumeControl({ volume, setVolume }) {
  return (
    <div className={styles.control}>
      <label>🔊 Гучність:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
}

export default VolumeControl;
