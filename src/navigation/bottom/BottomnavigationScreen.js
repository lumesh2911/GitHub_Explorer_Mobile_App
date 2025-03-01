import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Bell, Star, User} from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import CustomHeader from './CustomHeader';
import FavoriteScreen from './FavoriteScreen';
const Tab = createBottomTabNavigator();

const ICON_SIZE = wp('7%');
const ACTIVE_COLOR = '#000';
const INACTIVE_COLOR = '#646363';

const screenOptions = ({route}) => ({
  tabBarShowLabel: true,
  tabBarStyle: {
    height: hp('8.5%'),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabBarItemStyle: {
    marginTop: hp('0.6%'),
  },
  tabBarIcon: ({focused}) => {
    const color = focused ? ACTIVE_COLOR : INACTIVE_COLOR;
    const icons = {
      Home: Home,
      Notification: Bell,
      Favorite: Star,
      Profile: User,
    };
    const IconComponent = icons[route.name];
    return <IconComponent size={ICON_SIZE} color={color} />;
  },
  tabBarLabelStyle: {
    fontSize: wp('3.2%'),
    fontWeight: '500',
    color: '#000',
    marginTop: hp('0.2%'),
  },
});
const BottomNavigationScreen = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: props => <CustomHeader title="Home" {...props} />,
      }}
    />

    <Tab.Screen
      name="Favorite"
      component={FavoriteScreen}
      options={{
        header: props => <CustomHeader title="Favorite" {...props} />,
      }}
    />

    <Tab.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        header: props => <CustomHeader title="Notification" {...props} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        header: props => <CustomHeader title="Profile" {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default BottomNavigationScreen;
