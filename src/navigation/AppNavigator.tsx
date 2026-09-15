import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './BottomTabNavigator';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { AgeSelectScreen } from '../screens/onboarding/AgeSelectScreen';
import { PermissionsScreen } from '../screens/onboarding/PermissionsScreen';
import { ContactSetupScreen } from '../screens/onboarding/ContactSetupScreen';
import { PINSetupScreen } from '../screens/onboarding/PINSetupScreen';
import { useUserStore } from '../store/useUserStore';

export type RootStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingAgeSelect: undefined;
  OnboardingPermissions: undefined;
  OnboardingContactSetup: undefined;
  OnboardingPINSetup: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { hasCompletedOnboarding } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasCompletedOnboarding ? (
          // Onboarding Flow
          <>
            <Stack.Screen name="OnboardingWelcome" component={WelcomeScreen} />
            <Stack.Screen name="OnboardingAgeSelect" component={AgeSelectScreen} />
            <Stack.Screen name="OnboardingPermissions" component={PermissionsScreen} />
            <Stack.Screen name="OnboardingContactSetup" component={ContactSetupScreen} />
            <Stack.Screen name="OnboardingPINSetup" component={PINSetupScreen} />
          </>
        ) : (
          // Main App Flow
          <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
