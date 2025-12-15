import type { Layer } from '@/entities/layer/@x/image';

/**
 * Image processing types
 */

export type ImageEffect = 'grayscale' | 'blur';

export interface ProcessImageRequest {
  layerId: string;
  imageUrl: string;
  effect: ImageEffect;
}

export interface ProcessImageProcessingPayload {
  layerId: string;
  status: 'processing';
  estimatedTime: number;
}

export interface ProcessImageResultPayload {
  success: boolean;
  originalLayerId: string;
  newLayer?: Layer;
  error?: string;
}
