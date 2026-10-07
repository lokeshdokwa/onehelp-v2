import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';

interface PanicButtonFlowModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PanicButtonFlowModal: React.FC<PanicButtonFlowModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [progressStep, setProgressStep] = useState(1);

  useEffect(() => {
    if (!visible) {
      setProgressStep(1);
      return;
    }

    const timer1 = setTimeout(() => setProgressStep(2), 700);
    const timer2 = setTimeout(() => setProgressStep(3), 1400);
    const timer3 = setTimeout(() => {
      onConfirm();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [visible, onConfirm]);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent={true} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.alertIconCircle}>
            <Text style={styles.alertIcon}>🚨</Text>
          </View>

          <Text style={styles.title}>Panic Button Pressed</Text>
          <Text style={styles.subtitle}>
            Sending alert to trusted contacts and emergency services...
          </Text>

          {/* Live Countdown Badge */}
          <View style={styles.countdownBadge}>
            <Text style={styles.countdownText}>
              {progressStep === 1
                ? 'Broadcasting in 3s...'
                : progressStep === 2
                ? 'Broadcasting in 2s...'
                : 'Transmitting Emergency Alert Now!'}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: progressStep === 1 ? '33%' : progressStep === 2 ? '66%' : '100%' },
              ]}
            />
          </View>

          {/* Checklist items */}
          <View style={styles.stepList}>
            <StepItem label="Location sharing" done={progressStep >= 1} />
            <StepItem label="Contact notifications" done={progressStep >= 2} />
            <StepItem label="Audio recording" done={progressStep >= 3} />
          </View>

          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtnText}>Cancel Alert</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const StepItem = ({ label, done }: { label: string; done: boolean }) => (
  <View style={styles.stepRow}>
    <View style={[styles.stepDot, done && styles.stepDotDone]} />
    <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  alertIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertIcon: {
    fontSize: 28,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 20,
  },
  countdownBadge: {
    backgroundColor: '#7F1D1D',
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 14,
  },
  countdownText: {
    color: '#FECACA',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#DC2626',
    borderRadius: 3,
  },
  stepList: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#334155',
  },
  stepDotDone: {
    backgroundColor: '#16A34A',
  },
  stepLabel: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  stepLabelDone: {
    color: '#F8FAFC',
  },
  cancelBtn: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '700',
  },
});
