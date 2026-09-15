import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TypographyText } from '../ui/Typography';

export const CancelBanner: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [timeLeft]);

  if (timeLeft === 0) return null;

  return (
    <View style={styles.container}>
      <TypographyText variant="body" color="#FFF">Dispatching in {timeLeft}s...</TypographyText>
      <TouchableOpacity onPress={onCancel} style={styles.btn}>
        <TypographyText variant="body" color="#E63946">CANCEL</TypographyText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 50, left: 24, right: 24, backgroundColor: '#333', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 1001 },
  btn: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
});
