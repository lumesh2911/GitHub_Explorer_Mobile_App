import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplaceScreen from './screens/SplaceScreen';
import LoginScreen from './screens/LoginScreen';
import BottomnavigationScreen from './navigation/bottom/BottomnavigationScreen';
import RepoNotFoundScreen from './screens/RepoNotFoundScreen';
import DisplayRepoDetails from './navigation/bottom/DisplayRepoDetails';
const Stack = createNativeStackNavigator();
const Appnavigator = () => {
  const [showSplashScreen, setshowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshowSplashScreen(false);
    }, 3000);
  }, []);
  return (
    <Stack.Navigator>
      {showSplashScreen ? (
        <Stack.Screen
          name="Splace"
          component={SplaceScreen}
          options={{headerShown: false}}
        />
      ) : null}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bottomnav"
        component={BottomnavigationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RepoNotFound"
        component={RepoNotFoundScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DisplayRepoDetails"
        component={DisplayRepoDetails}
        options={{
          title: ' Repo Details',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default Appnavigator;
