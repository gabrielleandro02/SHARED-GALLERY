import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
import {imagePickerOptions, getFileLocalPath} from '../utils/upload-image.util';
import ImagePicker from 'react-native-image-picker';
import {useAuth} from '../contexts/auth.context';
import storage from '@react-native-firebase/storage';
import {Toast} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: '100%',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '97%',
    resizeMode: 'contain',
  },
  gridImage: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButtonStyle: {
    top: 10,
    right: 2,
    position: 'absolute',
  },
  modalInsertImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  loadingActivity: {
    marginVertical: 20,
  },
  modalSendingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSendingBackground: {
    backgroundColor: 'white',
    padding: 25,
    width: '85%',
  },
  modalSendingText: {
    marginBottom: 30,
    fontSize: 18,
  },
});

export default function MyPhotosPage() {
  const [imageuri, setImageuri] = useState('');
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [dataSource, setDataSource] = useState([{id: null, uid: ''}]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0.1);
  const {authenticatedUser} = useAuth();

  const actions = [
    {
      text: 'Adicionar foto',
      icon: <Icon name="image" size={20} color={'white'} />,
      name: 'add_photo',
      position: 1,
    },
  ];

  const showModalFunction = (visible, imageURL) => {
    setImageuri(imageURL);
    setModalVisibleStatus(visible);
  };

  const downloadMyPhotos = async () => {
    try {
      const addImageToArray = async (imageRef) => {
        const imageUrl = await imageRef.getDownloadURL();
        setDataSource([...dataSource, {id: imageRef.name, uid: imageUrl}]);
      };

      const images = await storage()
        .ref(`images/${authenticatedUser.uid}`)
        .listAll();
      images.items.forEach((imageRef) => addImageToArray(imageRef));
    } catch {
      text: 'Não foi possível baixar algumas imagens';
      Toast.show({
        text: 'Não foi possível baixar algumas imagens',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    downloadMyPhotos();
    setLoading(false);
  }, []);

  const uploadData = async (sourceImage) => {
    try {
      await storage()
        .ref(`images/${sourceImage.userUid}/${sourceImage.fileName}`)
        .putFile(sourceImage.uri)
        .on('state_changed', (stateUpload) => {
          setSending(true);
          switch (stateUpload.state) {
            case 'running':
              setSendingProgress(
                stateUpload.bytesTransferred / stateUpload.totalBytes,
              );
              break;
            case 'success':
              setSendingProgress(1);
              setSending(false);
              break;
            case 'error':
              stateUpload.task.cancel();
              setSending(false);
              Toast.show({
                text: 'Não foi possível enviar sua imagem',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger',
              });
              break;
            default:
              Toast.show({
                text: 'Não foi possível enviar sua imagem',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger',
              });
              stateUpload.task.cancel();
          }
        });
      await downloadMyPhotos();
      setLoading(false);
    } catch (error) {
      Toast.show({
        text: 'Não foi possível enviar sua imagem',
        buttonText: 'Ok',
        duration: 4000,
        type: 'danger',
      });
    }
  };

  return modalVisibleStatus ? (
    <Modal
      transparent={false}
      animationType={'fade'}
      visible={modalVisibleStatus}
      onRequestClose={() => {
        showModalFunction(!modalVisibleStatus, '');
      }}>
      <View style={styles.modelStyle}>
        <FastImage
          style={styles.fullImageStyle}
          source={{uri: imageuri}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Icon
          style={styles.closeButtonStyle}
          onPress={() => {
            showModalFunction(!modalVisibleStatus, '');
          }}
          name="close"
          size={40}
          color={'white'}
        />
      </View>
    </Modal>
  ) : (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loadingActivity}
          size="large"
          color="#573ea8"
        />
      ) : null}

      <Modal onDismiss={() => setSending(false)} transparent visible={sending}>
        <View style={styles.modalSendingContainer}>
          <View style={styles.modalSendingBackground}>
            <Text style={styles.modalSendingText}>Enviando...</Text>
            <ProgressBar progress={sendingProgress} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={dataSource}
        renderItem={({item, index}) => (
          <View style={styles.gridImage}>
            <TouchableOpacity
              key={index}
              style={{flex: 1}}
              onPress={() => showModalFunction(true, item.uid)}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.uid,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
      <FloatingAction
        showBackground
        actions={actions}
        overlayColor="rgba(68, 68, 68, 0.8)"
        animated
        dismissKeyboardOnPress
        onPressItem={() => {
          ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if (response.error) {
              Toast.show({
                text: 'Não foi possível buscar sua imagem',
                buttonText: 'Ok',
                duration: 4000,
                type: 'danger',
              });
            } else if (response.didCancel) {
              return;
            }
            const sourceImage = {
              src: response.uri,
              uri: response.uri,
              userUid: authenticatedUser.uid,
              path: getFileLocalPath(response),
              fileName: response.fileName,
            };
            uploadData(sourceImage);
          });
        }}
      />
    </View>
  );
}
