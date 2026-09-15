import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useLocationStore } from '../../store/useLocationStore';

export const TrackMeSetupModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [duration, setDuration] = useState('30');
  const { startTrackMe } = useLocationStore();

  const handleStart = () => {
    const mins = parseInt(duration, 10) || 30;
    startTrackMe({ lat: 0, lng: 0, label: 'Custom' }, Date.now() + mins * 60000);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TypographyText variant="title">Track Me</TypographyText>
          <TypographyText variant="caption" style={styles.desc}>
            Automatically triggers SOS if you don't arrive or disable within the time limit.
          </TypographyText>
          
          <TextInput 
            style={styles.input} 
            keyboardType="number-pad" 
            value={duration} 
            onChangeText={setDuration} 
            placeholder="Duration (minutes)" 
          />
          
          <View style={styles.row}>
            <Button title="Cancel" variant="ghost" onPress={onClose} style={{ flex: 1 }} />
            <Button title="Start" variant="primary" onPress={handleStart} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#FFF', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  desc: { marginTop: 8, marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 16, borderRadius: 8, marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12 },
});
