import React from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useAuth} from '../contexts/auth.context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MyPhotosPage from './my-photos.page';
import ProfilePage from './profile.page';
import ExplorerPage from './explorer.page';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
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
  const {logout} = useAuth();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>MyDataScreen!</Text>
      <Button onPress={() => logout()} title="Sair"></Button>
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
