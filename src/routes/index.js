import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import {useAuth} from '../contexts/auth.context';
import {ActivityIndicator, View, Text} from 'react-native';

const Routes = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Carregando...</Text>
        <ActivityIndicator size={40} color="#000"></ActivityIndicator>
      </View>
    );
  }
  return signed && !loading ? <AppRoutes /> : <AuthRoutes />;
};
export default Routes;
