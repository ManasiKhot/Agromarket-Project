import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('agroUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('agroUser', JSON.stringify(userData)); // Save to browser storage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('agroUser'); // Clear from storage
    window.location.href = '/'; // Redirect to home
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};