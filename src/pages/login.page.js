import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useAuth} from '../contexts/auth.context';
import auth from '@react-native-firebase/auth';

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
  containerInputs: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '85%',
    marginBottom: 20,
    color: '#000',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 14,
    fontSize: 16,
  },
  buttonRegister: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#7159C1',
    width: '60%',
    borderRadius: 50,
    padding: 10,
  },
  textRegister: {
    color: '#fff',
    fontSize: 16,
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [secure, setSecure] = useState(true),
    {signin} = useAuth();

  const handleSignin = async () => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
      signin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={150}>
      <View style={styles.containerLogo}>
        <Image source={Logo} />
      </View>
      <View style={styles.containerInputs}>
        <TextInput
          textContentType={'emailAddress'}
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <TextInput
          secureTextEntry={true}
          textContentType={'password'}
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.buttonRegister} onPress={handleSignin}>
          <Text style={styles.textRegister}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
