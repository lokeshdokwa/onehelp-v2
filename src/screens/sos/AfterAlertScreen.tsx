import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { CheckIcon } from '../../components/ui/Icons';

interface AfterAlertScreenProps {
  onViewDetails: () => void;
  onDone?: () => void;
}

export const AfterAlertScreen: React.FC<AfterAlertScreenProps> = ({
  onViewDetails,
  onDone,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#16A34A" />

      <View style={styles.card}>
        {/* Large White Circle with Green Checkmark */}
        <View style={styles.checkCircle}>
          <CheckIcon size={42} color="#16A34A" />
        </View>

        <Text style={styles.title}>Help is on the way!</Text>
        <Text style={styles.subtitle}>
          Your alert has been sent and{'\n'}help is on its way.
        </Text>

        <TouchableOpacity style={styles.viewDetailsBtn} onPress={onViewDetails} activeOpacity={0.85}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>

        {onDone && (
          <TouchableOpacity style={styles.doneBtn} onPress={onDone}>
            <Text style={styles.doneBtnText}>Back to Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    marginBottom: 36,
  },
  viewDetailsBtn: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  viewDetailsText: {
    color: '#15803D',
    fontSize: 15,
    fontWeight: '700',
  },
  doneBtn: {
    marginTop: 18,
    paddingVertical: 8,
  },
  doneBtnText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
});
