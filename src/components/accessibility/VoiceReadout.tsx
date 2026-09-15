import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useAccessibilityStore } from '../../store/useAccessibilityStore';

export const VoiceReadout: React.FC<{ text: string }> = ({ text }) => {
  const { voiceReadoutEnabled } = useAccessibilityStore();

  useEffect(() => {
    if (voiceReadoutEnabled && text) {
      // Stub: TTS.speak(text)
    }
  }, [text, voiceReadoutEnabled]);

  return <View />;
};
