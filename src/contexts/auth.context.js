import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(Object | null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = async (user) => {
    try {
      setAuthenticatedUser(user);
      setToken(user.uid);
      await AsyncStorage.multiSet([
        ['@auth_user', JSON.stringify(user)],
        ['@token', JSON.stringify(user.uid)],
      ]);
    } catch (e) {
      console.log('LOGIN ERROR: ', e);
    }
  };

  const logout = async () => {
    setAuthenticatedUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(['@auth_user', '@token']);
  };

  useEffect(() => {
    const loadStorageGetData = async () => {
      const storagedUser = await AsyncStorage.getItem('@auth_user');
      const storagedToken = await AsyncStorage.getItem('@token');

      if (storagedToken && storagedUser) {
        setAuthenticatedUser(JSON.parse(storagedUser));
        setToken(JSON.parse(storagedToken));
      }
      setLoading(false);
    };
    loadStorageGetData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!authenticatedUser,
        token: null,
        authenticatedUser: {},
        signin,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throwContextError('Auth');
  return context;
};
