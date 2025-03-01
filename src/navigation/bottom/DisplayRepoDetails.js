import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Star,
  GitFork,
  Bell,
  CircleAlert,
  Circle,
  Hourglass,
  Telescope,
  Scale,
} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RepoDetails = ({ route }) => {
  const { repo } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const savedRepos = await AsyncStorage.getItem('savedRepos');
      const reposArray = savedRepos ? JSON.parse(savedRepos) : [];
      const alreadySaved = reposArray.some(item => item.id === repo.id);
      setIsFavorite(alreadySaved);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const saveRepoAndNavigate = async () => {
    try {
      const savedRepos = await AsyncStorage.getItem('savedRepos');
      let reposArray = savedRepos ? JSON.parse(savedRepos) : [];

      if (!isFavorite) {
        reposArray.push(repo);
        await AsyncStorage.setItem('savedRepos', JSON.stringify(reposArray));
        setIsFavorite(true);
        Alert.alert('Success', 'This repository has been added to your Favorites!');
      } else {
        const updatedRepos = reposArray.filter(item => item.id !== repo.id);
        await AsyncStorage.setItem('savedRepos', JSON.stringify(updatedRepos));
        setIsFavorite(false);
        Alert.alert('Removed', 'This repository has been removed from your Favorites!');
      }
    } catch (error) {
      console.error('Error saving repo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: repo.owner?.avatar_url,
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{repo.owner?.login || 'No Name'}</Text>
      </View>

      <Text style={styles.title}>{repo.name || 'No Name'}</Text>
      <Text style={styles.description}>
        {repo.description || 'No Description'}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          {repo.language === 'HTML' ? (
            <Circle size={wp('5%')} color="red" fill="red" />
          ) : repo.language === 'JavaScript' ? (
            <Circle size={wp('5%')} color="#FFD700" fill="#FFD700" />
          ) : repo.language === 'CSS' ? (
            <Circle size={wp('5%')} color="#4493F8" fill="#4493F8" />
          ) : repo.language === 'SCSS' ? (
            <Circle size={wp('5%')} color="black" fill="black" />
          ) : (
            <Circle size={wp('5%')} color="gray" fill="gray" />
          )}
          <Text style={styles.statText}> {repo.language || 'No Lang'}</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={wp('5%')} color="#FFD700" />
          <Text style={styles.statText}>
            {repo.stargazers_count || 0} Stars
          </Text>
        </View>
        <View style={styles.statItem}>
          <GitFork size={wp('5%')} color="#32CD32" />
          <Text style={styles.statText}>{repo.forks_count || 0} Forks</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={saveRepoAndNavigate}>
          <Star size={wp('5%')} color={isFavorite ? '#FFD700' : 'black'} />
          <Text style={[styles.buttonText, { color: isFavorite ? '#FFD700' : 'black' }]}>
            {isFavorite ? 'Fav' : 'Star'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <GitFork size={wp('6%')} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Bell size={wp('6%')} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: wp('93%'),
          alignSelf: 'center',
          borderBottomColor: '#A6A6A6',
          borderBottomWidth: 1,
          marginVertical: hp('2%'),
        }}
      />
      <View style={styles.licenseContainer}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: wp('2%') }}>
          <Telescope size={wp('6%')} color="black" />
          <Text style={styles.licenseTextBold}>Created</Text>
        </View>
        <Text style={styles.licenseText}>
          {repo.created_at ? moment(repo.created_at).format('LL') : 'N/A'}
        </Text>
      </View>
      <View style={styles.licenseContainer}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: wp('2%') }}>
          <Hourglass size={wp('6%')} color="black" />
          <Text style={styles.licenseTextBold}>Updated</Text>
        </View>
        <Text style={styles.licenseText}>
          {repo.updated_at ? moment(repo.updated_at).fromNow() : 'N/A'}
        </Text>
      </View>

      {repo.license && (
        <View style={styles.licenseContainer}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: wp('2%') }}>
            <Scale size={wp('6%')} color="black" />
            <Text style={styles.licenseTextBold}>License</Text>
          </View>
          <Text style={styles.licenseText}>{repo.license.name || 'N/A'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('10%'),
    marginRight: wp('2%'),
    borderWidth: 1,
    borderColor: '#BFBFBF',
  },
  username: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('1%'),
  },
  description: {
    fontSize: wp('4%'),
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp('1%'),
    marginVertical: hp('1%'),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('1.2%'),
  },
  statText: {
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('3%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('2%'),
    gap: wp('2%'),
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    color: 'black',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  iconButton: {
    padding: wp(3),
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: 'gray',
  },
  datesContainer: {
    marginVertical: hp('1%'),
  },
  dateText: {
    fontSize: wp('4%'),
    color: '#555',
  },
  licenseContainer: {
    marginVertical: hp('1%'),
    backgroundColor: '#F3F3F3',
    borderRadius: wp('2%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('3%'),
  },
  licenseTextBold: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: 'black',
  },
  licenseText: {
    fontSize: wp('3.7%'),
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default RepoDetails;
