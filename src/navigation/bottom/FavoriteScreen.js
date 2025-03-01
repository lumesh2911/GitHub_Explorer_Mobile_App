import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Circle } from 'lucide-react-native';
import nofavrepo from '../../assets/nofavrepo.png';

const FavoriteScreen = () => {
  const [repos, setRepos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRepos = async () => {
    try {
      const savedRepos = await AsyncStorage.getItem('savedRepos');
      if (savedRepos) {
        setRepos(JSON.parse(savedRepos));
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRepos();
    setRefreshing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {repos.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          data={repos}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>
                {item.name}
              </Text>

              <Text style={{ marginTop: 5, color: '#333' }}>
                {item.description || 'No description available'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp('1%'),
                }}>
                <View />
                {item.language === 'HTML' ? (
                  <Circle size={wp('5%')} color="red" fill="red" />
                ) : item.language === 'JavaScript' ? (
                  <Circle size={wp('5%')} color="#FFD700" fill="#FFD700" />
                ) : item.language === 'CSS' ? (
                  <Circle size={wp('5%')} color="#4493F8" fill="#4493F8" />
                ) : item.language === 'SCSS' ? (
                  <Circle size={wp('5%')} color="black" fill="black" />
                ) : (
                  <Circle size={wp('5%')} color="gray" fill="gray" />
                )}

                <Text
                  style={{
                    fontSize: wp('4%'),
                    marginLeft: wp('1%'),
                    fontWeight: '600',
                    color: '#333',
                  }}>
                  {item.language || 'Unknown'}
                </Text>
              </View>
            </TouchableOpacity>
          )}

        />
      ) : (
        <Image
          source={nofavrepo}
          style={{
            height: hp('35%'),
            width: wp('65%'),
            resizeMode: 'contain',
            marginBottom: hp('4%'),
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('1.5%'),
    paddingTop: hp('1%'),
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginBottom: hp('1%'),
    width: wp('95%'),
    alignSelf: 'center',

  },
});

export default FavoriteScreen;
