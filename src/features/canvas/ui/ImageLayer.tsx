'use client';

import { observer } from 'mobx-react-lite';
import type { Layer } from '@/entities/layer';

interface ImageLayerProps {
  layer: Layer;
}

/**
 * Renders a single image layer on the canvas
 *
 * TODO: Implement this component to:
 * 1. Load the texture from layer.imageUrl
 * 2. Render as a mesh with planeGeometry
 * 3. Position based on layer.position.x and layer.position.y
 * 4. Make it draggable (update store on drag end)
 * 5. Apply layer.opacity to the material
 * 6. Handle layer.visible (don't render if false)
 * 7. Show selection state when this layer is selected
 *
 */
export const ImageLayer = observer(function ImageLayer({ layer }: ImageLayerProps) {
  // TODO: Your implementation here

  return (
    <mesh position={[layer.position.x, layer.position.y, layer.zIndex]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#444444" />
    </mesh>
  );
});
