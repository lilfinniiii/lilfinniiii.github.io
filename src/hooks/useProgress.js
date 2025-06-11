import { useEffect, useState } from 'react';
import { db } from '../db/database';

export function useProgress(state, setState) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Завантаження прогресу з IndexedDB
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const creditsEntry = await db.progress.get('credits');
        const clickValueEntry = await db.progress.get('clickValue');
        const duiktcoinsEntry = await db.progress.get('duiktcoins');
        const autoclickEntry = await db.progress.get('autoclick');

        setState((prev) => ({
          ...prev,
          credits: creditsEntry?.value ?? prev.credits,
          clickValue: clickValueEntry?.value ?? prev.clickValue,
          duiktcoins: duiktcoinsEntry?.value ?? prev.duiktcoins,
          autoclick: autoclickEntry?.value ?? prev.autoclick
        }));

        setIsLoaded(true);
      } catch (error) {
        console.error('❌ Error loading progress:', error);
      }
    };

    loadProgress();
  }, [setState]);

  // Збереження прогресу після завантаження
  useEffect(() => {
    if (!isLoaded) return;

    const saveProgress = async () => {
      try {
        await db.progress.bulkPut([
          { key: 'credits', value: state.credits },
          { key: 'clickValue', value: state.clickValue },
          { key: 'duiktcoins', value: state.duiktcoins },
          { key: 'autoclick', value: state.autoclick }
        ]);
        console.log('✅ Progress saved:', state);
      } catch (error) {
        console.error('❌ Error saving progress:', error);
      }
    };

    saveProgress();
  }, [state, isLoaded]);
}
