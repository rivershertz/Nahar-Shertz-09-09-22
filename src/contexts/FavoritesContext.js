import React, { useState, useContext } from "react";

const FavoritesContext = React.createContext();
const FavoritesContextUpdate = React.createContext();

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function useFavoritesUpdate() {
    return useContext(FavoritesContextUpdate)
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesContext.Provider value={favorites}>
      <FavoritesContextUpdate.Provider value={setFavorites}>
        {children}
      </FavoritesContextUpdate.Provider>
    </FavoritesContext.Provider>
  );
}
