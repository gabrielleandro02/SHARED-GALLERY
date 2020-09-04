import React from 'react';
import DashboardPage from '../pages/dashboard.page';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {backgroundColor: '#7159C1'},
      headerTitleStyle: {color: 'white'},
      headerTitleAlign: 'center',
    }}>
    <AppStack.Screen name="DashboardPage" component={DashboardPage} />
  </AppStack.Navigator>
);

export default AppRoutes;
