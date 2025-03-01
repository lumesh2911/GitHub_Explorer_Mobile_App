import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sun, Moon, EllipsisVertical } from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomHeader = ({ title }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity >
        <EllipsisVertical size={wp('7%')} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('8%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
};

export default CustomHeader;
