import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeWalkModalProps {
  visible: boolean;
  onClose: () => void;
  onTriggerSOS: () => void;
}

export const SafeWalkModal: React.FC<SafeWalkModalProps> = ({
  visible,
  onClose,
  onTriggerSOS,
}) => {
  const insets = useSafeAreaInsets();
  const [isActive, setIsActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes walk timer

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((s) => s - 1);
      }, 1000);
    } else if (isActive && secondsRemaining === 0) {
      setIsActive(false);
      Alert.alert(
        '⚠️ Safe Walk Checkpoint Missed!',
        'You did not check in. Escalating automatic SOS to family and nearest patrol unit.',
        [
          {
            text: 'I Am Safe (Dismiss)',
            onPress: () => setSecondsRemaining(600),
          },
          {
            text: 'Trigger Emergency SOS',
            style: 'destructive',
            onPress: () => {
              onClose();
              onTriggerSOS();
            },
          },
        ]
      );
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startSession = () => {
    setIsActive(true);
    setSecondsRemaining(600);
  };

  const endSession = () => {
    setIsActive(false);
    setSecondsRemaining(600);
    Alert.alert('Safe Walk Ended', 'Walk monitor concluded. Emergency contacts notified you reached safely.');
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

        {/* Top Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Text style={styles.closeText}>✕ Close</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Safe Walk Geo-Monitor</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.content}>
          {/* Status Badge */}
          <View style={[styles.statusBadge, isActive ? styles.badgeActive : styles.badgeInactive]}>
            <View style={[styles.statusDot, isActive ? styles.dotActive : styles.dotInactive]} />
            <Text style={[styles.statusBadgeText, isActive ? styles.textActive : styles.textInactive]}>
              {isActive ? 'SHADOW PROTOCOL ARMED' : 'MONITOR IDLE'}
            </Text>
          </View>

          {/* Central Timer Display */}
          <View style={styles.timerRing}>
            <Text style={styles.timerValue}>{formatTimer(secondsRemaining)}</Text>
            <Text style={styles.timerSub}>
              {isActive ? 'Next Safety Checkpoint' : 'Duration: 10 mins'}
            </Text>
          </View>

          {/* Geo-Trail Information */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Live Dead-Man Breadcrumb</Text>
            <Text style={styles.cardSub}>
              Transmits encrypted GPS coordinates every 30 seconds to your emergency circle. If you stop moving unexpectedly or fail to check in before countdown hits zero, SOS triggers automatically.
            </Text>

            <View style={styles.telemetryRow}>
              <View style={styles.telemCol}>
                <Text style={styles.telemLabel}>Trail Sampling</Text>
                <Text style={styles.telemVal}>30s Live GPS</Text>
              </View>
              <View style={styles.telemCol}>
                <Text style={styles.telemLabel}>Battery Impact</Text>
                <Text style={styles.telemVal}>&lt; 0.4% / hr</Text>
              </View>
              <View style={styles.telemCol}>
                <Text style={styles.telemLabel}>Auto-Escalation</Text>
                <Text style={styles.telemVal}>112 + Circle</Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={[styles.actionSection, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            {!isActive ? (
              <TouchableOpacity style={styles.startBtn} onPress={startSession} activeOpacity={0.85}>
                <Text style={styles.startBtnText}>🚶 Start Safe Walk Session</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.checkinBtn}
                  onPress={() => {
                    setSecondsRemaining(600);
                    Alert.alert('Check-In Confirmed', 'Countdown reset to 10 minutes. Safe walk continuing.');
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.checkinBtnText}>✓ I Am Safe (Reset 10m)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.stopBtn} onPress={endSession} activeOpacity={0.85}>
                  <Text style={styles.stopBtnText}>I Reached Destination</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  closeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  closeText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeActive: {
    backgroundColor: '#064E3B',
  },
  badgeInactive: {
    backgroundColor: '#334155',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  dotActive: {
    backgroundColor: '#10B981',
  },
  dotInactive: {
    backgroundColor: '#94A3B8',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textActive: {
    color: '#6EE7B7',
  },
  textInactive: {
    color: '#CBD5E1',
  },
  timerRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: '#3B82F6',
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  timerValue: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 1,
  },
  timerSub: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardSub: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  telemCol: {
    alignItems: 'center',
  },
  telemLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  telemVal: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  actionSection: {
    width: '100%',
    marginBottom: 16,
    gap: 10,
  },
  startBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  checkinBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkinBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  stopBtn: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  stopBtnText: {
    color: '#F1F5F9',
    fontWeight: '700',
    fontSize: 13,
  },
});
