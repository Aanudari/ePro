import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../components/useLocalStorage";

const StateContext = createContext("");

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [user, setUser] = useLocalStorage("user", null);
  const roleId = user ? user.role_id : null
  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu, user, setUser, roleId }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
