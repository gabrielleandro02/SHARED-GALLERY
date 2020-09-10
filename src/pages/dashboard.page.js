import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MyPhotosPage from './my-photos.page';
import ProfilePage from './profile.page';
import ExplorerPage from './explorer.page';

const Tab = createMaterialBottomTabNavigator();

export default function DashboardPage() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="grey"
        sceneAnimationEnabled
        barStyle={{backgroundColor: '#694fad', paddingVertical: 3}}>
        <Tab.Screen
          name="Explorer"
          component={ExplorerPage}
          options={{
            tabBarLabel: 'Explorar',
            tabBarIcon: () => <Icons name="public" color={'white'} size={26} />,
          }}
        />
        <Tab.Screen
          name="MyPhotos"
          component={MyPhotosPage}
          options={{
            tabBarLabel: 'Minhas Fotos',
            tabBarIcon: () => <Icons name="photo" color={'white'} size={26} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: () => <Icons name="person" color={'white'} size={26} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
