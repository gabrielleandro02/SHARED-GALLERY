import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButtonStyle: {
    top: 9,
    right: 9,
    position: 'absolute',
  },
});

const ExplorerPage = ({navigation}) => {
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [dataSource, setDataSource] = useState([{id: '', src: ''}]);

  const showModalFunction = (visible, imageURL) => {
    setModalVisibleStatus(visible), setImageUri(imageURL);
  };

  useEffect(() => {
    let items = Array.apply(null, Array(120)).map((v, i) => {
      return {id: i, src: 'https://unsplash.it/400/400?image=' + (i + 1)};
    });
    setDataSource(items);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
            source={{uri: imageUri}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.closeButtonStyle}
            onPress={() => {
              showModalFunction(!modalVisibleStatus, '');
            }}>
            <Icon name="close" size={40} color={'white'} />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
              <TouchableOpacity
                key={item.id}
                style={{flex: 1}}
                onPress={() => {
                  showModalFunction(true, item.src);
                }}>
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
      </View>
    </SafeAreaView>
  );
};

export default ExplorerPage;
