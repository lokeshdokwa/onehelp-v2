import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  PoliceServiceIcon,
  AmbulanceServiceIcon,
  FireServiceIcon,
} from '../../components/ui/Icons';

interface QuickAccessWidgetProps {
  onTriggerSOS: () => void;
  onPolicePress?: () => void;
  onAmbulancePress?: () => void;
  onFirePress?: () => void;
}

export const QuickAccessWidget: React.FC<QuickAccessWidgetProps> = ({
  onTriggerSOS,
  onPolicePress,
  onAmbulancePress,
  onFirePress,
}) => {
  return (
    <View style={styles.widgetCard}>
      <Text style={styles.widgetHeader}>Quick Access</Text>

      {/* Main SOS Central Button */}
      <View style={styles.centerSection}>
        <TouchableOpacity
          style={styles.sosCircle}
          onPress={onTriggerSOS}
          activeOpacity={0.85}
        >
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* 3 Quick Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onPolicePress}
          activeOpacity={0.8}
        >
          <PoliceServiceIcon size={34} />
          <Text style={styles.actionLabel}>Police</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onAmbulancePress}
          activeOpacity={0.8}
        >
          <AmbulanceServiceIcon size={34} />
          <Text style={styles.actionLabel}>Ambulance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onFirePress}
          activeOpacity={0.8}
        >
          <FireServiceIcon size={34} />
          <Text style={styles.actionLabel}>Fire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  widgetHeader: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  centerSection: {
    alignItems: 'center',
    marginVertical: 18,
  },
  sosCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  actionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  actionLabel: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
});
