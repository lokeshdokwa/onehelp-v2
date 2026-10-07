import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { ArrowLeftIcon, CheckIcon } from '../../components/ui/Icons';

interface OfflineModeScreenProps {
  onBack?: () => void;
  onRetry?: () => void;
  onOpenAIAssistant?: () => void;
}

export const OfflineModeScreen: React.FC<OfflineModeScreenProps> = ({
  onBack,
  onRetry,
  onOpenAIAssistant,
}) => {
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
        <Text style={styles.headerTitle}>Offline Mode</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* Disconnected Graphic */}
        <View style={styles.graphicWrap}>
          <Svg width={140} height={140} viewBox="0 0 140 140" fill="none">
            <Circle cx="70" cy="70" r="60" fill="#FEF2F2" />
            <Circle cx="70" cy="70" r="45" fill="#FEE2E2" />
            {/* Disconnected signal icon */}
            <Path d="M40 50C56 36 84 36 100 50" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <Path d="M52 64C62 54 78 54 88 64" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <Circle cx="70" cy="85" r="5" fill="#DC2626" />
            {/* Slash */}
            <Path d="M35 105L105 35" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          </Svg>
        </View>

        {/* Headline */}
        <Text style={styles.title}>You are Offline</Text>
        <Text style={styles.subtitle}>
          No internet, SIM or cell towers available.
        </Text>

        {/* Checklist */}
        <View style={styles.checklistCard}>
          <CheckItem label="Maps (cached)" />
          <CheckItem label="Helplines (cached)" />
          <CheckItem label="Emergency contacts (available)" />
          {onOpenAIAssistant ? (
            <TouchableOpacity onPress={onOpenAIAssistant} activeOpacity={0.7}>
              <CheckItem label="🤖 AI assistant (local) • Tap to Open" isLast />
            </TouchableOpacity>
          ) : (
            <CheckItem label="AI assistant (local)" isLast />
          )}
        </View>

        {/* Protection Banner */}
        <View style={styles.protectedBanner}>
          <Text style={styles.protectedTitle}>🛡️ Your safety is still protected!</Text>
          <Text style={styles.protectedSub}>
            OneHelp works offline and will sync automatically when connection returns.
          </Text>
        </View>

        {/* Try Again Button */}
        <TouchableOpacity style={styles.tryAgainBtn} onPress={onRetry || onBack} activeOpacity={0.85}>
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const CheckItem = ({ label, isLast = false }: { label: string; isLast?: boolean }) => (
  <View style={[styles.checkRow, !isLast && styles.checkRowBorder]}>
    <View style={styles.checkIcon}>
      <CheckIcon size={14} color="#16A34A" />
    </View>
    <Text style={styles.checkLabel}>{label}</Text>
  </View>
);

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
    paddingTop: 24,
  },
  graphicWrap: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 28,
    textAlign: 'center',
  },
  checklistCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  protectedBanner: {
    width: '100%',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    padding: 14,
    marginBottom: 28,
  },
  protectedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 4,
  },
  protectedSub: {
    fontSize: 12,
    color: '#2563EB',
    lineHeight: 18,
  },
  tryAgainBtn: {
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
  tryAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
