'use client';

import { Toolbar } from '@/widgets/toolbar';
import { Canvas } from '@/widgets/canvas';
import { LayersPanel } from '@/widgets/layersPanel';
import styles from './HomePage.module.css';

/**
 * Main page composition
 */
export function HomePage() {
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
