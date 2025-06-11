import React from 'react';
import styles from '../../styles/PrestigeButton.module.scss';

function PrestigeButton({ onPrestige, disabled }) {
  return (
    <button
      className={styles.prestigeButton}
      onClick={onPrestige}
      disabled={disabled}
    >
      🔄 Престиж (скинути прогрес)
    </button>
  );
}

export default PrestigeButton;
