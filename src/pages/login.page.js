import React, {useState, useRef} from 'react';
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
import {Toast} from 'native-base';
import {useAuth} from '../contexts/auth.context';
import {login} from '../services/auth.service';
import {Formik} from 'formik';
import * as Yup from 'yup';

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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '85%',
    color: '#000',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    fontSize: 15,
  },
  buttonRegister: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#7159C1',
    width: '60%',
    borderRadius: 50,
    padding: 10,
  },
  textRegister: {
    color: '#fff',
    fontSize: 16,
  },
  errorInput: {
    color: 'red',
  },
});

const LoginPage = () => {
  const email = useRef(null),
    password = useRef(null),
    {saveAuthenticatedUser} = useAuth();

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(6, 'Digite pelo menos 6 caracteres'),
  });

  const handleSignin = async (values) => {
    try {
      const {user} = await login(values.email, values.password);
      if (user && user?.uid) {
        await saveAuthenticatedUser(user);
      }
    } catch (error) {
      Toast.show({
        text: `${error}`,
        buttonText: 'Ok',
        duration: 4000,
        type: 'danger',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}>
      <View style={styles.containerLogo}>
        <Image source={Logo} />
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => handleSignin(values)}
        validationSchema={FormSchema}>
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldTouched,
          errors,
          touched,
        }) => (
          <View style={styles.containerInputs}>
            <TextInput
              keyboardType={'email-address'}
              style={styles.input}
              placeholder="Email"
              ref={email}
              value={values.email}
              onBlur={() => setFieldTouched('email', true)}
              onChangeText={handleChange('email')}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorInput}>{errors.email}</Text>
            )}
            <TextInput
              secureTextEntry={true}
              textContentType={'password'}
              style={styles.input}
              placeholder="Senha"
              ref={password}
              value={values.password}
              onBlur={() => setFieldTouched('password', true)}
              onChangeText={handleChange('password')}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorInput}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={handleSubmit}>
              <Text style={styles.textRegister}>Entrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
