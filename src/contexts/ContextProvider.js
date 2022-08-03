import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../components/useLocalStorage";

const StateContext = createContext("");

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [user, setUser] = useLocalStorage("user", null);
  console.log(user);
  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu, user, setUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
