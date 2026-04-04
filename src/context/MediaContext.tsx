'use client';
import React, { createContext, useContext } from 'react';

import { MediaMode } from '@/types/mediaMode';

interface MediaContextProps {
  mediaMode?: MediaMode;
  genres?: Record<number, string>;
}

const MediaContext = createContext<MediaContextProps | undefined>(undefined);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error('useMediaContext must be used within MediaProvider');
  return context;
};

interface MediaProviderProps extends MediaContextProps {
  children: React.ReactNode;
}

export const MediaProvider = ({ children, mediaMode, genres }: MediaProviderProps) => {
  return <MediaContext.Provider value={{ mediaMode, genres }}>{children}</MediaContext.Provider>;
};
