import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Root} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './contexts/auth.context';
import Routes from './routes/index';

const App = () => {
  return (
    <NavigationContainer independent>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor="#573ea8" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
