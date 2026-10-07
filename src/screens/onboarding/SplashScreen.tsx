import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { ShieldPlusIcon } from '../../components/ui/Icons';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onFinish}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Mountain night backdrop simulation */}
      <View style={styles.mountainBackdrop}>
        <View style={styles.starsLayer} />
        <View style={styles.mountainBack} />
        <View style={styles.mountainMiddle} />
        <View style={styles.mountainFront} />
      </View>

      {/* Center Branding */}
      <View style={styles.centerContent}>
        <View style={styles.logoBadge}>
          <ShieldPlusIcon size={64} color="#DC2626" />
        </View>
        <Text style={styles.appName}>OneHelp</Text>
        <Text style={styles.tagline}>Real Help in Emergency</Text>
      </View>

      {/* Bottom Offline Guarantee */}
      <View style={styles.footer}>
        <View style={styles.offlinePill}>
          <Text style={styles.footerText}>Works Offline and Weaker Connection</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 56,
  },
  mountainBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#090D16',
    overflow: 'hidden',
  },
  starsLayer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    height: 120,
    opacity: 0.3,
  },
  mountainBack: {
    position: 'absolute',
    bottom: 80,
    left: -40,
    width: 320,
    height: 280,
    backgroundColor: '#1E293B',
    transform: [{ rotate: '45deg' }],
    opacity: 0.5,
  },
  mountainMiddle: {
    position: 'absolute',
    bottom: 40,
    right: -50,
    width: 380,
    height: 320,
    backgroundColor: '#162033',
    transform: [{ rotate: '50deg' }],
    opacity: 0.7,
  },
  mountainFront: {
    position: 'absolute',
    bottom: -60,
    left: 20,
    width: 400,
    height: 260,
    backgroundColor: '#0A0F1D',
    transform: [{ rotate: '35deg' }],
  },
  centerContent: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    zIndex: 10,
  },
  logoBadge: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  appName: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 0.3,
  },
  footer: {
    zIndex: 10,
    paddingHorizontal: 24,
  },
  offlinePill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
});
