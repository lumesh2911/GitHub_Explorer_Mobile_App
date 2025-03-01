import { View, Text, Image } from 'react-native';
import React from 'react';
import reporNotFound from '../assets/reponotfound.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const RepoNotFoundScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
      }}>
      <Image
        source={reporNotFound}
        style={{
          height: hp('35%'),
          width: wp('65%'),
          resizeMode: 'contain',
          marginBottom: hp('4%'),
        }}
      />
      <Text
        style={{
          color: '#2EAC53',
          fontWeight: '700',
          fontSize: hp('3%'),
          textAlign: 'center',
          marginBottom: hp('1.2%'),
          fontFamily: 'verdana',
        }}>
        Repo Not Found...!!
      </Text>
      <Text
        style={{
          color: '#666',
          fontSize: hp('1.9%'),
          textAlign: 'center',
          fontWeight: '500',
          lineHeight: hp('3%'),
          marginBottom: hp('4%'),
        }}>
        Oops! It may have been moved, deleted, made private, or the URL could be incorrect. Please check and try again.
      </Text>
    </View>
  )
}

export default RepoNotFoundScreen