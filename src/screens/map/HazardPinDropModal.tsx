import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useHazardStore } from '../../store/useHazardStore';

export const HazardPinDropModal: React.FC<{ visible: boolean; onClose: () => void, lat: number, lng: number }> = ({ visible, onClose, lat, lng }) => {
  const [desc, setDesc] = useState('');
  const { addHazard } = useHazardStore();

  const handleDrop = () => {
    addHazard({
      id: Date.now().toString(),
      latitude: lat,
      longitude: lng,
      type: 'flood', // hardcoded for now
      description: desc,
      photoPath: '',
      createdAt: Date.now(),
      expiresAt: Date.now() + 86400000,
      verifiedCount: 1,
      reportedBy: 'me'
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TypographyText variant="title">Report Hazard</TypographyText>
          <TextInput 
            style={styles.input} 
            value={desc} 
            onChangeText={setDesc} 
            placeholder="Describe the danger (e.g. Live wire)" 
            multiline
          />
          <View style={styles.row}>
            <Button title="Cancel" variant="ghost" onPress={onClose} style={{ flex: 1 }} />
            <Button title="Report" variant="primary" onPress={handleDrop} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: '#FFF', padding: 24, borderRadius: 16 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 16, borderRadius: 8, marginVertical: 24, height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 12 },
});
