'use client';

import { Canvas as R3FCanvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { layersStore } from '@/entities/layer';
import { CANVAS_CONFIG } from '@/shared/types';
import { ImageLayer } from './ImageLayer';
import styles from './canvas.module.css';

/**
 * Main canvas component that renders the Three.js scene
 *
 * Uses an orthographic camera for 2D-style rendering.
 * The coordinate system is centered at (0, 0) with the canvas
 * dimensions defined in CANVAS_CONFIG.
 */
export const Canvas = observer(function Canvas() {

  return (
    <div className={styles.Canvas}>
      <R3FCanvas
        orthographic
        camera={{
          zoom: 1,
          position: [0, 0, 100],
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        style={{
          background: CANVAS_CONFIG.BACKGROUND_COLOR,
        }}
      >
        <color attach='background' args={[CANVAS_CONFIG.BACKGROUND_COLOR]} />

        <gridHelper
          args={[Math.max(CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT) * 2, 40, '#333333', '#2a2a2a']}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -1]}
        />

        {layersStore.sortedLayers.map((layer) => (
          <ImageLayer key={layer.id} layer={layer} />
        ))}
      </R3FCanvas>

      <div className={styles['Canvas-status']}>
        <div className={styles['Canvas-statusDot']} data-connected='false' />
        <span className={styles['Canvas-statusText']}>Disconnected</span>
      </div>
    </div>
  );
});
