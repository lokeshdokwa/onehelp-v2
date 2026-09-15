import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingWelcome'>;
};

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* Logo Placeholder */}
          <View style={styles.logoPlaceholder}>
            <TypographyText variant="display" color="#FFF">OH</TypographyText>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <TypographyText variant="display" align="center" style={styles.title}>
            Welcome to OneHelp
          </TypographyText>
          <TypographyText variant="body" align="center" style={styles.subtitle}>
            Your offline-first, ultra-resilient personal safety system.
          </TypographyText>

          <Button
            title="Get Started"
            onPress={() => navigation.navigate('OnboardingAgeSelect')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#E63946', // Emergency Red
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 48,
    opacity: 0.8,
  },
  button: {
    width: '100%',
  },
});
