import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check if admin is logged in
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // You can add an endpoint to verify token if needed
        setLoading(false);
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token: newToken, user } = response.data;

      // Check if user is admin
      if (user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      // Set token and admin state
      setToken(newToken);
      setAdmin(user);
      localStorage.setItem("adminToken", newToken);

      // IMPORTANT: Set axios headers immediately (don't wait for useEffect)
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      return { success: true, user };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    admin,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
