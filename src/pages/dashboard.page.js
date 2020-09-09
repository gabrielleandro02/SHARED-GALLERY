import React from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useAuth} from '../contexts/auth.context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MyPhotosPage from './myPhotos.page';

function HomeScreen() {
  const {logout} = useAuth();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Button onPress={() => logout()} title="Sair"></Button>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyDataScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>MyDataScreen!</Text>
    </View>
  );
}

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
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icons name="home" color={'white'} size={26} />,
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
          component={MyDataScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: () => <Icons name="person" color={'white'} size={26} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
