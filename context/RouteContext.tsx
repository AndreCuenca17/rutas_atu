// app/contexts/RouteContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RouteContextType {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within RouteProvider');
  }
  return context;
};

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState('azul');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <RouteContext.Provider value={{
      currentRoute,
      setCurrentRoute,
      isDrawerOpen,
      setIsDrawerOpen
    }}>
      {children}
    </RouteContext.Provider>
  );
};