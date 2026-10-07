import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { AppLogo } from '../../components/ui/AppLogo';
import {
  PoliceServiceIcon,
  FireServiceIcon,
  AmbulanceServiceIcon,
  UsersIcon,
} from '../../components/ui/Icons';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
  onLogin: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onLogin,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Your Safety\nOur Priority',
      subtitle: 'Fast, reliable and offline emergency support when you need it most.',
      renderIllustration: () => (
        <View style={styles.illustrationWrap}>
          <Svg width={220} height={200} viewBox="0 0 220 200" fill="none">
            {/* Background Soft Glow */}
            <Circle cx="110" cy="100" r="85" fill="#EFF6FF" />
            <Circle cx="110" cy="100" r="65" fill="#DBEAFE" opacity="0.6" />
            {/* Person holding phone */}
            <Circle cx="110" cy="65" r="24" fill="#3B82F6" />
            <Path d="M75 140C75 118 90 102 110 102C130 102 145 118 145 140V160H75V140Z" fill="#1D4ED8" />
            {/* Phone */}
            <Rect x="135" y="80" width="34" height="60" rx="6" fill="#0F172A" />
            <Rect x="139" y="86" width="26" height="48" rx="3" fill="#60A5FA" />
            {/* Shield Icon floating */}
            <Circle cx="65" cy="75" r="22" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
            <Path d="M65 64L57 67V73C57 78 60 82 65 84C70 82 73 78 73 73V67L65 64Z" fill="#DC2626" />
            <Path d="M65 70V78M61 74H69" stroke="#FFF" strokeWidth="1.5" />
          </Svg>
        </View>
      ),
      primaryBtnText: 'Get Started',
      showLoginLink: true,
    },
    {
      title: 'Works Offline and\nWeaker Connection',
      subtitle: 'No internet, no SIM, no cell towers. Still works when it matters.',
      renderIllustration: () => (
        <View style={styles.illustrationWrap}>
          <Svg width={220} height={200} viewBox="0 0 220 200" fill="none">
            {/* Concentric Signal Rings */}
            <Circle cx="110" cy="100" r="90" stroke="#DBEAFE" strokeWidth="2" strokeDasharray="4 4" />
            <Circle cx="110" cy="100" r="68" stroke="#93C5FD" strokeWidth="2" />
            <Circle cx="110" cy="100" r="48" fill="#EFF6FF" />
            {/* Phone Silhouette */}
            <Rect x="85" y="55" width="50" height="90" rx="8" fill="#1E293B" />
            <Rect x="90" y="62" width="40" height="74" rx="4" fill="#FFFFFF" />
            {/* Offline Wifi Icon */}
            <Path d="M98 90C101 87 106 85 110 85C114 85 119 87 122 90" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            <Path d="M102 96C104 94 107 93 110 93C113 93 116 94 118 96" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            <Circle cx="110" cy="104" r="2.5" fill="#DC2626" />
            <Path d="M95 118L125 78" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      ),
      primaryBtnText: 'Next',
      showSkipLink: true,
    },
    {
      title: 'Trusted by\nMillions',
      subtitle: 'From your family to emergency services, OneHelp keeps you safe.',
      renderIllustration: () => (
        <View style={styles.trustedGrid}>
          <View style={styles.serviceItem}>
            <View style={[styles.serviceCircle, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
              <UsersIcon size={28} color="#2563EB" />
            </View>
            <Text style={styles.serviceLabel}>Family</Text>
          </View>
          <View style={styles.serviceItem}>
            <View style={[styles.serviceCircle, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
              <PoliceServiceIcon size={28} />
            </View>
            <Text style={styles.serviceLabel}>Police</Text>
          </View>
          <View style={styles.serviceItem}>
            <View style={[styles.serviceCircle, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
              <FireServiceIcon size={28} />
            </View>
            <Text style={styles.serviceLabel}>Fire</Text>
          </View>
          <View style={styles.serviceItem}>
            <View style={[styles.serviceCircle, { backgroundColor: '#FFF1F2', borderColor: '#FFE4E6' }]}>
              <AmbulanceServiceIcon size={28} />
            </View>
            <Text style={styles.serviceLabel}>Ambulance</Text>
          </View>
        </View>
      ),
      primaryBtnText: 'Get Started',
      showLoginLink: false,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Logo */}
      <View style={styles.header}>
        <AppLogo size="sm" />
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>

        {/* Dynamic Graphic */}
        <View style={styles.graphicContainer}>
          {current.renderIllustration()}
        </View>

        {/* Step Indicator Dots */}
        <View style={styles.dotsRow}>
          {steps.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentStep ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>{current.primaryBtnText}</Text>
        </TouchableOpacity>

        {current.showLoginLink && (
          <TouchableOpacity onPress={onLogin} style={styles.secondaryLink}>
            <Text style={styles.secondaryLinkText}>I already have an account</Text>
          </TouchableOpacity>
        )}

        {current.showSkipLink && (
          <TouchableOpacity onPress={onComplete} style={styles.secondaryLink}>
            <Text style={styles.skipLinkText}>Skip</Text>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  graphicContainer: {
    marginVertical: 36,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustedGrid: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceItem: {
    alignItems: 'center',
  },
  serviceCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#2563EB',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#CBD5E1',
  },
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryLink: {
    marginTop: 16,
    paddingVertical: 4,
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  skipLinkText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
});
