import React from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export const LowBandwidthChat: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: '1', text: 'I am safe.', time: '10:00 AM' }]}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.msg}>
            <TypographyText variant="body">{item.text}</TypographyText>
          </View>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Short message..." maxLength={140} />
        <Button title="Send" variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  msg: { padding: 12, backgroundColor: '#E0F7FA', margin: 12, borderRadius: 8, alignSelf: 'flex-start' },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: '#DDD', backgroundColor: '#FFF' },
  input: { flex: 1, borderWidth: 1, borderColor: '#DDD', borderRadius: 20, paddingHorizontal: 16, marginRight: 12 },
});
