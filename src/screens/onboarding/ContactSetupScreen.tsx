import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useUserStore, EmergencyContact } from '../../store/useUserStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingContactSetup'>;
};

export const ContactSetupScreen: React.FC<Props> = ({ navigation }) => {
  const { emergencyContacts, addEmergencyContact } = useUserStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rel, setRel] = useState('');

  const handleAdd = () => {
    if (name && phone && rel) {
      addEmergencyContact({ id: Date.now().toString(), name, phone, relationship: rel });
      setName(''); setPhone(''); setRel('');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TypographyText variant="title" style={styles.title}>Trusted Contacts</TypographyText>
        <TypographyText variant="caption" style={styles.subtitle}>
          Add at least one person to notify in an emergency. (Max 5)
        </TypographyText>

        <FlatList
          data={emergencyContacts}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <TypographyText style={styles.contactName}>{item.name} ({item.relationship})</TypographyText>
              <TypographyText style={styles.contactPhone}>{item.phone}</TypographyText>
            </View>
          )}
        />

        {emergencyContacts.length < 5 && (
          <View style={styles.form}>
            <TextInput placeholder="Name" placeholderTextColor="#8A90A0" style={styles.input} value={name} onChangeText={setName} />
            <TextInput placeholder="Phone" placeholderTextColor="#8A90A0" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <TextInput placeholder="Relationship" placeholderTextColor="#8A90A0" style={styles.input} value={rel} onChangeText={setRel} />
            <Button title="Add" onPress={handleAdd} variant="secondary" />
          </View>
        )}

        <View style={styles.footer}>
          <Button 
            title={emergencyContacts.length > 0 ? "Continue" : "Skip for now"} 
            onPress={() => navigation.navigate('OnboardingPINSetup')} 
            variant={emergencyContacts.length > 0 ? 'primary' : 'ghost'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { marginBottom: 8 },
  subtitle: { marginBottom: 24, opacity: 0.8 },
  contactItem: {
    backgroundColor: '#1E2230',  // Dark background for each row
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  contactName: {
    color: '#F0F2F5',  // Change to this light color
    fontSize: 16,
    fontWeight: '600',
  },
  contactPhone: {
    color: '#8A90A0',  // Grey for subtitle
    fontSize: 14,
  },
  form: { gap: 12, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#3A3F58', padding: 12, borderRadius: 8, color: '#FFF' },
  footer: { marginTop: 24 },
});
