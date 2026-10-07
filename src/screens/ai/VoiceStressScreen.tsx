import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { ArrowLeftIcon, MicIcon } from '../../components/ui/Icons';

interface VoiceStressScreenProps {
  onBack?: () => void;
}

export const VoiceStressScreen: React.FC<VoiceStressScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [timer, setTimer] = useState(12);
  const [waveHeights, setWaveHeights] = useState([
    14, 28, 48, 70, 88, 64, 42, 92, 55, 34, 68, 80, 45, 20, 36, 62, 78, 50, 24, 16,
  ]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    const waveInterval = setInterval(() => {
      setWaveHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * 65) + 20)
      );
    }, 900);

    return () => {
      clearInterval(timerInterval);
      clearInterval(waveInterval);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    return `00:${pad(sec)}`;
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
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
        <Text style={styles.headerTitle}>AI Voice Stress Analyzer</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* Dynamic Red Waveform */}
        <View style={styles.waveformContainer}>
          {waveHeights.map((h, index) => (
            <View
              key={index}
              style={[
                styles.waveBar,
                { height: h },
              ]}
            />
          ))}
        </View>

        {/* Timer & Explanation */}
        <Text style={styles.timer}>{formatTimer(timer)}</Text>
        <Text style={styles.description}>
          Your voice is being analyzed for stress,{'\n'}panic and distress signals.
        </Text>

        {/* Status Badge Card */}
        <View style={styles.statusCard}>
          <View style={styles.smileCircle}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="12" r="10" stroke="#16A34A" strokeWidth="2" fill="#DCFCE7" />
              <Circle cx="8.5" cy="9.5" r="1.5" fill="#16A34A" />
              <Circle cx="15.5" cy="9.5" r="1.5" fill="#16A34A" />
              <Path d="M7.5 14C8.5 16 10 17 12 17C14 17 15.5 16 16.5 14" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </View>
          <View style={styles.statusTextCol}>
            <Text style={styles.statusTitle}>Current Status: <Text style={styles.statusHighlight}>Calm</Text></Text>
            <Text style={styles.statusSub}>No signs of high stress detected.</Text>
          </View>
        </View>

        {/* Helper Tip Box */}
        <View style={styles.tipBox}>
          <View style={styles.tipIcon}>
            <MicIcon size={20} color="#2563EB" />
          </View>
          <Text style={styles.tipText}>
            You can also use a voice command like <Text style={styles.tipBold}>"Help"</Text> or <Text style={styles.tipBold}>"Emergency"</Text>.
          </Text>
        </View>
      </View>
    </View>
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
    paddingTop: 36,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    height: 120,
    width: '100%',
    marginBottom: 24,
  },
  waveBar: {
    width: 6,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  timer: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    gap: 14,
    marginBottom: 20,
  },
  smileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTextCol: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusHighlight: {
    color: '#16A34A',
    fontWeight: '800',
  },
  statusSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    gap: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  tipBold: {
    fontWeight: '700',
  },
});
