'use client';

import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Icon } from '@/shared/ui';
import type { Layer } from '@/entities/layer';
import styles from './layers-panel.module.css';

const cnItem = cn('LayerItem', styles);

interface LayerItemProps {
  layer: Layer;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
}

/**
 * Individual layer item in the layers panel
 *
 * TODO: Implement this component to:
 * 1. Show the layer thumbnail (use layer.imageUrl as src)
 * 2. Show the layer name
 * 3. Handle click to select the layer
 * 4. Show delete button that removes the layer
 * 5. Show up/down buttons for reordering (disabled at boundaries)
 * 6. Apply selected styling when isSelected is true
 * 7. Optionally: show visibility toggle (layer.visible)
 * 8. Optionally: show opacity indicator
 *
 */
export const LayerItem = observer(function LayerItem({
  layer,
  isSelected,
  isFirst,
  isLast,
}: LayerItemProps) {
  // TODO: Get store actions

  const handleSelect = () => {
    // TODO: Select this layer
    console.log('Select layer:', layer.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Delete this layer
    console.log('Delete layer:', layer.id);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Move layer up (increase zIndex)
    console.log('Move up:', layer.id);
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Move layer down (decrease zIndex)
    console.log('Move down:', layer.id);
  };

  return (
    <div
      className={cnItem({ selected: isSelected })}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
    >
      <img
        src={layer.imageUrl}
        alt={layer.name}
        className={cnItem('thumbnail')}
      />

      <div className={cnItem('info')}>
        <span className={cnItem('name')}>{layer.name}</span>
      </div>

      <div className={cnItem('actions')}>
        <Button
          variant="ghost"
          size="sm"
          icon
          onClick={handleMoveUp}
          disabled={isLast}
          title="Move up"
        >
          <Icon name="chevron-up" size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon
          onClick={handleMoveDown}
          disabled={isFirst}
          title="Move down"
        >
          <Icon name="chevron-down" size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon
          onClick={handleDelete}
          title="Delete layer"
          className={cnItem('deleteButton')}
        >
          <Icon name="trash" size={14} />
        </Button>
      </div>
    </div>
  );
});
