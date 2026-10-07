import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeftIcon } from '../../components/ui/Icons';

interface DuressPINScreenProps {
  onBack?: () => void;
  onPINSubmitted: (pin: string) => void;
}

export const DuressPINScreen: React.FC<DuressPINScreenProps> = ({
  onBack,
  onPINSubmitted,
}) => {
  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        setTimeout(() => {
          onPINSubmitted(nextPin);
          setPin('');
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeftIcon size={22} color="#F8FAFC" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}
        <Text style={styles.headerTitle}>Enter Duress PIN</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* 4 Pin Indicator Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                pin.length > index ? styles.dotFilled : styles.dotEmpty,
              ]}
            />
          ))}
        </View>

        {/* Security Subtitle */}
        <Text style={styles.subtitle}>
          Entering the duress PIN silently alerts police while appearing to cancel.
        </Text>

        {/* Numeric Keypad Grid */}
        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(
            (val, idx) => {
              if (val === '') {
                return <View key={idx} style={styles.emptyKey} />;
              }
              if (val === '⌫') {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.key}
                    onPress={handleDelete}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.keyTextDelete}>⌫</Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.key}
                  onPress={() => handleKeyPress(val)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.keyText}>{val}</Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  dotEmpty: {
    borderColor: '#475569',
    backgroundColor: 'transparent',
  },
  dotFilled: {
    borderColor: '#60A5FA',
    backgroundColor: '#3B82F6',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 44,
    lineHeight: 18,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 280,
    rowGap: 16,
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyKey: {
    width: 72,
    height: 72,
  },
  keyText: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '700',
  },
  keyTextDelete: {
    color: '#94A3B8',
    fontSize: 22,
    fontWeight: '700',
  },
});
