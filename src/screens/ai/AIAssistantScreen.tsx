import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, MapPinIcon, BatteryIcon } from '../../components/ui/Icons';
import { OfflineAIService, AIResponseMessage, AIResponseAction } from '../../services/OfflineAIService';
import { useLocationStore } from '../../store/useLocationStore';
import { useDeviceStatusStore } from '../../store/useDeviceStatusStore';

interface AIAssistantScreenProps {
  onBack: () => void;
  onTriggerSOS?: () => void;
  onOpenSiren?: () => void;
  onOpenMorse?: () => void;
  onOpenGuides?: () => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({
  onBack,
  onTriggerSOS,
  onOpenSiren,
  onOpenMorse,
  onOpenGuides,
}) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const { address, location } = useLocationStore();
  const { batteryLevel, isOnline } = useDeviceStatusStore();

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AIResponseMessage[]>([]);

  const sampleChips = [
    '🐍 Snake Bite First-Aid',
    '❤️ How to do CPR?',
    '🔥 LPG Cylinder Leak',
    '🏃 Someone is following me',
    '🩸 Stop Severe Bleeding',
    '⚖️ Police Rights (Zero FIR)',
  ];

  // Initialize with greeting
  useEffect(() => {
    const initWelcome = async () => {
      const welcome = await OfflineAIService.processQuery('help');
      setMessages([welcome]);
    };
    initWelcome();
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    setInputVal('');

    const userMsg: AIResponseMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Process on-device offline
    setTimeout(async () => {
      const aiReply = await OfflineAIService.processQuery(text);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }, 350);
  };

  const handleActionPress = (action: AIResponseAction) => {
    switch (action.type) {
      case 'sos':
        Alert.alert(
          '🚨 Trigger Emergency SOS',
          'Do you want to dispatch SOS coordinates immediately?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Trigger SOS',
              style: 'destructive',
              onPress: () => {
                onBack();
                if (onTriggerSOS) onTriggerSOS();
              },
            },
          ]
        );
        break;
      case 'call112':
        Linking.openURL('tel:112');
        break;
      case 'siren':
        onBack();
        if (onOpenSiren) onOpenSiren();
        break;
      case 'morse':
        onBack();
        if (onOpenMorse) onOpenMorse();
        break;
      case 'guides':
        onBack();
        if (onOpenGuides) onOpenGuides();
        break;
    }
  };

  const currentAreaText = address || (location ? `${location.latitude.toFixed(4)}°, ${location.longitude.toFixed(4)}°` : 'Live GPS');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeftIcon size={22} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>OneHelp AI Assistant</Text>
            <View style={styles.offlineBadge}>
              <Text style={styles.offlineBadgeText}>⚡ 100% OFFLINE</Text>
            </View>
          </View>
          <Text style={styles.headerSub}>On-Device Neural Engine • Zero Data Used</Text>
        </View>
      </View>

      {/* Hardware Telemetry Bar */}
      <View style={styles.telemetryBar}>
        <View style={styles.telemetryItem}>
          <MapPinIcon size={13} color="#2563EB" />
          <Text style={styles.telemetryText} numberOfLines={1}>
            {currentAreaText}
          </Text>
        </View>
        <View style={styles.telemetryItem}>
          <BatteryIcon size={13} color={batteryLevel <= 20 ? '#DC2626' : '#16A34A'} />
          <Text style={styles.telemetryText}>{batteryLevel}% Battery</Text>
        </View>
        <View style={styles.telemetryItem}>
          <Text style={styles.dotOnline}>{isOnline ? '🟢 Online' : '✈️ Airplane / Offline'}</Text>
        </View>
      </View>

      {/* Messages Scroll Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.msgWrapper,
              msg.sender === 'user' ? styles.msgWrapperUser : styles.msgWrapperAI,
            ]}
          >
            {msg.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Text style={styles.aiAvatarText}>🤖</Text>
              </View>
            )}

            <View
              style={[
                styles.bubble,
                msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                msg.severity === 'critical' && styles.bubbleCritical,
                msg.severity === 'urgent' && styles.bubbleUrgent,
              ]}
            >
              {msg.severity && (
                <View
                  style={[
                    styles.severityBadge,
                    msg.severity === 'critical'
                      ? styles.badgeCrit
                      : msg.severity === 'urgent'
                      ? styles.badgeUrg
                      : styles.badgeInfo,
                  ]}
                >
                  <Text style={styles.severityText}>
                    {msg.severity === 'critical'
                      ? '🚨 CRITICAL EMERGENCY'
                      : msg.severity === 'urgent'
                      ? '⚠️ URGENT ADVISORY'
                      : 'ℹ️ PROTOCOL GUIDANCE'}
                  </Text>
                </View>
              )}

              <Text
                style={[
                  styles.msgText,
                  msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText,
                ]}
              >
                {msg.text}
              </Text>

              {/* Warnings Box */}
              {msg.warnings && msg.warnings.length > 0 && (
                <View style={styles.warningsBox}>
                  <Text style={styles.warningsTitle}>⛔ STRICTLY AVOID / WARNINGS:</Text>
                  {msg.warnings.map((w, idx) => (
                    <Text key={idx} style={styles.warningItem}>
                      {w}
                    </Text>
                  ))}
                </View>
              )}

              {/* Step by step list */}
              {msg.steps && msg.steps.length > 0 && (
                <View style={styles.stepsBox}>
                  <Text style={styles.stepsTitle}>📋 STEP-BY-STEP ACTIONS:</Text>
                  {msg.steps.map((st, idx) => (
                    <Text key={idx} style={styles.stepItem}>
                      {st}
                    </Text>
                  ))}
                </View>
              )}

              {/* Action Buttons inside message */}
              {msg.actions && msg.actions.length > 0 && (
                <View style={styles.actionsRow}>
                  {msg.actions.map((act, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.actionBtn,
                        { backgroundColor: act.color || '#2563EB' },
                      ]}
                      onPress={() => handleActionPress(act)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.actionBtnText}>{act.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Text
                style={[
                  styles.timeText,
                  msg.sender === 'user' ? styles.userTimeText : styles.aiTimeText,
                ]}
              >
                {msg.timestamp}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.msgWrapper, styles.msgWrapperAI]}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>🤖</Text>
            </View>
            <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
              <Text style={styles.typingText}>OneHelp AI is analyzing...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Suggestion Chips */}
      <View style={styles.chipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          {sampleChips.map((chip, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.chipBtn}
              onPress={() => handleSendMessage(chip)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Bar */}
      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask in Hindi or English (Offline)..."
          placeholderTextColor="#94A3B8"
          value={inputVal}
          onChangeText={setInputVal}
          onSubmitEditing={() => handleSendMessage()}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendBtn, !inputVal.trim() && styles.sendBtnDisabled]}
          onPress={() => handleSendMessage()}
          disabled={!inputVal.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.sendBtnText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 6,
    marginRight: 8,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  offlineBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  offlineBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
  },
  headerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  telemetryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  telemetryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  telemetryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  dotOnline: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  msgWrapper: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  msgWrapperUser: {
    justifyContent: 'flex-end',
  },
  msgWrapperAI: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  aiAvatarText: {
    fontSize: 18,
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleCritical: {
    borderColor: '#FECACA',
    backgroundColor: '#FFF5F5',
  },
  bubbleUrgent: {
    borderColor: '#FED7AA',
    backgroundColor: '#FFFBEB',
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeCrit: {
    backgroundColor: '#FEE2E2',
  },
  badgeUrg: {
    backgroundColor: '#FEF3C7',
  },
  badgeInfo: {
    backgroundColor: '#E0F2FE',
  },
  severityText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#991B1B',
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMsgText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  aiMsgText: {
    color: '#1E293B',
  },
  warningsBox: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  warningsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#991B1B',
    marginBottom: 4,
  },
  warningItem: {
    fontSize: 12,
    color: '#B91C1C',
    lineHeight: 17,
    marginVertical: 2,
    fontWeight: '600',
  },
  stepsBox: {
    backgroundColor: '#F0FDF4',
    borderLeftWidth: 3,
    borderLeftColor: '#16A34A',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  stepsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
    marginBottom: 4,
  },
  stepItem: {
    fontSize: 12,
    color: '#15803D',
    lineHeight: 18,
    marginVertical: 2,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userTimeText: {
    color: '#BFDBFE',
  },
  aiTimeText: {
    color: '#94A3B8',
  },
  typingBubble: {
    paddingVertical: 10,
  },
  typingText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  chipsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 8,
  },
  chipsScroll: {
    paddingHorizontal: 12,
    gap: 8,
  },
  chipBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
  },
  textInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F8FAFC',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
