import React, { useState } from 'react';
import { View, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { useUserStore } from '../../store/useUserStore';
import { Card } from '../../components/ui/Card';
import { defaultTheme } from '../../theme/defaultTheme';
import { MedicalDossierForm } from './MedicalDossierForm';
import { SurvivalGuidesTab } from './SurvivalGuidesTab';

type ProfileTab = 'settings' | 'medical' | 'guides';

const SectionHeader = ({ title }: { title: string }) => (
  <TypographyText variant="body" style={styles.sectionTitle}>{title}</TypographyText>
);

const SettingRow = ({
  label,
  desc,
  value,
  onToggle,
}: {
  label: string;
  desc: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <Card style={styles.settingCard}>
    <View style={styles.settingRow}>
      <View style={styles.settingText}>
        <TypographyText variant="body">{label}</TypographyText>
        <TypographyText variant="caption" color={defaultTheme.colors.textMuted}>
          {desc}
        </TypographyText>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ true: defaultTheme.colors.info, false: defaultTheme.colors.border }}
      />
    </View>
  </Card>
);

export const ProfileScreen: React.FC = () => {
  const {
    userName,
    ageMode,
    setAgeMode,
    shakeDetectionEnabled,
    toggleShakeDetection,
    dangerZoneAlertsEnabled,
    toggleDangerZoneAlerts,
    seniorModeEnabled,
    toggleSeniorMode,
    language,
    setLanguage,
  } = useUserStore();

  const [activeTab, setActiveTab] = useState<ProfileTab>('settings');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TypographyText variant="title">Settings & Profile</TypographyText>
          <TypographyText variant="caption">
            {userName || 'User'} • Mode: {ageMode.toUpperCase()}
          </TypographyText>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabRow}>
          {(['settings', 'medical', 'guides'] as ProfileTab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <TypographyText
                variant="caption"
                style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}
              >
                {tab === 'settings' ? 'Settings' : tab === 'medical' ? 'Medical' : 'Guides'}
              </TypographyText>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'settings' && (
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {/* Safety Features */}
            <View style={styles.section}>
              <SectionHeader title="Safety Features" />
              <SettingRow
                label="Shake to SOS"
                desc="Trigger SOS by violently shaking the phone."
                value={shakeDetectionEnabled}
                onToggle={toggleShakeDetection}
              />
              <SettingRow
                label="Danger Zone Alerts"
                desc="Warn me when entering high-crime areas."
                value={dangerZoneAlertsEnabled}
                onToggle={toggleDangerZoneAlerts}
              />
              <SettingRow
                label="Senior Mode"
                desc="Larger text, simplified UI, easy-tap buttons."
                value={seniorModeEnabled}
                onToggle={toggleSeniorMode}
              />
            </View>

            {/* Age Mode Selector */}
            <View style={styles.section}>
              <SectionHeader title="User Mode" />
              <Card style={styles.settingCard}>
                <View style={styles.ageModeRow}>
                  {(['child', 'adult', 'senior'] as const).map((mode) => (
                    <TouchableOpacity
                      key={mode}
                      style={[
                        styles.ageModeBtn,
                        ageMode === mode && styles.ageModeBtnActive,
                      ]}
                      onPress={() => setAgeMode(mode)}
                    >
                      <TypographyText
                        variant="caption"
                        style={[
                          styles.ageModeText,
                          ageMode === mode && styles.ageModeTextActive,
                        ]}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </TypographyText>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>
            </View>

            {/* Language Selector */}
            <View style={styles.section}>
              <SectionHeader title="Language" />
              <Card style={styles.settingCard}>
                <View style={styles.ageModeRow}>
                  {(['en', 'hi', 'ta', 'te', 'bn', 'mr'] as const).map((lang) => (
                    <TouchableOpacity
                      key={lang}
                      style={[
                        styles.ageModeBtn,
                        language === lang && styles.ageModeBtnActive,
                      ]}
                      onPress={() => setLanguage(lang)}
                    >
                      <TypographyText
                        variant="caption"
                        style={[
                          styles.ageModeText,
                          language === lang && styles.ageModeTextActive,
                        ]}
                      >
                        {lang.toUpperCase()}
                      </TypographyText>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>
            </View>

            {/* Duress PIN */}
            <View style={styles.section}>
              <SectionHeader title="Security" />
              <Card style={styles.settingCard}>
                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => Alert.alert('Duress PIN', 'PIN setup coming soon.')}
                >
                  <View style={styles.settingText}>
                    <TypographyText variant="body">Set Duress PIN</TypographyText>
                    <TypographyText variant="caption" color={defaultTheme.colors.textMuted}>
                      A fake PIN that sends a silent SOS when entered.
                    </TypographyText>
                  </View>
                  <TypographyText variant="caption" color={defaultTheme.colors.info}>
                    Setup →
                  </TypographyText>
                </TouchableOpacity>
              </Card>
              <Card style={styles.settingCard}>
                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => Alert.alert('Primary PIN', 'PIN setup coming soon.')}
                >
                  <View style={styles.settingText}>
                    <TypographyText variant="body">Set Primary PIN</TypographyText>
                    <TypographyText variant="caption" color={defaultTheme.colors.textMuted}>
                      Lock the app with a 6-digit PIN.
                    </TypographyText>
                  </View>
                  <TypographyText variant="caption" color={defaultTheme.colors.info}>
                    Setup →
                  </TypographyText>
                </TouchableOpacity>
              </Card>
            </View>

            <View style={{ height: 32 }} />
          </ScrollView>
        )}

        {activeTab === 'medical' && (
          <View style={styles.flex}>
            <MedicalDossierForm />
          </View>
        )}

        {activeTab === 'guides' && (
          <View style={styles.flex}>
            <SurvivalGuidesTab />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 12,
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: defaultTheme.colors.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: defaultTheme.colors.info,
  },
  tabLabel: {
    color: defaultTheme.colors.textMuted,
    fontWeight: '600',
    fontSize: 12,
  },
  tabLabelActive: {
    color: '#FFF',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  settingCard: {
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    paddingRight: 16,
  },
  ageModeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  ageModeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  ageModeBtnActive: {
    backgroundColor: defaultTheme.colors.info,
    borderColor: defaultTheme.colors.info,
  },
  ageModeText: {
    color: defaultTheme.colors.textMuted,
    fontWeight: '600',
    fontSize: 12,
  },
  ageModeTextActive: {
    color: '#FFF',
  },
});
