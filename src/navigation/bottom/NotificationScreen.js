import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Bell, X} from 'lucide-react-native';

const filters = ['Inbox', 'Focused', 'Unread', 'Repository'];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.promptContainer}>
        <Bell color="#000" size={24} />
        <View style={styles.promptTextContainer}>
          <Text style={styles.promptTitle}>
            Never miss what’s important to you.
          </Text>
          <Text style={styles.promptDescription}>
            Configure your notification experience with push notifications,
            working hours, and swipe actions.
          </Text>
          <TouchableOpacity>
            <Text style={styles.configureText}>CONFIGURE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <X color="#000" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.emptyState}>No notifications yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 16},
  filterContainer: {flexDirection: 'row', marginBottom: 16},
  filterButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  filterText: {color: '#333', fontSize: 14, fontWeight: '500'},
  promptContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  promptTextContainer: {flex: 1, marginLeft: 10},
  promptTitle: {color: '#000', fontSize: 16, fontWeight: 'bold'},
  promptDescription: {color: '#555', fontSize: 12, marginTop: 4},
  configureText: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  emptyState: {color: '#888', textAlign: 'center', marginTop: 20},
});

export default NotificationScreen;
