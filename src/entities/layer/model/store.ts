import { makeAutoObservable } from 'mobx';
import type { Layer, Position } from './types';

/**
 * Store for managing canvas layers
 *
 *
 * TODO: Implement the following:
 * - Observable state for layers array and selectedLayerId
 * - Actions to add, remove, update, and reorder layers
 * - Computed properties for sorted layers and selected layer
 *
 */
export class LayersStore {
  // TODO: Add observable state
  layers: Layer[] = [];
  selectedLayerId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // TODO: Implement action to add a new layer
  addLayer(layer: Layer) {
    // Your implementation here
  }

  // TODO: Implement action to remove a layer by ID
  removeLayer(layerId: string) {
    // Your implementation here
  }

  // TODO: Implement action to update a layer's position
  updateLayerPosition(layerId: string, position: Position) {
    // Your implementation here
  }

  // TODO: Implement action to set the selected layer
  setSelectedLayer(layerId: string | null) {
    // Your implementation here
  }

  // TODO: Implement action to reorder a layer to a new index
  // This should update zIndex values appropriately
  reorderLayer(layerId: string, newIndex: number) {
    // Your implementation here
  }

  // TODO: Implement computed property that returns layers sorted by zIndex
  get sortedLayers(): Layer[] {
    // Your implementation here
    return [];
  }

  // TODO: Implement computed property that returns the currently selected layer
  get selectedLayer(): Layer | undefined {
    // Your implementation here
    return undefined;
  }
}

// Singleton instance (in real apps, consider dependency injection)
export const layersStore = new LayersStore();
