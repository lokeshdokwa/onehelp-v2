import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TypographyText } from '../ui/Typography';
import { Button } from '../ui/Button';

export const QRPairingModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TypographyText variant="title" align="center">Scan QR to Pair</TypographyText>
          <View style={styles.qrPlaceholder} />
          <Button title="Close" onPress={onClose} variant="ghost" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: '#FFF', padding: 24, borderRadius: 16, alignItems: 'center' },
  qrPlaceholder: { width: 200, height: 200, backgroundColor: '#EEE', marginVertical: 24 }
});
