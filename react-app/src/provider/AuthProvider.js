import API from '../api';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete API.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const signup = async ({ email, password }) => {
    try {
      const { data } = await API.post('/auth/signup', { email, password });
      // const { token, user } = data;
      // setToken(token);
      // setUser(user);
      return data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };

  const signin = async ({ email, password }) => {
    try {
      const response = await API.post('/auth/signin', { email, password });
      const { token } = response.data;
      setToken(token);
      return response.data;
    } catch (error) {
      console.log(error, 'error');
      return Promise.reject(error.response.data);
    }
  };

  const signout = async () => {
    try {
      // await API.post('/auth/signout');
      setToken(null);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      signin,
      signup,
      signout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
