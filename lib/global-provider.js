import React, { createContext, useContext } from "react";

import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite.js";
import { Redirect } from "expo-router";

const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
