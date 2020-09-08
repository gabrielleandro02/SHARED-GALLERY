import React from 'react';
import SigninPage from '../pages/signin.page';
import LoginPage from '../pages/login.page';
import HomePage from '../pages/home.page';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    initialRouteName="HomePage"
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {backgroundColor: '#7159C1'},
      headerTitleStyle: {color: 'white'},
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    }}>
    <AuthStack.Screen
      name="SigninPage"
      component={SigninPage}
      options={{
        title: 'Cadastro',
      }}
    />
    <AuthStack.Screen
      name="LoginPage"
      component={LoginPage}
      options={{
        title: 'Login',
      }}
    />
    <AuthStack.Screen
      name="HomePage"
      component={HomePage}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
