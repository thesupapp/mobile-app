import React, { useCallback, useEffect, useState } from 'react';
import { LogBox, StatusBar, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/screens/home/index';
import ConvoScreen from './src/components/screens/convo/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from 'react-native-ui-lib';

LogBox.ignoreAllLogs();

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  const Tab = createNativeStackNavigator();
  const AppStack = createNativeStackNavigator();

  function AppStackScreen() {
    return (
          <AppStack.Navigator initalRouteName="Inbox" screenOptions={{ headerShown: true }}>
            <AppStack.Screen name="Inbox" component={HomeScreen} />
            <AppStack.Screen 
              name="Convo" 
              component={ConvoScreen}
              options={() => ({
                tabBarStyle: {
                  display: "none",
                },
                tabBarButton: () => null,
              })}
           />
          </AppStack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.blue40,
          tabBarInactiveTintColor: Colors.grey40,
        })}>
        <Tab.Screen name="Home" component={AppStackScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}