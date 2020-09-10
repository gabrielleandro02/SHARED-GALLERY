import {Platform} from 'react-native';

export const getFileLocalPath = (response) => {
  const {path, uri} = response;
  return Platform.OS === 'android' ? path : uri;
};

export const imagePickerOptions = {
  title: 'Selecione uma imagem',
  cancelButtonTitle: 'Cancelar',
  takePhotoButtonTitle: 'Abrir Câmera',
  mediaType: 'photo',
  storageOptions: {
    waitUntilSaved: true,
    skipBackup: true,
  },
};
