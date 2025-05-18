import { createContext, useContext, useState, type ReactNode } from "react";

interface MenuContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <MenuContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu debe usarse dentro de MenuProvider");
  return context;
};
