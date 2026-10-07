import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  Platform,
} from 'react-native';
import { ArrowLeftIcon, VibratePhoneIcon } from '../../components/ui/Icons';
import { ShakeService, ShakeSensitivity } from '../../services/ShakeService';
import { useUserStore } from '../../store/useUserStore';

interface ShakeTriggerSettingsScreenProps {
  onBack?: () => void;
  onTestTrigger: () => void;
}

export const ShakeTriggerSettingsScreen: React.FC<ShakeTriggerSettingsScreenProps> = ({
  onBack,
  onTestTrigger,
}) => {
  const [sensitivity, setSensitivity] = useState<ShakeSensitivity>('normal');
  const shakeDetectionEnabled = useUserStore((s) => s.shakeDetectionEnabled);
  const toggleShakeDetection = useUserStore((s) => s.toggleShakeDetection);

  useEffect(() => {
    setSensitivity(ShakeService.getSensitivity());
  }, []);

  const handleSelectSensitivity = (level: ShakeSensitivity) => {
    setSensitivity(level);
    ShakeService.startListening(level);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Shake Sensitivity set to ${level.toUpperCase()}`, ToastAndroid.SHORT);
    }
  };

  const handleTest = async () => {
    await ShakeService.simulateShake();
    onTestTrigger();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeftIcon size={22} color="#0F172A" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}
        <Text style={styles.headerTitle}>Shake & Power Trigger</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* Graphic */}
        <View style={styles.graphicCircle}>
          <VibratePhoneIcon size={56} color="#DC2626" />
        </View>

        {/* Status Pill */}
        <View style={styles.statusPill}>
          <View style={[styles.statusDot, { backgroundColor: shakeDetectionEnabled ? '#16A34A' : '#94A3B8' }]} />
          <Text style={styles.statusText}>
            {shakeDetectionEnabled ? 'Hardware Accelerometer & Power Listener ACTIVE' : 'Sensor Disabled'}
          </Text>
        </View>

        {/* Headline */}
        <Text style={styles.title}>
          Vigorously shake phone{'\n'}or press power button 3 times{'\n'}to trigger Emergency SOS.
        </Text>

        {/* Sensitivity Options */}
        <View style={styles.sensitivitySection}>
          <Text style={styles.sensitivityHeader}>ACCELEROMETER SENSITIVITY</Text>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => handleSelectSensitivity('high')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, sensitivity === 'high' && styles.radioActive]}>
              {sensitivity === 'high' && <View style={styles.radioInner} />}
            </View>
            <View>
              <Text style={styles.radioLabel}>High (13.5 m/s²)</Text>
              <Text style={styles.radioSub}>Triggers on lighter shakes • Best for quick pockets</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => handleSelectSensitivity('normal')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, sensitivity === 'normal' && styles.radioActive]}>
              {sensitivity === 'normal' && <View style={styles.radioInner} />}
            </View>
            <View>
              <Text style={styles.radioLabel}>Normal (16.5 m/s²) • Recommended</Text>
              <Text style={styles.radioSub}>Balanced • Prevents walking or running false alarms</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => handleSelectSensitivity('low')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, sensitivity === 'low' && styles.radioActive]}>
              {sensitivity === 'low' && <View style={styles.radioInner} />}
            </View>
            <View>
              <Text style={styles.radioLabel}>Low (21.0 m/s²)</Text>
              <Text style={styles.radioSub}>Requires hard violent shake only</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Test Trigger Button */}
        <TouchableOpacity
          style={styles.testBtn}
          onPress={handleTest}
          activeOpacity={0.85}
        >
          <Text style={styles.testBtnText}>⚡ Test Shake SOS Trigger (5s Countdown)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 24,
  },
  graphicCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 24,
  },
  sensitivitySection: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 28,
  },
  sensitivityHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  radioActive: {
    borderColor: '#DC2626',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DC2626',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  radioSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  testBtn: {
    backgroundColor: '#DC2626',
    width: '100%',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  testBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
