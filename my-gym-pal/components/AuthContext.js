import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: '',
    token: '',
    trainingPlan: [],
  });

  const login = (username, token, trainingPlan) => {
    setAuthState({
      isLoggedIn: true,
      username,
      token,
      trainingPlan,
    });
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      username: '',
      token: '',
      trainingPlan: [],
    });
  };

  const updateTrainingPlan = (newPlan) => {
    setAuthState((prevState) => ({
      isLoggedIn: prevState.isLoggedIn,
      username: prevState.username,
      token: prevState.token,
      trainingPlan: [...prevState.trainingPlan, ...newPlan],
    }));
    console.log('in authcontext updatetrainingplan',authState.trainingPlan);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateTrainingPlan }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
