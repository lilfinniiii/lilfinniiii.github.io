import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles/App.module.scss';
import ClickButton from './components/ClickButton/ClickButton';
import SoundPanel from './components/SoundPanel/SoundPanel';
import BonusWheel from './components/BonusWheel/BonusWheel';
import ParticleBackground from './components/Particles/Particles';
import { useProgress } from './hooks/useProgress';
import { useSound } from './hooks/useSound';
import { baseUpgradePrices } from './db/upgradesData'

import clickSound from './assets/click.mp3';
import bonusSound from './assets/bonus.mp3';
import prestigeSound from './assets/prestige.mp3';

import PrestigeButton from './components/Prestige/PrestigeButton';
import SkinSelector from './components/SkinSelector/SkinSelector';

function App() {
  const [state, setState] = useState({
    credits: 0,
    clickValue: 1,
    duiktcoins: 0,
    autoclick: 0
  });

  const [upgradePrices, setUpgradePrices] = useState({
    click1: 50,
    click5: 150,
    x2: 300,
    autoclick: 500,
    speedBoost: 800
  });
  
  


  const [virusActive, setVirusActive] = useState(false);
  const [ddosActive, setDdosActive] = useState(false);
  const [activeSkin, setActiveSkin] = useState('classic');
  const [activePanel, setActivePanel] = useState(null);

  const { soundOn, setSoundOn, volume, setVolume, playSound } = useSound();
  useProgress(state, setState);
  
  const basePrestigePrice = 500;
  const prestigePrice = basePrestigePrice * (1 + state.duiktcoins * 0.5);

  const prestigeBonusMultiplier = 1 + state.duiktcoins * 0.1;

  const getBonusMultiplier = () => prestigeBonusMultiplier;

  const handleClick = () => {
    if (ddosActive) return;
    playSound(clickSound);
    setState((prev) => ({
      ...prev,
      credits: prev.credits + prev.clickValue * getBonusMultiplier()
    }));
  };

  const handlePrestige = () => {
    if (state.credits >= prestigePrice) {
      const earnedDuiktcoins = Math.floor(state.credits / 500);
      setState((prev) => ({
        ...prev,
        duiktcoins: prev.duiktcoins + earnedDuiktcoins,
        credits: 0,
        clickValue: 1,
        autoclick: 0
      }));
      setUpgradePrices(baseUpgradePrices); // скидаємо ціни до базових
      playSound(prestigeSound);
      alert(`🎉 Ви отримали ${earnedDuiktcoins} Duiktcoins!`);
    }
  };
  

  const handleBuyCustomUpgrade = (type) => {
    if (state.credits >= upgradePrices[type]) {
      setState((prev) => {
        let newClickValue = prev.clickValue;
        let newAutoclick = prev.autoclick;

        if (type === 'click1') newClickValue += 1;
        if (type === 'click5') newClickValue += 5;
        if (type === 'x2') newClickValue *= 2;
        if (type === 'autoclick') newAutoclick += 1;
        if (type === 'speedBoost') newAutoclick += 2;

        return {
          ...prev,
          credits: prev.credits - upgradePrices[type],
          clickValue: newClickValue,
          autoclick: newAutoclick
        };
      });

      setUpgradePrices((prev) => ({
        ...prev,
        [type]: Math.floor(prev[type] * 1.2)
      }));
    }
  };

  const handleBonusEffect = (effect) => {
    if (effect === 'virus') {
      setState((prev) => ({ ...prev, clickValue: prev.clickValue / 2 }));
      setVirusActive(true);
      setTimeout(() => {
        setVirusActive(false);
        setState((prev) => ({ ...prev, clickValue: prev.clickValue * 2 }));
      }, 5000);
      alert('🦠 Вірус активовано!');
    }
    if (effect === 'ddos') {
      setDdosActive(true);
      setTimeout(() => setDdosActive(false), 5000);
      alert('☣️ DDoS! Кліки заблоковані на 5 секунд!');
    }
    if (effect === 'x2') {
      setState((prev) => ({ ...prev, clickValue: prev.clickValue * 2 }));
      setTimeout(() => {
        setState((prev) => ({ ...prev, clickValue: prev.clickValue / 2 }));
      }, 10000);
      alert('✖️ X2 Клік на 10 секунд!');
    }
    if (effect === 'autoclick') {
      const interval = setInterval(() => {
        handleClick();
      }, 500);
      setTimeout(() => clearInterval(interval), 10000);
      alert('⚙️ Автоклік 10 секунд!');
    }
    playSound(bonusSound);
  };

  useEffect(() => {
    if (!state.autoclick) return;
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        credits: prev.credits + prev.autoclick * getBonusMultiplier()
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.autoclick, state.duiktcoins]);

  const handleSelectSkin = (theme) => {
    setActiveSkin(theme);
  };

  const skins = [
    { id: 1, title: 'Класичний', price: 0, theme: 'classic' },
    { id: 2, title: 'Темний', price: 2, theme: 'dark' },
    { id: 3, title: 'Неоновий', price: 2, theme: 'neon' },
    { id: 4, title: 'Радуга', price: 2, theme: 'rainbow' }
  ];

  return (
    <div className={`${styles.app} ${styles[activeSkin]}`}>
      <ParticleBackground />
      <SoundPanel
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        volume={volume}
        setVolume={setVolume}
      />
      <BonusWheel onActivate={handleBonusEffect} />

      <div className={styles.infoPanel}>
        <h1>Clicker 🚀</h1>
        <p>Кредити: {Math.floor(state.credits)}</p>
        <p>Duiktcoins: {state.duiktcoins}</p>
        <p>Бонус множник: x{getBonusMultiplier().toFixed(1)}</p>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.centerButton}>
          <ClickButton onClick={handleClick} clickValue={state.clickValue} />

          {virusActive && <p style={{ color: 'red' }}>☣️ Вірус активний!</p>}
          {ddosActive && <p style={{ color: 'orange' }}>🚫 DDoS заблокував кліки!</p>}

          <div className={styles.menuWrapper}>
            <div className={styles.menuButtons}>
              <button
                onClick={() =>
                  setActivePanel(activePanel === 'upgrades' ? null : 'upgrades')
                }
              >
                Upgrade
              </button>
              <button
                onClick={() =>
                  setActivePanel(activePanel === 'prestige' ? null : 'prestige')
                }
              >
                Prestige
              </button>
              <button
                onClick={() =>
                  setActivePanel(activePanel === 'skins' ? null : 'skins')
                }
              >
                Skins
              </button>
            </div>

            <AnimatePresence>
              {activePanel && (
                <motion.div
                  className={styles.panelContainer}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activePanel === 'upgrades' && (
                    <motion.div className={styles.upgradePanel}>
                      <h3>Апгрейди:</h3>
                      <div className={styles.upgradeList}>
                        <button onClick={() => handleBuyCustomUpgrade('click1')}>
                          +1 до кліку ({upgradePrices.click1})
                        </button>
                        <button onClick={() => handleBuyCustomUpgrade('click5')}>
                          +5 до кліку ({upgradePrices.click5})
                        </button>
                        <button onClick={() => handleBuyCustomUpgrade('x2')}>
                          X2 клік ({upgradePrices.x2})
                        </button>
                        <button onClick={() => handleBuyCustomUpgrade('autoclick')}>
                          Автоклік +1 ({upgradePrices.autoclick})
                        </button>
                        <button onClick={() => handleBuyCustomUpgrade('speedBoost')}>
                          Turbo Autoclick +2 ({upgradePrices.speedBoost})
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activePanel === 'prestige' && (
                    <motion.div className={styles.prestigePanel}>
                      <h3>Prestige 🥇</h3>
                      <p>Вартість престижу: <b>{prestigePrice.toFixed(0)}</b> кредитів</p>
                      <p>Ваш бонус від престижу: <b>+{((prestigeBonusMultiplier - 1) * 100).toFixed(1)}%</b> до кліку</p>
                      <progress
                        value={state.credits}
                        max={prestigePrice}
                        style={{ width: '100%', height: '20px', borderRadius: '10px' }}
                      />
                      <PrestigeButton
                        onPrestige={handlePrestige}
                        disabled={state.credits < prestigePrice}
                      />
                    </motion.div>
                  )}

                  {activePanel === 'skins' && (
                    <SkinSelector
                      skins={skins}
                      duiktcoins={state.duiktcoins}
                      activeSkin={activeSkin}
                      onSelect={handleSelectSkin}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
