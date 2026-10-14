'use client';
import React, { createContext, useContext, useMemo } from 'react';

import { MediaMode } from '@/types/mediaMode';

interface MediaContextProps {
  mediaMode: MediaMode;
  genres: Record<number, string>;
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
  const value = useMemo(() => ({ mediaMode, genres }), [mediaMode, genres]);
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};
