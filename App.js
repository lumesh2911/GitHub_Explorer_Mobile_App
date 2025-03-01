

import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Appnavigator from './src/Appnavigator';
import NetInfo from '@react-native-community/netinfo';
import UpdateImg from './src/assets/nointernent.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener(state => {
      setModalVisible(!state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer>
      <Appnavigator />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Image source={UpdateImg} style={styles.image} />
          <Text style={styles.title}>No Connection</Text>
          <Text style={styles.description}>
            No internet connection found. Check your connection or try
            again...!!
          </Text>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: wp('5%'),
  },
  image: {
    height: hp('35%'),
    width: wp('65%'),
    resizeMode: 'contain',
    marginBottom: hp('4%'),
  },
  title: {
    color: '#EE1C25',
    fontWeight: '800',
    fontSize: hp('3%'),
    textAlign: 'center',
    marginBottom: hp('1.2%'),
    fontFamily: 'verdana',
  },
  description: {
    color: '#666',
    fontSize: hp('1.9%'),
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: hp('3%'),
    marginBottom: hp('4%'),
  },
});
