import React from 'react';
import styles from '../../styles/SkinSelector.module.scss';

function SkinSelector({ skins, duiktcoins, activeSkin, onSelect }) {
  return (
    <div className={styles.skinSelector}>
      <h2>Скіни:</h2>
      {skins.map((skin) => (
        <button
          key={skin.id}
          disabled={skin.price > duiktcoins}
          onClick={() => onSelect(skin.theme)}
          className={
            activeSkin === skin.theme ? styles.active : ''
          }
        >
          {skin.title} ({skin.price} Duiktcoins)
        </button>
      ))}
    </div>
  );
}

export default SkinSelector;
