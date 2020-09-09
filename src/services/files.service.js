import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';

export const upload = async (imageData, authenticatedUser) => {
  try {
    const res = await storage()
      .ref(`images/${imageData.userUid}/${imageData.fileName}`)
      .putFile(imageData.uri)
      .on('state_changed', (value) => {
        console.log('stado', value);
      });
    console.log('ACERTO', res);
  } catch (error) {
    console.log('ERRRO', error);
  }
};
