import React, {useState} from 'react';
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
    marginTop: 20,
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

const SigninPage = () => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [phone, setPhone] = useState(''),
    [secure] = useState(true),
    {signin} = useAuth();

  const handleSignin = () => {
    console.log({email, password, phone});
    // signin();
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
          secureTextEntry={secure}
          textContentType={'password'}
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={(value) => setPassword(value)}
        />
        <TextInput
          textContentType={'telephoneNumber'}
          style={styles.input}
          placeholder="Telefone"
          autoCorrect={false}
          onChangeText={(value) => setPhone(value)}
        />
        <TouchableOpacity style={styles.buttonRegister} onPress={handleSignin}>
          <Text style={styles.textRegister}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SigninPage;
