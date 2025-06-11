import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/SoundPanel.module.scss';

function SoundPanel({ soundOn, setSoundOn, volume, setVolume }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(!open)} className={styles.toggle}>
        🔊
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <p>Гучність:</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
            <button onClick={() => setSoundOn(!soundOn)}>
              {soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SoundPanel;
