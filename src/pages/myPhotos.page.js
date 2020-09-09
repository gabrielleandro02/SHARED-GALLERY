import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
import {upload} from '../services/files.service';
import {imagePickerOptions, getFileLocalPath} from '../utils/upload-image.util';
import ImagePicker from 'react-native-image-picker';
import {useAuth} from '../contexts/auth.context';

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
});

export default function MyPhotosPage() {
  const [imageuri, setImageuri] = useState('');
  const [image, setImage] = useState({
    fileName: '',
    type: '',
    uri: '',
  });
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setModalVisibleStatus(visible);
    setImageuri(imageURL);
  };

  const uploadData = async () => {
    try {
      await upload(image, authenticatedUser);
    } catch (error) {
      console.log('erro dentro');
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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

      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
            <TouchableOpacity
              key={item.id}
              style={{flex: 1}}
              onPress={() => showModalFunction(true, item.src)}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.src,
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
          setLoading(true);
          ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.didCancel) {
              setLoading(false);
              return;
            }
            const sourceImage = {
              src: response.uri,
              uri: response.uri,
              userUid: authenticatedUser.uid,
              path: getFileLocalPath(response),
              fileName: response.fileName,
            };

            dataSource.unshift(sourceImage);
            setImage(sourceImage);
            uploadData(sourceImage);
            setLoading(false);
          });
        }}
      />
    </View>
  );
}
