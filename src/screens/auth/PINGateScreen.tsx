import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { SOSService } from '../../services/SOSService';
import { useSOSStore } from '../../store/useSOSStore';

// In a real app, these hashes would be loaded from Keychain
const MOCK_PIN = '1234';
const MOCK_DURESS = '9999';

export const PINGateScreen: React.FC = () => {
  const [pin, setPin] = useState('');
  const { resolveSOS } = useSOSStore();

  const handleVerify = (val: string) => {
    setPin(val);
    if (val.length >= 4) {
      if (val === MOCK_PIN) {
        SOSService.cancelSOS();
        resolveSOS();
      } else if (val === MOCK_DURESS) {
        // Silently escalate, appear cancelled
        SOSService.triggerSOS('duress_pin', 'police', true);
        Alert.alert("SOS Cancelled", "Emergency mode deactivated."); // Fake alert
        resolveSOS(); // Hide UI
      } else if (val.length === 6) {
        setPin('');
      }
    }
  };

  return (
    <SafeAreaView backgroundColor="#000">
      <View style={styles.container}>
        <TypographyText variant="title" color="#FFF" style={styles.title}>
          Enter PIN to Cancel SOS
        </TypographyText>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          keyboardType="number-pad" 
          maxLength={6} 
          value={pin} 
          onChangeText={handleVerify}
          autoFocus 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { marginBottom: 24 },
  input: { backgroundColor: '#333', color: '#FFF', padding: 16, borderRadius: 8, fontSize: 24, letterSpacing: 12, textAlign: 'center', width: '100%' },
});
