import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '@/constants/tokens';

interface HeaderAction {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
}

interface AppHeaderProps {
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
  actions?: HeaderAction[];
}

export function AppHeader({ showBack, title, onBack, actions }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      {showBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.backBtn}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backChevron}>‹</Text>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.wordmark}>
          <Text style={styles.wm}>
            <Text style={styles.wmThin}>hälso</Text>
            <Text style={styles.wmBold}>Pilot</Text>
          </Text>
        </View>
      )}

      {title && showBack && (
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      )}

      <View style={styles.actions}>
        {actions?.map((action, i) => (
          <TouchableOpacity
            key={i}
            onPress={action.onPress}
            style={styles.iconBtn}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={action.accessibilityLabel}
          >
            {action.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.chrome,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.chromeBorder,
  },
  wordmark: { flex: 1 },
  wm: { fontSize: 22, letterSpacing: -0.5 },
  wmThin: { fontWeight: '200', color: Colors.onSurface },
  wmBold: { fontWeight: '600', color: Colors.primary },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backChevron: {
    fontSize: 24,
    color: Colors.primary,
    marginRight: 2,
  },
  backLabel: {
    fontSize: Typography.lg,
    color: Colors.primary,
    fontWeight: Typography.regular,
  },
  title: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.onSurface,
    position: 'absolute',
    left: 0, right: 0,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  iconBtn: {
    width: 34, height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
