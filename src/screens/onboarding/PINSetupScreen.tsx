import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useUserStore } from '../../store/useUserStore';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { MMKV } from 'react-native-mmkv';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingPINSetup'>;
};

export const PINSetupScreen: React.FC<Props> = ({ navigation }) => {
  const { setPrimaryPinStatus, setDuressPinStatus, completeOnboarding } = useUserStore();
  const [pin, setPin] = useState('');
  const [duressPin, setDuressPin] = useState('');

  const handleFinishSetup = async () => {
    try {
      // Save PIN safely
      if (pin.length < 4) {
        Alert.alert('Error', 'PIN must be at least 4 digits');
        return;
      }

      // Save to keychain with error handling
      try {
        await Keychain.setGenericPassword('primary_pin', pin, {
          service: 'onehelp_primary_pin',
        });
      } catch (keychainError) {
        // If keychain fails, save to MMKV as fallback
        console.log('Keychain failed, using MMKV fallback:', keychainError);
        const storage = new MMKV();
        storage.set('primary_pin', pin);
      }

      // Save duress PIN if entered
      if (duressPin && duressPin.length >= 4) {
        try {
          await Keychain.setGenericPassword('duress_pin', duressPin, {
            service: 'onehelp_duress_pin',
          });
        } catch (e) {
          const storage = new MMKV();
          storage.set('duress_pin', duressPin);
        }
      }

      // Mark onboarding as complete in MMKV manually just in case
      try {
        const storage = new MMKV();
        storage.set('hasCompletedOnboarding', true);
      } catch (e) {
        console.log('MMKV error:', e);
      }

      // Update user store
      try {
        completeOnboarding();
        setPrimaryPinStatus(true);
        if (duressPin.length >= 4) setDuressPinStatus(true);
      } catch (e) {
        console.log('Store error:', e);
      }

      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });

    } catch (error) {
      console.log('PIN setup error:', error);
      // Even if everything fails, still navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TypographyText variant="title" style={styles.title}>Secure Your App</TypographyText>
        
        <View style={styles.section}>
          <TypographyText variant="body">Primary PIN</TypographyText>
          <TypographyText variant="caption">To cancel an active SOS.</TypographyText>
          <TextInput 
            style={styles.input} 
            secureTextEntry 
            keyboardType="number-pad" 
            maxLength={6} 
            value={pin} 
            onChangeText={setPin} 
            placeholder="Enter 4-6 digit PIN" 
          />
        </View>

        <View style={styles.section}>
          <TypographyText variant="body">Duress PIN (Optional)</TypographyText>
          <TypographyText variant="caption">Appears to cancel SOS, but silently dispatches police.</TypographyText>
          <TextInput 
            style={styles.input} 
            secureTextEntry 
            keyboardType="number-pad" 
            maxLength={6} 
            value={duressPin} 
            onChangeText={setDuressPin} 
            placeholder="Enter 4-6 digit Duress PIN" 
          />
        </View>

        <View style={styles.footer}>
          <Button title="Finish Setup" onPress={handleFinishSetup} disabled={pin.length < 4} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { marginBottom: 32 },
  section: { marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 16, borderRadius: 8, marginTop: 12, fontSize: 18, letterSpacing: 8, textAlign: 'center' },
  footer: { marginTop: 'auto' }
});
