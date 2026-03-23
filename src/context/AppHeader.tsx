import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AppHeaderProps {
  rightActions?: React.ReactNode;
}

export function AppHeader({ rightActions }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wordmark}>
        <Text style={styles.thin}>hälso</Text>
        <Text style={styles.bold}>Pilot</Text>
      </View>
      {rightActions && (
        <View style={styles.actions}>
          {rightActions}
        </View>
      )}
    </View>
  );
}

export function HeaderIconButton({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconBtn} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E4DD',
    backgroundColor: '#FFFFFF',
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  thin: {
    fontSize: 22,
    fontWeight: '200',
    color: '#1C1B1A',
    letterSpacing: -0.5,
  },
  bold: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3D7A8A',
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
