import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

/**
 * Mock WebSocket server that simulates collaborative editing
 *
 * This server:
 * 1. Accepts client connections
 * 2. Periodically sends fake "layer:added" events to simulate other users
 * 3. Responds to sync requests with current layer state
 * 4. Handles image processing requests (grayscale effect)
 *
 * NOTE: Position format needs some attention...
 */

interface Layer {
  id: string;
  name: string;
  imageUrl: string;
  position: { x: number; y: number };
  zIndex: number;
  visible: boolean;
  opacity: number;
}

interface ProcessImageRequest {
  layerId: string;
  imageUrl: string;
  effect: 'grayscale' | 'blur';
}

interface ProcessImageResponse {
  success: boolean;
  originalLayerId: string;
  newLayer?: Layer;
  error?: string;
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const layers: Layer[] = [];
let layerCounter = 0;

// Sample images for mock layers (from picsum.photos)
const sampleImages = [
  'https://picsum.photos/seed/layer1/200/200',
  'https://picsum.photos/seed/layer2/200/200',
  'https://picsum.photos/seed/layer3/200/200',
  'https://picsum.photos/seed/layer4/200/200',
  'https://picsum.photos/seed/layer5/200/200',
];

function createMockLayer(): Layer {
  layerCounter++;
  const imageIndex = layerCounter % sampleImages.length;

  return {
    id: `remote-${Date.now()}-${layerCounter}`,
    name: `Remote Layer ${layerCounter}`,
    imageUrl: sampleImages[imageIndex],
    position: {
      x: (Math.random() - 0.5),
      y: (Math.random() - 0.5),
    },
    zIndex: layers.length,
    visible: true,
    opacity: 1,
  };
}

/**
 * Simulate image processing by returning a modified image URL
 * In a real app, this would process the image server-side
 *
 * Using picsum.photos parameters to simulate effects:
 * - grayscale: ?grayscale
 * - blur: ?blur=3
 */
function processImage(imageUrl: string, effect: string): string {
  const timestamp = Date.now();

  switch (effect) {
    case 'grayscale':
      return `https://picsum.photos/seed/processed-${timestamp}/200/200?grayscale`;
    case 'blur':
      return `https://picsum.photos/seed/processed-${timestamp}/200/200?blur=3`;
    default:
      return `https://picsum.photos/seed/processed-${timestamp}/200/200`;
  }
}

io.on('connection', (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`);

  if (layers.length > 0) {
    socket.emit('sync:response', layers);
  }

  socket.on('sync:request', () => {
    console.log(`Sync requested by ${socket.id}`);
    socket.emit('sync:response', layers);
  });

  socket.on('image:process', (request: ProcessImageRequest) => {
    console.log(`Processing image for layer ${request.layerId} with effect: ${request.effect}`);

    // Simulate processing delay (1-3 seconds)
    const processingTime = 1000 + Math.random() * 2000;

    socket.emit('image:processing', {
      layerId: request.layerId,
      status: 'processing',
      estimatedTime: Math.round(processingTime / 1000),
    });

    setTimeout(() => {
      // Simulate occasional failures (10% chance)
      if (Math.random() < 0.1) {
        const response: ProcessImageResponse = {
          success: false,
          originalLayerId: request.layerId,
          error: 'Processing failed. Please try again.',
        };
        socket.emit('image:processed', response);
        console.log(`Processing failed for layer ${request.layerId}`);
        return;
      }

      const processedImageUrl = processImage(request.imageUrl, request.effect);
      layerCounter++;

      const newLayer: Layer = {
        id: `processed-${Date.now()}-${layerCounter}`,
        name: `${request.effect.charAt(0).toUpperCase() + request.effect.slice(1)} Effect`,
        imageUrl: processedImageUrl,
        position: {
          x: 0.1, // Offset to the right (normalized)
          y: -0.1, // Offset down (normalized)
        },
        zIndex: layers.length,
        visible: true,
        opacity: 1,
      };

      layers.push(newLayer);

      const response: ProcessImageResponse = {
        success: true,
        originalLayerId: request.layerId,
        newLayer,
      };

      socket.emit('image:processed', response);
      console.log(`Processing complete for layer ${request.layerId}, created new layer: ${newLayer.id}`);
    }, processingTime);
  });

  // Simulate another user adding a layer every 8-12 seconds
  const addLayerInterval = setInterval(() => {
    // Only add up to 5 remote layers to avoid overwhelming
    if (layers.length < 5) {
      const newLayer = createMockLayer();
      layers.push(newLayer);

      console.log(`Broadcasting new layer: ${newLayer.name}`);
      io.emit('layer:added', { layer: newLayer });
    }
  }, 8000 + Math.random() * 4000);

  // Simulate occasional layer movements
  const moveLayerInterval = setInterval(() => {
    if (layers.length > 0) {
      const randomIndex = Math.floor(Math.random() * layers.length);
      const layer = layers[randomIndex];

      // Update position (normalized values)
      layer.position = {
        x: (Math.random() - 0.5),
        y: (Math.random() - 0.5),
      };

      console.log(`Broadcasting layer move: ${layer.name}`);
      io.emit('layer:moved', {
        layerId: layer.id,
        position: layer.position,
      });
    }
  }, 15000 + Math.random() * 5000);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(addLayerInterval);
    clearInterval(moveLayerInterval);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   Mock WebSocket Server                                    ║
║   Running on http://localhost:${PORT}                         ║
╠════════════════════════════════════════════════════════════╣
║   Events emitted:                                          ║
║   • layer:added     (every 8-12 seconds)                   ║
║   • layer:moved     (every 15-20 seconds)                  ║
║   • sync:response   (on request)                           ║
║   • image:processing (when processing starts)              ║
║   • image:processed  (when processing completes)           ║
╠════════════════════════════════════════════════════════════╣
║   Events listened:                                         ║
║   • sync:request                                           ║
║   • image:process   { layerId, imageUrl, effect }          ║
╚════════════════════════════════════════════════════════════╝
  `);
});
