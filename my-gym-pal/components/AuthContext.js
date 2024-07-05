import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: '',
    token: '',
  });

  const login = (username, token) => {
    setAuthState({
      isLoggedIn: true,
      username,
      token,
    });
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      username: '',
      token: '',
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
