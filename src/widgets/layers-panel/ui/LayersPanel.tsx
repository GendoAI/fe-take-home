'use client';

import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import styles from './layers-panel.module.css';

const cnPanel = cn('LayersPanel', styles);

/**
 * Side panel for managing layers
 *
 * TODO: Implement this component to:
 * 1. Display all layers from layersStore.sortedLayers (in reverse for UI - top layer first)
 * 2. Show an empty state when there are no layers
 * 3. Render LayerItem for each layer
 * 4. Pass necessary props to LayerItem for selection, deletion, reordering
 *
 */
export const LayersPanel = observer(function LayersPanel() {
  // TODO: Get layers from store

  return (
    <aside className={cnPanel()}>
      <header className={cnPanel('header')}>
        <div className={cnPanel('headerTitle')}>
          <Icon name="layers" size={16} />
          <h2 className={cnPanel('title')}>Layers</h2>
        </div>
        <span className={cnPanel('count')}>0</span>
      </header>

      <div className={cnPanel('list')}>
        {/* TODO: Render layers or empty state */}
        <div className={cnPanel('empty')}>
          <p>No layers yet</p>
          <p className={cnPanel('emptyHint')}>Upload an image to get started</p>
        </div>
      </div>
    </aside>
  );
});
