import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TOOLS = [
  { icon: 'alarm-light', label: 'Siren', action: () => Alert.alert('Siren', 'Siren activated!') },
  { icon: 'video', label: 'Record', action: () => Alert.alert('Record', 'Recording started.') },
  { icon: 'phone', label: 'Fake Call', action: () => Alert.alert('Fake Call', 'Incoming call in 5s...') },
  { icon: 'flashlight', label: 'Morse', action: () => Alert.alert('Morse Flash', 'SOS morse code flashing.') },
];

export const QuickToolsRow: React.FC = () => {
  return (
    <View style={styles.container}>
      {TOOLS.map((tool) => (
        <ToolButton key={tool.label} icon={tool.icon} label={tool.label} onPress={tool.action} />
      ))}
    </View>
  );
};

const ToolButton = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.tool} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconCircle}>
      <Icon name={icon} size={22} color="#FFF" />
    </View>
    <TypographyText variant="caption" style={styles.label}>
      {label}
    </TypographyText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tool: { alignItems: 'center', gap: 6 },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#457B9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 11, fontWeight: '600' },
});
