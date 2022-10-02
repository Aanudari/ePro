import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../components/useLocalStorage";

const StateContext = createContext("");

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const allRoles = [192, 194, 169, 193, 197, 192, 188, 189, 195, 190, 208, 196, 1, 2, 3, 4, 5, 6, 7, 168, 199]
  const roleId = user ? user.role_id : null
  const TOKEN = user ? user.token : null
  const deviceId = user ? user.device_id : null
  const [inputValue, setInputValue] = useState("");
  const [sideBarTrack, setsideBarTrack] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [uiStatus, setUiStatus] = useState('1');
  return (
    <StateContext.Provider value={{
      activeMenu, setActiveMenu, user, setUser, roleId, allRoles, sideBarTrack,
      setsideBarTrack, deviceId, TOKEN, inputValue, setInputValue, showTop, setShowTop,
      uiStatus, setUiStatus, showModal, setShowModal
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
