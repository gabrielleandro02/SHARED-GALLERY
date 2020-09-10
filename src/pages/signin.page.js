import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Toast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAuth} from '../contexts/auth.context';
import {signUp} from '../services/auth.service';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Logo from '../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },

  containerInputs: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '85%',
    marginTop: 20,
    color: '#000',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    fontSize: 15,
  },
  buttonRegister: {
    marginTop: 40,
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
  termsOfUseText: {
    textAlign: 'center',
    width: 275,
    fontSize: 12,
    marginTop: 10,
  },
  errorInput: {
    color: 'red',
  },
});

const SigninPage = ({navigation}) => {
  const email = useRef(null),
    phone = useRef(null),
    password = useRef(null),
    name = useRef(null),
    [secure] = useState(true),
    {signin} = useAuth();

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(6, 'Digite pelo menos 6 caracteres'),
  });

  const handleSignup = async (values) => {
    try {
      const createdUser = await signUp(values.email, values.password);
      if (createdUser) {
        navigation.navigate('LoginPage');
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
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => handleSignup(values)}
        validationSchema={FormSchema}>
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldTouched,
          errors,
          touched,
        }) => (
          <KeyboardAwareScrollView>
            <View style={styles.containerLogo}>
              <Image source={Logo} />
            </View>
            <View style={styles.containerInputs}>
              <TextInput
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
              <Text style={styles.termsOfUseText}>
                Ao se cadastrar voce concorda com nossos termos de uso
              </Text>
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={handleSubmit}>
                <Text style={styles.textRegister}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SigninPage;
