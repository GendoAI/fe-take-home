'use client';

import { Toolbar } from '@/features/toolbar';
import { Canvas } from '@/features/canvas';
import { LayersPanel } from '@/widgets/layers-panel';
import styles from './HomePage.module.css';

/**
 * Main page composition
 */
export function HomePage() {
  return (
    <div className={styles.HomePage}>
      <Toolbar />
      <main className={styles['HomePage-main']}>
        <Canvas />
        <LayersPanel />
      </main>
    </div>
  );
}
