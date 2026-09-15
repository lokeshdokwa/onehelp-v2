import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MapScreen } from '../screens/map/MapScreen';
import { CirclesScreen } from '../screens/circles/CirclesScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { useUserStore } from '../store/useUserStore';
import { defaultTheme } from '../theme/defaultTheme';
import { childTheme } from '../theme/childTheme';
import { seniorTheme } from '../theme/seniorTheme';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { ageMode } = useUserStore();
  
  let theme = defaultTheme;
  if (ageMode === 'child') theme = childTheme;
  if (ageMode === 'senior') theme = seniorTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Map') iconName = 'map';
          else if (route.name === 'Circles') iconName = 'users';
          else if (route.name === 'Profile') iconName = 'user';

          // Use Feather Icons
          return <Icon name={iconName} size={theme.tabIconSize} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.info,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceElevated,
          borderTopColor: theme.colors.border,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.caption.fontFamily,
          fontSize: theme.typography.caption.fontSize,
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'SOS' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Map' }} />
      <Tab.Screen name="Circles" component={CirclesScreen} options={{ tabBarLabel: 'Circles' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};
