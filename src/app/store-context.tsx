'use client';

import { createContext, useContext, ReactNode } from 'react';
import { layersStore, LayersStore } from '@/entities/layer';

/**
 * React Context for MobX stores
 */

const LayersStoreContext = createContext<LayersStore | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <LayersStoreContext.Provider value={layersStore}>
      {children}
    </LayersStoreContext.Provider>
  );
}

export function useLayersStore(): LayersStore {
  const store = useContext(LayersStoreContext);
  if (!store) {
    throw new Error('useLayersStore must be used within StoreProvider');
  }
  return store;
}
