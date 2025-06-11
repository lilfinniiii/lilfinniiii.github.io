import React from 'react';
import styles from '../../styles/SoundToggle.module.scss';

function SoundToggle({ soundOn, setSoundOn }) {
  return (
    <button
      className={styles.toggle}
      onClick={() => setSoundOn(!soundOn)}
    >
      {soundOn ? '🔊 Звук увімкнено' : '🔇 Звук вимкнено'}
    </button>
  );
}

export default SoundToggle;
