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
import { PhoneCallIcon } from '../../components/ui/Icons';

interface FakeCallModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const FakeCallModal: React.FC<FakeCallModalProps> = ({ visible, onDismiss }) => {
  const [callState, setCallState] = useState<'incoming' | 'connected'>('incoming');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!visible) {
      setCallState('incoming');
      setCallDuration(0);
      Vibration.cancel();
      return;
    }

    // Vibrate phone like a real incoming call
    Vibration.vibrate([1000, 1000, 1000, 1000], true);

    return () => {
      Vibration.cancel();
    };
  }, [visible]);

  useEffect(() => {
    if (callState !== 'connected') return;
    const interval = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const handleAccept = () => {
    Vibration.cancel();
    setCallState('connected');
  };

  const handleDecline = () => {
    Vibration.cancel();
    onDismiss();
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} statusBarTranslucent={true} onRequestClose={handleDecline}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {/* Caller Info */}
        <View style={styles.callerSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍👧</Text>
          </View>
          <Text style={styles.callerName}>Papa (Emergency Contact)</Text>
          <Text style={styles.callerNumber}>+91 98765 43210</Text>
          <Text style={styles.callStatus}>
            {callState === 'incoming' ? 'Incoming Call...' : formatTimer(callDuration)}
          </Text>
        </View>

        {/* Audio Simulation in Call */}
        {callState === 'connected' && (
          <View style={styles.activeCallBanner}>
            <Text style={styles.activeCallText}>
              🗣️ "Haan beta, kahan ho? Main police ke saath pahunch raha hoon, sab theek hai?"
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {callState === 'incoming' ? (
            <>
              <TouchableOpacity style={styles.declineBtn} onPress={handleDecline} activeOpacity={0.8}>
                <View style={styles.declineIconCircle}>
                  <Text style={styles.btnIcon}>✕</Text>
                </View>
                <Text style={styles.actionLabel}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept} activeOpacity={0.8}>
                <View style={styles.acceptIconCircle}>
                  <PhoneCallIcon size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.actionLabel}>Accept</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.endCallBtn} onPress={handleDecline} activeOpacity={0.8}>
              <View style={styles.endCallIconCircle}>
                <Text style={styles.btnIcon}>✕</Text>
              </View>
              <Text style={styles.actionLabel}>End Call</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
    paddingVertical: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  callerSection: {
    alignItems: 'center',
    marginTop: 32,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  callerName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  callerNumber: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 6,
  },
  callStatus: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 14,
  },
  activeCallBanner: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginHorizontal: 16,
  },
  activeCallText: {
    color: '#F8FAFC',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 24,
  },
  declineBtn: {
    alignItems: 'center',
    gap: 10,
  },
  declineIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptBtn: {
    alignItems: 'center',
    gap: 10,
  },
  acceptIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallBtn: {
    alignItems: 'center',
    gap: 10,
  },
  endCallIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  actionLabel: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
