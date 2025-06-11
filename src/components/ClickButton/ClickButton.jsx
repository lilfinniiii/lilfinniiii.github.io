import React from 'react';
import styles from '../../styles/ClickButton.module.scss';
import { motion } from 'framer-motion';

function ClickButton({ onClick, clickValue }) {
  return (
    <motion.button
      className={styles.clickButton}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      Клік +{clickValue}
    </motion.button>
  );
}

export default ClickButton;