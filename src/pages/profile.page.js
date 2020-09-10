import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Button,
  SafeAreaView,
} from 'react-native';
import {Toast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAuth} from '../contexts/auth.context';
import {signUp} from '../services/auth.service';
import {Formik} from 'formik';
import * as Yup from 'yup';

import UserMale from '../assets/user-male.png';

import Logo from '../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dataContainer: {
    margin: 40,
  },
  image: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginTop: 50,
  },
  text: {
    fontSize: 17,
    paddingVertical: 10,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#7159C1',
    width: '60%',
    borderRadius: 50,
    padding: 10,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
});

const ProfilePage = ({navigation}) => {
  const {authenticatedUser, logout} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={UserMale} />
      <View style={styles.dataContainer}>
        <Text style={styles.text}>EMAIL: {authenticatedUser.email}</Text>
        <Text style={styles.text}>UID: {authenticatedUser.uid}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePage;
