import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export const FeedbackModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [rating, setRating] = useState('5');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // In reality, this updates the audit_logs table with response_rating
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TypographyText variant="title">Rate Emergency Response</TypographyText>
          <TypographyText variant="caption" style={styles.desc}>
            Help us audit response times and effectiveness.
          </TypographyText>
          
          <TextInput 
            style={styles.input} 
            keyboardType="number-pad" 
            value={rating} 
            onChangeText={setRating} 
            placeholder="Rating (1-5)" 
            maxLength={1}
          />
          <TextInput 
            style={styles.inputMulti} 
            value={notes} 
            onChangeText={setNotes} 
            placeholder="Any notes about the response?" 
            multiline
          />
          
          <View style={styles.row}>
            <Button title="Skip" variant="ghost" onPress={onClose} style={{ flex: 1 }} />
            <Button title="Submit" variant="primary" onPress={handleSubmit} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: '#FFF', padding: 24, borderRadius: 16 },
  desc: { marginTop: 8, marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 16, borderRadius: 8, marginBottom: 12 },
  inputMulti: { borderWidth: 1, borderColor: '#DDD', padding: 16, borderRadius: 8, marginBottom: 24, height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 12 },
});
