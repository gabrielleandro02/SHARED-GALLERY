import React, {createContext, useState, useEffect, useContext} from 'react';
import * as auth from '../services/auth.service';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(Object | null);
  const [loading, setLoading] = useState(true);

  const signin = async () => {
    const response = await auth.signin();
    setUser(response.user);

    await AsyncStorage.setItem(
      '@reactnavigation:user',
      JSON.stringify(response.user),
    );
    await AsyncStorage.setItem(
      '@reactnavigation:token',
      JSON.stringify(response.token),
    );
  };

  const signout = () => {
    AsyncStorage.clear().then((res) => {
      setUser(null);
    });
  };

  useEffect(() => {
    const loadStorageGetData = async () => {
      const storagedUser = await AsyncStorage.getItem('@reactnavigation:user');
      const storagedToken = await AsyncStorage.getItem(
        '@reactnavigation:token',
      );

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    };
    loadStorageGetData();
  }, []);

  return (
    <AuthContext.Provider
      value={{signed: !!user, token: '', user: {}, signin, signout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throwContextError(AuthContext);
  return context;
};
