import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';

interface MorseCodeStrobeModalProps {
  visible: boolean;
  onClose: () => void;
}

export const MorseCodeStrobeModal: React.FC<MorseCodeStrobeModalProps> = ({
  visible,
  onClose,
}) => {
  const [isOn, setIsOn] = useState(false);
  const [symbolIndex, setSymbolIndex] = useState(0);

  // International SOS pattern: 3 short (200ms), 3 long (600ms), 3 short (200ms)
  // Durations in ms: [dot, gap, dot, gap, dot, gap, dash, gap, dash, gap, dash, gap, dot, gap, dot, gap, dot, wordGap]
  const pattern = [
    { on: true, dur: 200, label: '• (S)' },
    { on: false, dur: 150, label: '' },
    { on: true, dur: 200, label: '• (S)' },
    { on: false, dur: 150, label: '' },
    { on: true, dur: 200, label: '• (S)' },
    { on: false, dur: 400, label: '' },
    { on: true, dur: 600, label: '— (O)' },
    { on: false, dur: 200, label: '' },
    { on: true, dur: 600, label: '— (O)' },
    { on: false, dur: 200, label: '' },
    { on: true, dur: 600, label: '— (O)' },
    { on: false, dur: 400, label: '' },
    { on: true, dur: 200, label: '• (S)' },
    { on: false, dur: 150, label: '' },
    { on: true, dur: 200, label: '• (S)' },
    { on: false, dur: 150, label: '' },
    { on: true, dur: 200, label: '• (S)' },
    { on: false, dur: 1000, label: 'REPEAT' },
  ];

  useEffect(() => {
    if (!visible) {
      setIsOn(false);
      return;
    }

    let isMounted = true;
    let step = 0;

    const runStep = () => {
      if (!isMounted) return;
      const current = pattern[step];
      setIsOn(current.on);
      setSymbolIndex(step);
      step = (step + 1) % pattern.length;
      setTimeout(runStep, current.dur);
    };

    runStep();

    return () => {
      isMounted = false;
    };
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent={false} statusBarTranslucent={true} onRequestClose={onClose}>
      <StatusBar barStyle={isOn ? 'dark-content' : 'light-content'} backgroundColor={isOn ? '#FFFFFF' : '#000000'} />
      <View style={[styles.container, { backgroundColor: isOn ? '#FFFFFF' : '#050B14' }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isOn ? '#0F172A' : '#F8FAFC' }]}>
            SOS MORSE STROBE
          </Text>
          <Text style={[styles.subtitle, { color: isOn ? '#475569' : '#94A3B8' }]}>
            Universal Optical Distress Beacon (• • • — — — • • •)
          </Text>
        </View>

        {/* Visual Flash Core */}
        <View style={styles.centerSection}>
          <View
            style={[
              styles.beaconCircle,
              {
                backgroundColor: isOn ? '#FBBF24' : '#1E293B',
                borderColor: isOn ? '#F59E0B' : '#334155',
              },
            ]}
          >
            <Text style={styles.beaconEmoji}>{isOn ? '💡' : '🔦'}</Text>
          </View>
          <Text style={[styles.morseDisplay, { color: isOn ? '#0F172A' : '#38BDF8' }]}>
            {pattern[symbolIndex]?.label || 'TRANSMITTING'}
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.85}>
          <Text style={styles.closeBtnText}>Stop Strobe Light</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
  centerSection: {
    alignItems: 'center',
  },
  beaconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  beaconEmoji: {
    fontSize: 64,
  },
  morseDisplay: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 24,
    letterSpacing: 2,
  },
  closeBtn: {
    backgroundColor: '#DC2626',
    width: '100%',
    maxWidth: 320,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
