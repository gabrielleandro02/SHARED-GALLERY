import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveAuthenticatedUser = async (user) => {
    try {
      setAuthenticatedUser(user);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(user));
    } catch (e) {
      console.log('LOGIN ERROR: ', e);
    }
  };

  const logout = async () => {
    setAuthenticatedUser(null);
    await AsyncStorage.removeItem('@auth_user');
  };

  useEffect(() => {
    const loadStorageGetData = async () => {
      const storagedUser = await AsyncStorage.getItem('@auth_user');

      if (storagedUser) {
        saveAuthenticatedUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    };
    loadStorageGetData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!authenticatedUser,
        authenticatedUser,
        setAuthenticatedUser,
        saveAuthenticatedUser,
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
