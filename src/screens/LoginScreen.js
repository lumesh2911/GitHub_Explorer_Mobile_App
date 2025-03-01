import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Logo from '../assets/logo.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign in to GitHub</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or email address"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signInButton} onPress={() => {
        navigation.navigate('Bottomnav');
      }}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot password?</Text>
      <TouchableOpacity>
        <Text style={styles.createAccount}>New to GitHub? <Text style={{ color: "#58A6FF" }}>Create an account</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('20%'),
    height: hp('10%'),
    resizeMode: 'contain',
  },
  title: {
    color: '#FFF',
    fontSize: wp('5%'),
    marginBottom: hp('3%'),
  },
  input: {
    width: wp('80%'),
    height: hp('6%'),
    backgroundColor: 'white',
    color: 'gray',
    borderRadius: 5,
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    borderWidth: 1,

  },
  signInButton: {
    width: wp('80%'),
    height: hp('6%'),
    backgroundColor: '#238636',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: hp('2%'),
  },
  signInText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#58A6FF',
    fontSize: wp('3.5%'),
    marginBottom: hp('2%'),
  },
  createAccount: {
    color: 'black',
    fontSize: wp('3.5%'),
    marginTop: hp('2%'),
  },
});

export default LoginScreen;
