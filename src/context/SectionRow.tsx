import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SectionRowProps {
  label: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionRow({ label, actionLabel, onAction }: SectionRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          style={styles.actionBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionLabel} ›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#918E87',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4E0D8',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3D7A8A',
  },
});
