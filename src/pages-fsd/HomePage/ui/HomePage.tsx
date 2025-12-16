'use client';

import { wsService } from '@/shared/services';
import { Canvas } from '@/widgets/canvas';
import { LayersPanel } from '@/widgets/layersPanel';
import { Toolbar } from '@/widgets/toolbar';
import { useEffect } from 'react';
import styles from './HomePage.module.css';

/**
 * Main page composition
 */
export function HomePage() {
  useEffect(() => {
    wsService.connect();

    return () => {
      wsService.dispose();
    };
  }, []);

  return (
    <div className={styles.HomePage}>
      <Toolbar />
      <main className={styles['HomePage-Main']}>
        <Canvas />
        <LayersPanel />
      </main>
    </div>
  );
}
