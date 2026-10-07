import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Vibration,
  Animated,
} from 'react-native';
import { VibratePhoneIcon } from '../../components/ui/Icons';
import { useUserStore } from '../../store/useUserStore';
import { useLocationStore } from '../../store/useLocationStore';

interface ShakeDetectedModalProps {
  visible: boolean;
  onSendSOS: () => void;
  onCancel: () => void;
  triggerSource?: string;
  acceleration?: number;
}

export const ShakeDetectedModal: React.FC<ShakeDetectedModalProps> = ({
  visible,
  onSendSOS,
  onCancel,
  triggerSource = 'hardware_accelerometer',
  acceleration = 19.8,
}) => {
  const [countdown, setCountdown] = useState(5);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const emergencyContacts = useUserStore((s) => s.emergencyContacts);
  const location = useLocationStore((s) => s.location);

  useEffect(() => {
    if (!visible) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCountdown(5);
      return;
    }

    setCountdown(5);
    Vibration.vibrate([0, 300, 150, 300]);

    // Pulsing heartbeat animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation (5 seconds)
    progressAnim.setValue(1);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    // Interval countdown
    let remaining = 5;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        onSendSOS();
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [visible, onSendSOS, pulseAnim, progressAnim]);

  const handleManualSend = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    onSendSOS();
  };

  const handleManualCancel = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    Vibration.cancel();
    onCancel();
  };

  const contactCount = emergencyContacts.length > 0 ? emergencyContacts.length : 1;
  const isPowerTrigger = triggerSource === 'power_button';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleManualCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header Badge */}
          <View style={styles.badgeRow}>
            <View style={styles.liveDot} />
            <Text style={styles.badgeText}>
              {isPowerTrigger ? 'POWER BUTTON TRIPLE-CLICK' : 'HARDWARE ACCELEROMETER'}
            </Text>
          </View>

          {/* Pulsing Icon */}
          <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
            <VibratePhoneIcon size={46} color="#EF4444" />
          </Animated.View>

          <Text style={styles.title}>
            {isPowerTrigger ? 'Power SOS Detected!' : 'Vigorous Shake Detected!'}
          </Text>

          <Text style={styles.subtitle}>
            Emergency alert & background SMS with live GPS will be dispatched automatically in:
          </Text>

          {/* Countdown Display */}
          <View style={styles.timerBox}>
            <Text style={styles.timerCount}>{countdown}</Text>
            <Text style={styles.timerSec}>seconds</Text>
          </View>

          {/* Animated Countdown Progress Bar */}
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>

          {/* Incident Telemetry Card */}
          <View style={styles.telemetryCard}>
            <View style={styles.telemetryRow}>
              <Text style={styles.telemetryLabel}>Peak Force:</Text>
              <Text style={styles.telemetryValue}>
                {isPowerTrigger ? '3x Power Toggles' : `${acceleration.toFixed(1)} m/s² (NPU)`}
              </Text>
            </View>
            <View style={styles.telemetryRow}>
              <Text style={styles.telemetryLabel}>SMS Broadcast:</Text>
              <Text style={styles.telemetryValue}>
                {contactCount} {contactCount === 1 ? 'Contact' : 'Contacts'} + Dial 112
              </Text>
            </View>
            <View style={styles.telemetryRow}>
              <Text style={styles.telemetryLabel}>GPS Coordinates:</Text>
              <Text style={styles.telemetryValue} numberOfLines={1}>
                {location
                  ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                  : 'Live Fix Acquired'}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.sosBtn} onPress={handleManualSend} activeOpacity={0.85}>
            <Text style={styles.sosBtnText}>🚨 Send SOS Immediately</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleManualCancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtnText}>I am Safe • Cancel Alert</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  badgeText: {
    color: '#FCA5A5',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 17,
    paddingHorizontal: 8,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 14,
    marginBottom: 8,
  },
  timerCount: {
    fontSize: 48,
    fontWeight: '900',
    color: '#EF4444',
  },
  timerSec: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F87171',
    marginLeft: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 3,
  },
  telemetryCard: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#334155',
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  telemetryLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  telemetryValue: {
    color: '#F1F5F9',
    fontSize: 11,
    fontWeight: '700',
  },
  sosBtn: {
    backgroundColor: '#DC2626',
    width: '100%',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  sosBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelBtn: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
    width: '100%',
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
  },
});
