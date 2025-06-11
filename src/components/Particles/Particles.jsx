import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: 'transparent' },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: ['#00ffe7', '#8e2de2'] },
          shape: { type: 'circle' },
          opacity: { value: 0.4 },
          size: { value: 5 },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            outMode: 'bounce',
          },
        },
      }}
    />
  );
}

export default ParticleBackground;
