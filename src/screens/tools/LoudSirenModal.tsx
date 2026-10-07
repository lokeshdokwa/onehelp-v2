import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Vibration,
  StatusBar,
} from 'react-native';

interface LoudSirenModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LoudSirenModal: React.FC<LoudSirenModalProps> = ({ visible, onClose }) => {
  const [strobeColor, setStrobeColor] = useState<'red' | 'blue'>('red');

  useEffect(() => {
    if (!visible) {
      Vibration.cancel();
      return;
    }

    // High vibration pattern for alarm simulation
    Vibration.vibrate([200, 100, 200, 100, 200, 100], true);

    const interval = setInterval(() => {
      setStrobeColor((c) => (c === 'red' ? 'blue' : 'red'));
    }, 250);

    return () => {
      clearInterval(interval);
      Vibration.cancel();
    };
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent={false} statusBarTranslucent={true} onRequestClose={onClose}>
      <StatusBar barStyle="light-content" backgroundColor={strobeColor === 'red' ? '#DC2626' : '#2563EB'} />
      <View
        style={[
          styles.container,
          { backgroundColor: strobeColor === 'red' ? '#DC2626' : '#2563EB' },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.alertIcon}>🚨</Text>
          <Text style={styles.title}>EMERGENCY SIREN ACTIVE</Text>
          <Text style={styles.subtitle}>
            High-Decibel Deterrent Alarm & Strobe Light
          </Text>

          <View style={styles.soundIndicatorCard}>
            <Text style={styles.soundDecibel}>🔊 110 dB</Text>
            <Text style={styles.soundNote}>Maximum Speaker Output • Audio Alert Active</Text>
          </View>

          <TouchableOpacity style={styles.stopBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.stopBtnText}>STOP SIREN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  alertIcon: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    fontWeight: '600',
  },
  soundIndicatorCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  soundDecibel: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  soundNote: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  stopBtn: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  stopBtnText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
