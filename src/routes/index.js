import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import {useAuth} from '../contexts/auth.context';

const Routes = () => {
  const {signed, loading} = useAuth();

  return signed && !loading ? <AppRoutes /> : <AuthRoutes />;
};
export default Routes;
