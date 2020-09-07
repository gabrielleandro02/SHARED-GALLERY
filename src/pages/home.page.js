import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Logo from '../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    justifyContent: 'center',
  },
  textQuestion: {
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    width: '85%',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#7159C1',
    borderRadius: 40,
    padding: 10,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
});

const HomePage = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerLogo}>
        <Image source={Logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.textQuestion}>O que você deseja fazer?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SigninPage')}>
          <Text style={styles.textButton}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomePage;
