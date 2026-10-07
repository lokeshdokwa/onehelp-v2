import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { MicIcon } from '../../components/ui/Icons';

interface VoiceCommandModalProps {
  visible: boolean;
  onRecognized: (command: string) => void;
  onCancel: () => void;
}

export const VoiceCommandModal: React.FC<VoiceCommandModalProps> = ({
  visible,
  onRecognized,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Listening...</Text>

          {/* Glowing Microphone Circles */}
          <View style={styles.micCircleContainer}>
            <View style={styles.pulseOuter} />
            <View style={styles.pulseMiddle} />
            <View style={styles.micBadge}>
              <MicIcon size={36} color="#FFFFFF" />
            </View>
          </View>

          {/* Sound Wave Bars Simulation */}
          <View style={styles.waveRow}>
            {[18, 32, 54, 38, 20, 48, 62, 40, 24, 44].map((h, i) => (
              <View key={i} style={[styles.waveBar, { height: h }]} />
            ))}
          </View>

          <Text style={styles.prompt}>Say "Help" or "Emergency"</Text>

          {/* Simulate Saying Help Button */}
          <TouchableOpacity
            style={styles.simulateBtn}
            onPress={() => onRecognized('Help')}
            activeOpacity={0.8}
          >
            <Text style={styles.simulateText}>🗣️ Simulate Saying "Help"</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 28,
  },
  micCircleContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  pulseOuter: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
  },
  pulseMiddle: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
  },
  micBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 60,
    marginBottom: 20,
  },
  waveBar: {
    width: 4,
    backgroundColor: '#60A5FA',
    borderRadius: 2,
  },
  prompt: {
    color: '#CBD5E1',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  simulateBtn: {
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  simulateText: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '700',
  },
  cancelBtn: {
    padding: 6,
  },
  cancelText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
});
