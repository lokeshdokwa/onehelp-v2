import React, { useState } from 'react';
import { View, StyleSheet, Modal, Image, ActivityIndicator, Alert } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export const LostChildScannerModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // Simulate AI vector search over missing_children table
    setTimeout(() => {
      setScanning(false);
      Alert.alert('No Match Found', 'This child is not currently in the national missing children database.');
      onClose();
    }, 2000);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TypographyText variant="title">Lost Child Scanner</TypographyText>
          <TypographyText variant="caption" style={styles.desc}>
            Use on-device facial recognition against the national missing children database.
          </TypographyText>
          
          <View style={styles.cameraPlaceholder}>
            {scanning ? (
              <ActivityIndicator size="large" color="#E63946" />
            ) : (
              <TypographyText variant="caption" align="center">Camera View</TypographyText>
            )}
          </View>
          
          <View style={styles.row}>
            <Button title="Cancel" variant="ghost" onPress={onClose} style={{ flex: 1 }} />
            <Button title="Scan Face" variant="primary" onPress={handleScan} style={{ flex: 1 }} isLoading={scanning} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: '#FFF', padding: 24, borderRadius: 16 },
  desc: { marginTop: 8, marginBottom: 24 },
  cameraPlaceholder: { height: 200, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12 },
});
