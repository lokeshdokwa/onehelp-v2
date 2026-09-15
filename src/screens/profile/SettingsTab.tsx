import React from 'react';
import { View, StyleSheet, Switch, ScrollView } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { useAccessibilityStore } from '../../store/useAccessibilityStore';

export const SettingsTab: React.FC = () => {
  const { seniorModeActive, setSeniorMode, highContrast, setHighContrast } = useAccessibilityStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TypographyText variant="body" style={styles.sectionTitle}>Accessibility</TypographyText>
        
        <View style={styles.row}>
          <TypographyText variant="body">Senior Mode</TypographyText>
          <Switch value={seniorModeActive} onValueChange={setSeniorMode} />
        </View>

        <View style={styles.row}>
          <TypographyText variant="body">High Contrast</TypographyText>
          <Switch value={highContrast} onValueChange={setHighContrast} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
});
