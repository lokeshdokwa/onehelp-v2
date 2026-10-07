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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../../components/ui/Icons';
import { OfflineAIService, AIResponseMessage, LLMStatus } from '../../services/OfflineAIService';

interface AIAssistantScreenProps {
  onBack: () => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AIResponseMessage[]>([]);
  const [llmStatus, setLlmStatus] = useState<LLMStatus>('unloaded');

  const sampleChips = [
    'Snake bite first-aid',
    'How to do CPR?',
    'LPG cylinder leak',
    'Someone is following me',
    'Stop bleeding',
    'Dog bite rabies',
  ];

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 'welcome_1',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Namaste! Main OneHelp ka On-Device AI Assistant hoon.\n\nMain aapke phone ke processor par 100% offline (Hugging Face SmolLM2 engine) par chalta hoon (bina kisi internet ke). Kisi bhi medical emergency, first-aid, disaster ya personal safety ke baare me aap mujhse seedha pooch sakte hain.`,
      },
    ]);

    // Listen to Hugging Face LLM status
    const unsub = OfflineAIService.addStatusListener((status) => {
      setLlmStatus(status);
    });

    // Initialize Hugging Face model in background
    OfflineAIService.initModel();

    return unsub;
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
    }, 80);

    const replyMsgId = (Date.now() + 1).toString();
    let hasStreamedToken = false;

    try {
      const aiReply = await OfflineAIService.processQuery(text, (token) => {
        if (!hasStreamedToken) {
          hasStreamedToken = true;
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: replyMsgId,
              sender: 'ai',
              text: token,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isStreaming: true,
            },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === replyMsgId ? { ...m, text: m.text + token } : m))
          );
        }
        scrollViewRef.current?.scrollToEnd({ animated: false });
      });

      if (!hasStreamedToken) {
        setIsTyping(false);
        setMessages((prev) => [...prev, aiReply]);
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === replyMsgId ? { ...m, text: aiReply.text, isStreaming: false } : m))
        );
      }
    } catch {
      setIsTyping(false);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getStatusSubtitle = () => {
    switch (llmStatus) {
      case 'ready':
        return 'SmolLM2 (Hugging Face) • On-Device';
      case 'loading':
        return 'Loading SmolLM2 (Hugging Face)...';
      case 'error':
      default:
        return 'On-Device AI • 100% Offline';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Clean Modern Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeftIcon size={22} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>OneHelp Assistant</Text>
          <View style={styles.headerSubRow}>
            <View
              style={[
                styles.statusDot,
                llmStatus === 'loading'
                  ? styles.statusDotLoading
                  : styles.statusDotReady,
              ]}
            />
            <Text style={styles.headerSub}>{getStatusSubtitle()}</Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
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
              styles.msgRow,
              msg.sender === 'user' ? styles.msgRowUser : styles.msgRowAI,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.msgText,
                  msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText,
                ]}
              >
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  msg.sender === 'user' ? styles.userTimestamp : styles.aiTimestamp,
                ]}
              >
                {msg.timestamp}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.msgRow, styles.msgRowAI]}>
            <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
              <Text style={styles.typingText}>OneHelp is thinking...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggestion Chips */}
      <View style={styles.chipsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          {sampleChips.map((chip, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.chip}
              onPress={() => handleSendMessage(chip)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Clean Bottom Input Bar */}
      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask in Hindi or English (Offline)..."
            placeholderTextColor="#94A3B8"
            value={inputVal}
            onChangeText={setInputVal}
            onSubmitEditing={() => handleSendMessage()}
            returnKeyType="send"
          />
        </View>
        <TouchableOpacity
          style={[styles.sendBtn, !inputVal.trim() && styles.sendBtnDisabled]}
          onPress={() => handleSendMessage()}
          disabled={!inputVal.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.sendIcon}>➤</Text>
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
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusDotReady: {
    backgroundColor: '#16A34A',
  },
  statusDotLoading: {
    backgroundColor: '#EAB308',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  msgRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  msgRowAI: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
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
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  msgText: {
    fontSize: 14.5,
    lineHeight: 22,
  },
  userMsgText: {
    color: '#FFFFFF',
    fontWeight: '400',
  },
  aiMsgText: {
    color: '#1E293B',
    fontWeight: '400',
  },
  timestamp: {
    fontSize: 10.5,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  aiTimestamp: {
    color: '#94A3B8',
  },
  typingBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  typingText: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
  },
  chipsRow: {
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  chipsScroll: {
    paddingHorizontal: 14,
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 4,
  },
  input: {
    fontSize: 14,
    color: '#0F172A',
    minHeight: 38,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.5,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
