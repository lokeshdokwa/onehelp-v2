import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export const MedicalDossierForm: React.FC = () => {
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('Penicillin');
  const [medications, setMedications] = useState('');
  const [conditions, setConditions] = useState('');

  const handleSave = () => {
    // Encrypts and saves to keychain in full implementation
  };

  return (
    <ScrollView style={styles.container}>
      <TypographyText variant="body" style={styles.desc}>
        This data is encrypted on your device. It is ONLY sent to dispatchers when you trigger an SOS.
      </TypographyText>
      
      <View style={styles.formGroup}>
        <TypographyText variant="caption">Blood Group</TypographyText>
        <TextInput style={styles.input} value={bloodGroup} onChangeText={setBloodGroup} />
      </View>

      <View style={styles.formGroup}>
        <TypographyText variant="caption">Known Allergies</TypographyText>
        <TextInput style={styles.input} value={allergies} onChangeText={setAllergies} />
      </View>

      <View style={styles.formGroup}>
        <TypographyText variant="caption">Current Medications</TypographyText>
        <TextInput style={styles.input} value={medications} onChangeText={setMedications} />
      </View>

      <View style={styles.formGroup}>
        <TypographyText variant="caption">Chronic Conditions</TypographyText>
        <TextInput style={styles.input} value={conditions} onChangeText={setConditions} />
      </View>

      <Button title="Encrypt & Save" onPress={handleSave} style={styles.btn} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  desc: { marginBottom: 24, opacity: 0.8 },
  formGroup: { marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginTop: 8 },
  btn: { marginTop: 24 }
});
