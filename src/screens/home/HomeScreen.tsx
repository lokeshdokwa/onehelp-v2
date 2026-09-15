import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { useSOSStore } from '../../store/useSOSStore';
import { SOSService } from '../../services/SOSService';
import { defaultTheme } from '../../theme/defaultTheme';
import { useUserStore } from '../../store/useUserStore';
import { useLocationStore } from '../../store/useLocationStore';
import { QuickToolsRow } from './QuickToolsRow';
import { PanicButton } from '../../components/sos/PanicButton';

const StatusBar: React.FC = () => {
  const { gpsStatus } = useLocationStore();
  return (
    <View style={styles.statusBar}>
      <StatusPill label="GPS" value={gpsStatus.toUpperCase()} active={gpsStatus === 'active'} />
      <StatusPill label="MESH" value="OFF" active={false} />
      <StatusPill label="NET" value="ONLINE" active={true} />
    </View>
  );
};

const StatusPill = ({ label, value, active }: { label: string; value: string; active: boolean }) => (
  <View style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}>
    <TypographyText variant="caption" style={styles.pillText}>
      {label}: {value}
    </TypographyText>
  </View>
);

export const HomeScreen: React.FC = () => {
  const { status, cancelSOS } = useSOSStore();
  const { ageMode } = useUserStore();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Top Status Bar */}
        <StatusBar />

        {/* Header */}
        <View style={styles.header}>
          <TypographyText variant="display">OneHelp</TypographyText>
          <TypographyText variant="body" color={defaultTheme.colors.textMuted}>
            {status === 'idle' ? 'You are safe.' : 'EMERGENCY ACTIVE'}
          </TypographyText>
        </View>

        {/* SOS Button */}
        <View style={styles.centerContainer}>
          <PanicButton />

          {status !== 'idle' && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => cancelSOS()}>
              <TypographyText variant="title" color={defaultTheme.colors.textInverse}>
                CANCEL
              </TypographyText>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Tools Row */}
        <QuickToolsRow />

        <View style={{ height: 16 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: 'rgba(0,200,100,0.2)',
    borderWidth: 1,
    borderColor: '#00C864',
  },
  pillInactive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  header: {
    alignItems: 'center',
    marginTop: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 48,
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: defaultTheme.colors.textPrimary,
    borderRadius: 30,
  },
});
