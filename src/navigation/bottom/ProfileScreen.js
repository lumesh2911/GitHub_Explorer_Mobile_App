import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  User,
  Link,
  Linkedin,
  Github,
  Globe,
  X,
  Building2,
  MapPin,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomHeader from './CustomHeader';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileIcon}>
          <User size={wp('10%')} color="#555" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>Lumesh Kumar Sahu</Text>
          <Text style={styles.username}>lumesh2911 · he/him</Text>
        </View>
      </View>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>🎯 Focusing</Text>
      </View>

      {/* Bio */}
      <Text style={styles.bio}>
        I'm a Full-Stack Developer with over two years of experience in building
        user-friendly and visually appealing web and mobile applications.
      </Text>

      {/* Work Info */}
      <View style={styles.workContainer}>
        <View style={styles.workRow}>
          <Building2 size={wp('5%')} color="#555" />
          <Text style={styles.workTitle}>
            Polybond Insulation Pvt. Ltd. Bhilai
          </Text>
        </View>
        <View style={styles.workRow}>
          <MapPin size={wp('5%')} color="#555" />
          <Text style={styles.workLocation}>Bhilai</Text>
        </View>
      </View>

      {/* Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity style={styles.linkItem}>
          <Globe size={wp('5%')} color="#555" />
          <Text style={styles.linkText}>https://lumesh.vercel.app/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem}>
          <Linkedin size={wp('5%')} color="#555" />
          <Text style={styles.linkText}>in/lumesh2911</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem}>
          <Link size={wp('5%')} color="#555" />
          <Text style={styles.linkText}>https://linktr.ee/lumesh2911</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem}>
          <Github size={wp('5%')} color="#555" />
          <Text style={styles.linkText}>https://github.com/lumesh2911</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem}>
          <X size={wp('5%')} color="#555" />
          <Text style={styles.linkText}>@lumesh2911</Text>
        </TouchableOpacity>
      </View>

      {/* Followers */}
      <Text style={styles.followers}>3 followers • 1 following</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('5%'),
  },
  profileIcon: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7.5%'),
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginLeft: wp('4%'),
  },
  name: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#222',
  },
  username: {
    fontSize: wp('4%'),
    color: '#555',
  },
  statusContainer: {
    backgroundColor: '#E0E0E0',
    padding: hp('2%'),
    borderRadius: wp('3%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
  },
  statusText: {
    color: '#222',
    fontSize: wp('4%'),
  },
  bio: {
    color: '#333',
    fontSize: wp('4%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
    lineHeight: hp('2.7%'),
  },
  workContainer: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  workRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  workTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#222',
    marginLeft: wp('2%'),
  },
  workLocation: {
    fontSize: wp('4%'),
    color: '#555',
    marginLeft: wp('2%'),
  },
  linksContainer: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.5%'),
  },
  linkText: {
    fontSize: wp('4%'),
    color: '#1E90FF',
    marginLeft: wp('2%'),
  },
  followers: {
    fontSize: wp('4%'),
    color: '#555',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
});

export default ProfileScreen;
