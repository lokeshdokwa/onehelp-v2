import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { useUserStore } from '../../store/useUserStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { defaultTheme } from '../../theme/defaultTheme';
import { HelplineDirectoryTab } from './HelplineDirectoryTab';

type Tab = 'family' | 'helplines';

export const CirclesScreen: React.FC = () => {
  const { emergencyContacts } = useUserStore();
  const [activeTab, setActiveTab] = useState<Tab>('family');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TypographyText variant="title">Safety Circle</TypographyText>
          <TypographyText variant="caption">
            Your trusted network & emergency helplines.
          </TypographyText>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'family' && styles.tabActive]}
            onPress={() => setActiveTab('family')}
          >
            <TypographyText
              variant="body"
              style={[styles.tabLabel, activeTab === 'family' && styles.tabLabelActive]}
            >
              Trusted Circle
            </TypographyText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'helplines' && styles.tabActive]}
            onPress={() => setActiveTab('helplines')}
          >
            <TypographyText
              variant="body"
              style={[styles.tabLabel, activeTab === 'helplines' && styles.tabLabelActive]}
            >
              Helplines
            </TypographyText>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'family' ? (
          <View style={styles.flex}>
            <FlatList
              data={emergencyContacts}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <Card style={styles.contactCard}>
                  <TypographyText variant="body" style={{ fontWeight: 'bold' }}>
                    {item.name}
                  </TypographyText>
                  <TypographyText variant="caption" color={defaultTheme.colors.textMuted}>
                    {item.relationship} • {item.phone}
                  </TypographyText>
                </Card>
              )}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <TypographyText variant="body" align="center" style={{ marginBottom: 16 }}>
                    You haven't added any emergency contacts yet.
                  </TypographyText>
                </View>
              }
            />

            <View style={styles.footer}>
              <Button title="Add Contact" onPress={() => {}} />
            </View>
          </View>
        ) : (
          <View style={styles.flex}>
            <HelplineDirectoryTab />
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
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: defaultTheme.colors.info,
  },
  tabLabel: {
    fontSize: 14,
    color: defaultTheme.colors.textMuted,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  contactCard: {
    marginBottom: 12,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: 16,
  },
});
