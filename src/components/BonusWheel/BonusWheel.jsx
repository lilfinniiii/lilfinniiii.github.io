import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/BonusWheel.module.scss';

const bonuses = [
  { title: '☣️ DDoS', effect: 'ddos' },
  { title: '🦠 Вірус', effect: 'virus' },
  { title: '✖️ X2 Клік', effect: 'x2' },
  { title: '⚙️ Автоклік', effect: 'autoclick' },
];

function BonusWheel({ onActivate }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  const spin = () => {
    const rand = Math.floor(Math.random() * bonuses.length);
    setResult(bonuses[rand]);
    onActivate(bonuses[rand].effect);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(!open)} className={styles.toggle}>
        🎰
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <p>Крути рулетку:</p>
            <button onClick={spin}>Обертати 🎲</button>
            {result && <p className={styles.result}>{result.title}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BonusWheel;
