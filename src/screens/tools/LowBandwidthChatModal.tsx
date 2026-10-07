import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LowBandwidthChatModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'dispatcher';
  text: string;
  time: string;
  bytes: number;
  deliveryMethod: '2G GPRS' | 'SMS Data Packet' | 'Offline Mesh';
}

export const LowBandwidthChatModal: React.FC<LowBandwidthChatModalProps> = ({
  visible,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'dispatcher',
      text: 'Police Central 112: Signal acquired. We see your coordinates (26.8562, 75.8727). Are you in immediate physical danger?',
      time: '10:02 PM',
      bytes: 78,
      deliveryMethod: 'SMS Data Packet',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Yes, 2 suspicious people following me near JLN Marg. Standing under street light.',
      time: '10:03 PM',
      bytes: 62,
      deliveryMethod: '2G GPRS',
    },
    {
      id: '3',
      sender: 'dispatcher',
      text: 'PCR Patrol Car 14 dispatched. ETA 3 minutes. Stay near visible light. Keep phone volume muted.',
      time: '10:04 PM',
      bytes: 72,
      deliveryMethod: '2G GPRS',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputVal.trim(),
      time: 'Now',
      bytes: Math.round(inputVal.trim().length * 0.9),
      deliveryMethod: '2G GPRS',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      const resp: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'dispatcher',
        text: 'Received via compressed uplink. Unit RJ14 sighted within 500m.',
        time: 'Now',
        bytes: 54,
        deliveryMethod: 'SMS Data Packet',
      };
      setMessages((prev) => [...prev, resp]);
    }, 1800);
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Text style={styles.closeText}>✕ Close</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleCol}>
            <Text style={styles.headerTitle}>Low-Bandwidth 2G Dispatch</Text>
            <View style={styles.badgeRow}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>COMPRESSED 40-BYTE ENCRYPTED LINK</Text>
            </View>
          </View>
          <View style={{ width: 44 }} />
        </View>

        {/* Compression Telemetry Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerItem}>
            <Text style={styles.bannerLabel}>Signal Protocol</Text>
            <Text style={styles.bannerValue}>GSM / 2G EDGE</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.bannerItem}>
            <Text style={styles.bannerLabel}>Compression</Text>
            <Text style={styles.bannerValue}>88.4% Saved</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.bannerItem}>
            <Text style={styles.bannerLabel}>Fallback</Text>
            <Text style={styles.bannerValue}>Auto SMS Binary</Text>
          </View>
        </View>

        {/* Chat Stream */}
        <ScrollView style={styles.chatScroll} contentContainerStyle={styles.chatContent}>
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <View
                key={m.id}
                style={[
                  styles.msgWrapper,
                  isUser ? styles.msgWrapperRight : styles.msgWrapperLeft,
                ]}
              >
                <View
                  style={[
                    styles.msgBubble,
                    isUser ? styles.msgBubbleUser : styles.msgBubbleDispatcher,
                  ]}
                >
                  <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextDisp]}>
                    {m.text}
                  </Text>
                  <View style={styles.msgMetaRow}>
                    <Text style={styles.msgTime}>{m.time}</Text>
                    <Text style={styles.msgBytes}>• {m.bytes} bytes via {m.deliveryMethod}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TextInput
            style={styles.textInput}
            value={inputVal}
            onChangeText={setInputVal}
            placeholder="Type emergency text (optimized for 2G)..."
            placeholderTextColor="#94A3B8"
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputVal.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputVal.trim()}
          >
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  closeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  closeText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  headerTitleCol: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },
  badgeText: {
    color: '#22C55E',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    margin: 12,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  bannerItem: {
    alignItems: 'center',
  },
  bannerLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  bannerValue: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },
  chatScroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  chatContent: {
    paddingVertical: 12,
  },
  msgWrapper: {
    marginBottom: 14,
    maxWidth: '84%',
  },
  msgWrapperLeft: {
    alignSelf: 'flex-start',
  },
  msgWrapperRight: {
    alignSelf: 'flex-end',
  },
  msgBubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  msgBubbleUser: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  msgBubbleDispatcher: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextUser: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  msgTextDisp: {
    color: '#F1F5F9',
    fontWeight: '500',
  },
  msgMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  msgTime: {
    color: '#94A3B8',
    fontSize: 10,
  },
  msgBytes: {
    color: '#64748B',
    fontSize: 10,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
