import auth from '@react-native-firebase/auth';
import {firebaseErrorsEnum} from '../enums/firebase-errors.enum';

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
        throw 'Usuário desabilitado';
    }
  }
};
