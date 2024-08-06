// src/contexts/ToggleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToggleContextType {
  isManageBarActive: boolean;
  toggleBar: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};

export const ToggleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isManageBarActive, setIsManageBarActive] = useState(true);

  const toggleBar = () => {
    setIsManageBarActive(!isManageBarActive);
  };

  return (
    <ToggleContext.Provider value={{ isManageBarActive, toggleBar }}>
      {children}
    </ToggleContext.Provider>
  );
};
