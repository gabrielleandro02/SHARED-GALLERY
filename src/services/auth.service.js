import auth from '@react-native-firebase/auth';
import {firebaseErrorsEnum} from '../enums/firebase-errors.enum';
import {create} from 'react-test-renderer';

export const login = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return response;
  } catch ({code}) {
    if (!code) throw 'Não foi possível fazer login';
    switch (code) {
      case firebaseErrorsEnum.USER_NOT_FOUND:
        throw 'Usuário não encontrado';
      case firebaseErrorsEnum.USER_DISABLED:
        throw 'Usuário desabilitado';
      case firebaseErrorsEnum.NETWORK_REQUEST_FAILED:
        throw 'Verifique sua internet';
      case firebaseErrorsEnum.WRONG_PASSWORD:
        throw 'Senha errada';
      case firebaseErrorsEnum.MANY_REQUESTS:
        throw 'Muitas tentativas';
      default:
        throw 'Usuário inexistente';
    }
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return response;
  } catch ({code}) {
    if (!code) throw 'Não foi possível cadastrar';
    switch (code) {
      case firebaseErrorsEnum.EMAIL_ALREADY_IN_USE:
        throw 'Este email já está sendo usado';
      case firebaseErrorsEnum.ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
        throw 'Conta já existe';
      case firebaseErrorsEnum.INVALID_PHONE_NUMBER:
        throw 'Número de telefone inválido';
      case firebaseErrorsEnum.MANY_REQUESTS:
        throw 'Muitas tentativas';
      case firebaseErrorsEnum.NETWORK_REQUEST_FAILED:
        throw 'Verifique sua internet';
      default:
        throw 'Não foi possível cadastra-lo, tente novamente mais tarde';
    }
  }
};
