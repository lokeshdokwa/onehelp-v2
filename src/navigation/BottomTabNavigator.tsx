import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MapScreen } from '../screens/map/MapScreen';
import { HelplineDirectoryScreen } from '../screens/helplines/HelplineDirectoryScreen';
import { FamilyContactsScreen } from '../screens/family/FamilyContactsScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import {
  HomeIcon,
  MapIcon,
  PhoneCallIcon,
  UsersIcon,
  MoreHorizontalIcon,
} from '../components/ui/Icons';

export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Helplines: undefined;
  Family: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface BottomTabNavigatorProps {
  onTriggerSOS: () => void;
  onOpenMedicalDossier: () => void;
  onOpenOfflineMode: () => void;
  onOpenShakeSettings: () => void;
  onNotifyFamilyModal: () => void;
  onOpenToolsModal: () => void;
  onOpenSurvivalGuides?: () => void;
  onOpenAIAssistant?: () => void;
}

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  onTriggerSOS,
  onOpenMedicalDossier,
  onOpenOfflineMode,
  onOpenShakeSettings,
  onNotifyFamilyModal,
  onOpenToolsModal,
  onOpenSurvivalGuides,
  onOpenAIAssistant,
}) => {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={22} color={color} />,
        }}
      >
        {({ navigation }) => (
          <HomeScreen
            onTriggerSOS={onTriggerSOS}
            onOpenSettings={() => navigation.navigate('More')}
            onOpenFamily={() => navigation.navigate('Family')}
            onOpenMap={() => navigation.navigate('Map')}
            onOpenToolsModal={onOpenToolsModal}
            onOpenAIAssistant={onOpenAIAssistant}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Map"
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => <MapIcon size={22} color={color} />,
        }}
      >
        {({ navigation }) => (
          <MapScreen onBack={() => navigation.navigate('Home')} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Helplines"
        options={{
          tabBarLabel: 'Helplines',
          tabBarIcon: ({ color }) => <PhoneCallIcon size={22} color={color} />,
        }}
      >
        {() => (
          <HelplineDirectoryScreen />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Family"
        options={{
          tabBarLabel: 'Family',
          tabBarIcon: ({ color }) => <UsersIcon size={22} color={color} />,
        }}
      >
        {() => (
          <FamilyContactsScreen
            onNotifyFamilyModal={onNotifyFamilyModal}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="More"
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <MoreHorizontalIcon size={22} color={color} />,
        }}
      >
        {() => (
          <SettingsScreen
            onOpenMedicalDossier={onOpenMedicalDossier}
            onOpenOfflineMode={onOpenOfflineMode}
            onOpenShakeSettings={onOpenShakeSettings}
            onOpenSurvivalGuides={onOpenSurvivalGuides}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
