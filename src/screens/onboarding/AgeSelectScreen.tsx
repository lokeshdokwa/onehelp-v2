import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { useUserStore, AgeMode } from '../../store/useUserStore';
import { defaultTheme } from '../../theme/defaultTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingAgeSelect'>;
};

export const AgeSelectScreen: React.FC<Props> = ({ navigation }) => {
  const { setAgeMode } = useUserStore();

  const handleSelect = (mode: AgeMode) => {
    setAgeMode(mode);
    navigation.navigate('OnboardingPermissions');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TypographyText variant="display" style={styles.title}>
          Who is using this phone?
        </TypographyText>
        <TypographyText variant="body" style={styles.subtitle}>
          OneHelp adapts its interface and features based on the primary user.
        </TypographyText>

        <View style={styles.cardsContainer}>
          <SelectionCard
            title="Child (Under 13)"
            description="Simplified interface, auto-SOS, restricted settings."
            iconName="baby"
            onPress={() => handleSelect('child')}
          />
          <SelectionCard
            title="Adult"
            description="Full access to all safety features and networks."
            iconName="user"
            onPress={() => handleSelect('adult')}
          />
          <SelectionCard
            title="Senior Citizen"
            description="High contrast, large text, easy-to-tap buttons."
            iconName="wheelchair"
            onPress={() => handleSelect('senior')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SelectionCard = ({ title, description, iconName, onPress }: any) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.cardIcon}>
      <Icon name={iconName} size={32} color={defaultTheme.colors.info} />
    </View>
    <View style={styles.cardText}>
      <TypographyText variant="title">{title}</TypographyText>
      <TypographyText variant="caption" style={{ opacity: 0.7, marginTop: 4 }}>
        {description}
      </TypographyText>
    </View>
    <Icon name="chevron-right" size={24} color={defaultTheme.colors.textMuted} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 48,
    opacity: 0.8,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: defaultTheme.colors.surfaceElevated,
    borderRadius: defaultTheme.radius.lg,
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: defaultTheme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
});
