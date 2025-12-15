/**
 * Represents an image layer on the canvas
 */
export interface Layer {
  id: string;
  name: string;
  imageUrl: string;
  position: Position;
  zIndex: number;
  visible: boolean;
  opacity: number;
}

export interface Position {
  x: number;
  y: number;
}

/**
 * Socket event payloads for layer operations
 *
 * NOTE: Pay attention to the position format from the server.
 */
export interface LayerAddedPayload {
  layer: Layer;
}

export interface LayerMovedPayload {
  layerId: string;
  position: Position;
}

export interface LayerRemovedPayload {
  layerId: string;
}

export interface LayerReorderedPayload {
  layerId: string;
  newIndex: number;
}
