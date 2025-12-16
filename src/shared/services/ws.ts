import { action, makeObservable, observable } from 'mobx';
import { io, Socket } from 'socket.io-client';

export type WSServiceOptions = NonNullable<Parameters<typeof io>[1]>

const defaultOptions: WSServiceOptions = {
  transports: ['websocket', 'polling'],
  autoConnect: false,
  reconnection: true,
  withCredentials: true,
};

/**
 * WebSocket service for real-time communication
 * Provides methods to connect, disconnect, emit, and listen for events
 * the full list of the socket events you can find here: server/mock-server.ts
 */
export class WSService {
  connected = false;

  private socket: Socket;

  constructor(
    url: string,
    private options: WSServiceOptions = defaultOptions,
  ) {
    makeObservable(this, {
      connected: observable,
      setConnected: action,
      dispose: action,
      disconnect: action,
    });

    this.socket = this.initSocket(url, options);
    this.options = { ...defaultOptions, ...options };
  }

  private initSocket = (url: string, options: WSServiceOptions) => {
    const socket = io(url, options);

    socket.on('disconnect', () => {
      this.setConnected(false);
    });

    return socket;
  };

  connect() {
    return new Promise<void>((resolve) => {
      this.socket.connect();

      const handler = () => {
        this.setConnected(true);
        resolve();
      };

      this.socket.once('connect', handler);
    });
  }

  setConnected = (value: boolean) => {
    this.connected = value;
  };

  disconnect() {
    this.socket.disconnect();
    this.setConnected(false);
  }

  dispose() {
    this.disconnect();
    this.socket.removeAllListeners();
    this.setConnected(false);
  }

  on(
    type: string,
    listener: (params: any) => void,
  ) {
    this.socket.on(type, listener);

    return () => {
      this.socket.off(type, listener);
    };
  }

  off(
    type: string,
    listener: (params: any) => void,
  ) {
    this.socket.off(type, listener);
  }

  emit(type: string, body?: any) {
    const bodyCopy = body ? { ...body } : {};

    this.socket.emit(type, bodyCopy);
  }
}

export const wsService = new WSService('ws://localhost:3001');
