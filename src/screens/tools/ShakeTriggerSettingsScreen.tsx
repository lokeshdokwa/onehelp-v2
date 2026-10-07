import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeftIcon, VibratePhoneIcon } from '../../components/ui/Icons';

interface ShakeTriggerSettingsScreenProps {
  onBack?: () => void;
  onTestTrigger: () => void;
}

export const ShakeTriggerSettingsScreen: React.FC<ShakeTriggerSettingsScreenProps> = ({
  onBack,
  onTestTrigger,
}) => {
  const [sensitivity, setSensitivity] = useState<'normal' | 'high' | 'low'>('normal');

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
          <VibratePhoneIcon size={56} color="#2563EB" />
        </View>

        {/* Headline */}
        <Text style={styles.title}>
          Shake your phone{'\n'}or press the power button{'\n'}3 times to trigger SOS.
        </Text>

        {/* Sensitivity Options */}
        <View style={styles.sensitivitySection}>
          <Text style={styles.sensitivityHeader}>Sensitivity</Text>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setSensitivity('normal')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, sensitivity === 'normal' && styles.radioActive]}>
              {sensitivity === 'normal' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Normal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setSensitivity('high')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, sensitivity === 'high' && styles.radioActive]}>
              {sensitivity === 'high' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>High</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setSensitivity('low')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, sensitivity === 'low' && styles.radioActive]}>
              {sensitivity === 'low' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Low</Text>
          </TouchableOpacity>
        </View>

        {/* Test Trigger Button */}
        <TouchableOpacity
          style={styles.testBtn}
          onPress={onTestTrigger}
          activeOpacity={0.85}
        >
          <Text style={styles.testBtnText}>Test Trigger</Text>
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
    paddingTop: 32,
  },
  graphicCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  sensitivitySection: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 36,
  },
  sensitivityHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  radioActive: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  testBtn: {
    backgroundColor: '#2563EB',
    width: '100%',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  testBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
