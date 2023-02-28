import React, { useCallback } from "react";
import { createContext  } from "react";

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

type Props = {
  children?: JSX.Element[] | React.ReactElement;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return React.useContext(DrawerContext);
};

export const DrawerProvider: React.FC<Props> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawerOpen = useCallback(() => {
      setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);


  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
         {children}
    </DrawerContext.Provider>
  );
};
