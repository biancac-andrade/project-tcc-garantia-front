/* eslint-disable react/prop-types */
/* import React, { useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};
 */

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ token: '', user: {} });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuthContext };