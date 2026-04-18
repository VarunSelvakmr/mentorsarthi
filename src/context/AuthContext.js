import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("jwt_token");
      const storedUser = await SecureStore.getItemAsync("user_data");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log("Error loading auth:", e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, jwtToken) => {
    try {
      await SecureStore.setItemAsync("jwt_token", jwtToken);
      await SecureStore.setItemAsync("user_data", JSON.stringify(userData));
      setUser(userData);
      setToken(jwtToken);
    } catch (e) {
      console.log("Error saving auth:", e);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("jwt_token");
      await SecureStore.deleteItemAsync("user_data");
      setUser(null);
      setToken(null);
    } catch (e) {
      console.log("Error clearing auth:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
