import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Dimensions, ViewStyle
} from 'react-native';
import { Colors, Spacing, Radius, Typography, TouchTarget } from '@/constants/tokens';

// ── ScreenContainer ───────────────────────────────────────────────────
interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
}

export function ScreenContainer({ children, scroll = false, style }: ScreenContainerProps) {
  if (scroll) {
    return (
      <ScrollView
        style={[styles.screen, style]}
        contentContainerStyle={styles.screenContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
  return <View style={[styles.screen, style]}>{children}</View>;
}

// ── Section ───────────────────────────────────────────────────────────
interface SectionProps {
  title: string;
  children: React.ReactNode;
  action?: { label: string; onPress: () => void };
}

export function Section({ title, children, action }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>{title}</Text>
        {action && (
          <TouchableOpacity
            onPress={action.onPress}
            style={styles.sectionAction}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.sectionActionText}>{action.label}</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

// ── CardListItem ──────────────────────────────────────────────────────
interface CardListItemProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function CardListItem({ title, subtitle, rightContent, onPress }: CardListItemProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title}${subtitle ? `, ${subtitle}` : ''}`}
    >
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.cardSubtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
      {rightContent && <View style={styles.cardRight}>{rightContent}</View>}
      <View style={styles.cardCaret}>
        <Text style={styles.caretText}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

// ── BottomSheet ───────────────────────────────────────────────────────
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  if (!isOpen) return null;
  return (
    <View style={styles.sheetOverlay}>
      <TouchableOpacity style={styles.sheetBackdrop} onPress={onClose} activeOpacity={1} />
      <View style={styles.sheetPanel}>
        <View style={styles.sheetDragBar} />
        {title && (
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.sheetClose}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  screenContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm + 2,
  },
  sectionLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: Colors.outline,
  },
  sectionAction: {
    backgroundColor: Colors.surfaceVar,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    minHeight: TouchTarget / 2,
    justifyContent: 'center',
  },
  sectionActionText: {
    fontSize: Typography.xs + 1,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 0.5,
    borderColor: Colors.outlineVar,
    minHeight: TouchTarget,
  },
  cardBody: { flex: 1 },
  cardTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    color: Colors.onSurface,
  },
  cardSubtitle: {
    fontSize: Typography.sm,
    color: Colors.onSurface2,
    marginTop: 2,
  },
  cardRight: { marginRight: Spacing.sm },
  cardCaret: { marginLeft: Spacing.sm },
  caretText: { fontSize: 18, color: Colors.outlineVar },
  sheetOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 300,
  },
  sheetBackdrop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheetPanel: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.chrome,
    borderTopLeftRadius: Radius.xxl,
    borderTopRightRadius: Radius.xxl,
    maxHeight: Dimensions.get('window').height * 0.75,
  },
  sheetDragBar: {
    width: 36, height: 4,
    backgroundColor: Colors.outlineVar,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  sheetTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.onSurface,
  },
  sheetClose: {
    fontSize: Typography.md,
    color: Colors.onSurface2,
  },
  sheetScroll: {
    paddingHorizontal: Spacing.xl,
  },
});
