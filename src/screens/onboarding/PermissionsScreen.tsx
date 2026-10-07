import React, { useState } from 'react';
import { View, StyleSheet, Platform, Linking, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useUserStore } from '../../store/useUserStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingPermissions'>;
};

export const PermissionsScreen: React.FC<Props> = ({ navigation }) => {
  const { completeOnboarding } = useUserStore();
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    setLoading(true);
    try {
      // Step 1: Location (basic first)
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      
      // Step 2: Background location (ONLY after fine location)
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
      );
      
      // Step 3: Microphone
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      
      // Step 4: SMS
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS
      );
      
      // Step 5: Contacts
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      
      // Step 6: Camera
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      
      // Step 7: Bluetooth (only request on Android 12+)
      if (typeof Platform.Version === 'number' && Platform.Version >= 31) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        );
      }
      
      setLoading(false);
      try {
        navigation.navigate('OnboardingContactSetup');
      } catch (error) {
        console.log('Navigation error after permissions:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardingContactSetup' }],
        });
      }
      
    } catch (error) {
      console.log('Permission error:', error);
      setLoading(false);
      try {
        navigation.navigate('OnboardingContactSetup');
      } catch (navError) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardingContactSetup' }],
        });
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TypographyText variant="display" style={styles.title}>
          Essential Permissions
        </TypographyText>
        <TypographyText variant="body" style={styles.subtitle}>
          OneHelp needs these to function in an emergency. We never sell or share your data.
        </TypographyText>

        <View style={styles.list}>
          <PermissionItem icon="map-pin" title="Location (Always)" desc="To track you when SOS is active." />
          <PermissionItem icon="microphone" title="Microphone" desc="To record audio evidence during SOS." />
          <PermissionItem icon="chat-text" title="SMS" desc="To send background texts when offline." />
          <PermissionItem icon="bluetooth" title="Bluetooth" desc="For offline mesh networking." />
        </View>

        <View style={styles.footer}>
          <Button 
            title="Grant Permissions" 
            onPress={requestPermissions} 
            isLoading={loading} 
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const PermissionItem = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <View style={styles.item}>
    <Icon name={icon} size={32} color="#E63946" style={styles.icon} />
    <View style={styles.itemText}>
      <TypographyText variant="title">{title}</TypographyText>
      <TypographyText variant="caption">{desc}</TypographyText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { marginBottom: 8 },
  subtitle: { marginBottom: 32, opacity: 0.8 },
  list: { gap: 24, flex: 1 },
  item: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 16 },
  itemText: { flex: 1 },
  footer: { marginTop: 'auto', paddingBottom: 24 },
  button: { width: '100%' },
});
