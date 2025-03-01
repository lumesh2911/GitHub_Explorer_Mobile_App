import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Circle, Search } from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import noRepo from '../../assets/nofavrepo.png'; // Import your no data image

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      fetchRepositories();
    } else {
      setRepositories([]);
    }
  }, [debouncedQuery]);

  const fetchRepositories = async () => {
    setRefreshing(true);
    const apiUrl = `https://api.github.com/search/repositories?q=${debouncedQuery}`;

    try {
      const response = await axios.get(apiUrl);
      setRepositories(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    if (debouncedQuery.length >= 3) {
      fetchRepositories();
    }
  };

  const RepoCard = ({ repo }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('DisplayRepoDetails', { repo })}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>
          {repo.name}
        </Text>
        {repo.fork && (
          <Text style={{ color: '#555', fontSize: 12 }}>
            Forked from {repo.full_name}
          </Text>
        )}
        <Text style={{ marginTop: 5, color: '#333' }}>
          {repo.description || 'No description available'}
        </Text>

        <View style={styles.languageContainer}>
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
          <Text style={styles.languageText}>{repo.language || 'Unknown'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={wp('5%')} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Repo..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={text => setQuery(text)}
        />
      </View>

      <View style={styles.containerTwo}>
        {repositories.length > 0 ? (
          <FlatList
            data={repositories}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <RepoCard repo={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Image source={noRepo} style={styles.noDataImage} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('1.5%'),
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    borderWidth: 1,
    marginVertical: hp('1.5%'),
    marginHorizontal: wp('2%'),
    borderColor: 'gray',
    minWidth: wp('1%'),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: wp('4%'),
    color: '#000',
  },
  containerTwo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginHorizontal: wp('2%'),
    marginBottom: hp('1%'),
    width: wp('95%'),
    alignSelf: 'center',

  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  languageText: {
    fontSize: wp('4%'),
    marginLeft: wp('1%'),
    fontWeight: '600',
    color: '#333',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataImage: {
    height: hp('35%'),
    width: wp('65%'),
    resizeMode: 'contain',
    marginBottom: hp('4%'),
  },
  noDataText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#888',
  },
});

export default HomeScreen;
