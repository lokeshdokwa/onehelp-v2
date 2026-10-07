import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToolId =
  | 'widget'
  | 'shakeModal'
  | 'duress'
  | 'voice'
  | 'stress'
  | 'pushNotif'
  | 'routing'
  | 'afterAlert'
  | 'familyAlert'
  | 'offline'
  | 'shakeSettings'
  | 'fakeCall'
  | 'siren'
  | 'morse'
  | 'survivalGuides'
  | 'liveTracker'
  | 'lostChild'
  | 'lowChat'
  | 'safeWalk';

interface QuickToolsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolId) => void;
}

interface ToolItem {
  id: ToolId;
  title: string;
  icon: string;
  desc: string;
}

interface ToolCategory {
  category: string;
  items: ToolItem[];
}

export const QuickToolsModal: React.FC<QuickToolsModalProps> = ({
  visible,
  onClose,
  onSelectTool,
}) => {
  const insets = useSafeAreaInsets();

  const toolCategories: ToolCategory[] = [
    {
      category: 'TACTICAL DETERRENTS & SAFETY',
      items: [
        { id: 'fakeCall', title: 'Fake Call Deterrent ("Papa Calling...")', icon: '📞', desc: 'Simulate incoming call to exit unsafe situations' },
        { id: 'siren', title: 'Tactical Siren & Police Flasher', icon: '🚨', desc: 'High-decibel alarm & flashing warning lights' },
        { id: 'morse', title: 'Morse Code Optical SOS Strobe', icon: '🔦', desc: 'Automated optical SOS flashlight distress signal' },
        { id: 'safeWalk', title: 'Safe Walk Geo-Monitor', icon: '🚶', desc: 'Automated dead-man timer & safety checkpoint' },
      ],
    },
    {
      category: 'FIRST-AID & MEDICAL RESPONSE',
      items: [
        { id: 'survivalGuides', title: 'Offline First-Aid & Survival Guides', icon: '🩺', desc: 'Offline medical, CPR & disaster step-by-step guides' },
        { id: 'lostChild', title: 'Lost Child AI Face Matcher', icon: '👦', desc: 'On-device biometric photo match for missing persons' },
        { id: 'stress', title: 'AI Voice Stress Analyzer', icon: '📊', desc: 'Acoustic voice analysis for distress detection' },
      ],
    },
    {
      category: 'OFFLINE, 2G & LIVE DISPATCH',
      items: [
        { id: 'liveTracker', title: 'Live Dispatcher Vehicle Tracker', icon: '🚑', desc: 'Real-time moving map & emergency vehicle telemetry' },
        { id: 'lowChat', title: 'Low-Bandwidth 2G Text Mode', icon: '💬', desc: 'Ultra-compressed emergency text messaging' },
        { id: 'offline', title: 'Offline Emergency Mode', icon: '📡', desc: 'Local offline database & mesh network operations' },
        { id: 'routing', title: 'Multi-Agency Routing', icon: '🚔', desc: 'Automated police, fire & medical triage dispatch' },
        { id: 'afterAlert', title: 'After Alert ("Help on way")', icon: '✅', desc: 'Live response status, ETA & safety instructions' },
      ],
    },
    {
      category: 'TRIGGERS & QUICK ACCESS',
      items: [
        { id: 'widget', title: 'Quick Access SOS Widget', icon: '📱', desc: 'One-touch emergency trigger from lockscreen' },
        { id: 'shakeModal', title: 'Shake Trigger Alert', icon: '📳', desc: 'Rapid accelerometer shake gesture activation' },
        { id: 'duress', title: 'Duress PIN Screen', icon: '🔢', desc: 'Silent covert emergency activation PIN' },
        { id: 'voice', title: 'Voice Command ("Help")', icon: '🎙️', desc: 'Hands-free emergency keyword detection' },
        { id: 'familyAlert', title: 'Trusted Family Alert', icon: '👥', desc: 'Instant SMS broadcast to emergency contacts' },
        { id: 'shakeSettings', title: 'Shake & Power Settings', icon: '⚙️', desc: 'Configure hardware trigger sensitivity' },
        { id: 'pushNotif', title: 'Disaster Broadcast Alerts', icon: '🔔', desc: 'Simulated emergency broadcast & evacuation alerts' },
      ],
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>All Screens & Tools</Text>
              <Text style={styles.sub}>
                Quick access to emergency safety & response tools
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Text style={styles.closeText}>Done</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {toolCategories.map((group, groupIdx) => (
              <View key={groupIdx} style={styles.groupContainer}>
                <Text style={styles.groupHeader}>{group.category}</Text>
                <View style={styles.groupCard}>
                  {group.items.map((item, itemIdx) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.item,
                        itemIdx === group.items.length - 1 && styles.itemLast,
                      ]}
                      onPress={() => {
                        onClose();
                        onSelectTool(item.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.iconCircle}>
                        <Text style={styles.itemIcon}>{item.icon}</Text>
                      </View>
                      <View style={styles.itemCol}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemScreen}>{item.desc}</Text>
                      </View>
                      <Text style={styles.itemChevron}>›</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 12,
    maxHeight: '85%',
  },
  handle: {
    width: 44,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
  },
  closeText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 14,
  },
  sub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  list: {
    marginBottom: 8,
  },
  groupContainer: {
    marginTop: 14,
  },
  groupHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIcon: {
    fontSize: 20,
  },
  itemCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemScreen: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  itemChevron: {
    fontSize: 20,
    color: '#94A3B8',
    fontWeight: '600',
  },
});
