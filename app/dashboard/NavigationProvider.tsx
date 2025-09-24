"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import NavigationDrawer from "./NavigationDrawer";
import MenuButton from "./MenuButton";

interface NavigationContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
}

export default function NavigationProvider({
  children
}: NavigationProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const value = {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer
  };

  return (
    <NavigationContext.Provider value={value}>
      <div className="relative">
        {/* Fixed Menu Button */}
        <div className="fixed top-4 left-4 z-30">
          <MenuButton onClick={toggleDrawer} />
        </div>

        {/* Main Content */}
        <div className="min-h-screen">{children}</div>

        {/* Navigation Drawer */}
        <NavigationDrawer isOpen={isOpen} onClose={closeDrawer} />
      </div>
    </NavigationContext.Provider>
  );
}
