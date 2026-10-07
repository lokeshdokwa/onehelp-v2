import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ShieldPlusIcon } from './Icons';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  lightText?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showTagline = false,
  lightText = false,
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'md' ? 36 : 56;
  const fontSize = size === 'sm' ? 18 : size === 'md' ? 26 : 38;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ShieldPlusIcon size={iconSize} color="#DC2626" />
        <Text style={[styles.title, { fontSize, color: lightText ? '#FFFFFF' : '#0F172A' }]}>
          OneHelp
        </Text>
      </View>
      {showTagline && (
        <Text style={[styles.tagline, { color: lightText ? 'rgba(255,255,255,0.8)' : '#64748B' }]}>
          Real Help in Emergency
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
