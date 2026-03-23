import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useToast, type ToastMessage, type ToastType } from '../../context/ToastContext';

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </View>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: () => void }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, []);

  const bg: Record<ToastType, string> = {
    success: '#C5EAD3',
    info:    '#C2E8F0',
    warning: '#FEF3C7',
    error:   '#FFDAD6',
  };

  const accent: Record<ToastType, string> = {
    success: '#4A7C5F',
    info:    '#3D7A8A',
    warning: '#B45309',
    error:   '#BA1A1A',
  };

  return (
    <Animated.View style={[
      styles.toast,
      { backgroundColor: bg[toast.type] },
      {
        opacity: anim,
        transform: [{
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-14, 0],
          }),
        }],
      },
    ]}>
      <View style={[styles.dot, { backgroundColor: accent[toast.type] }]} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: accent[toast.type] }]}>{toast.title}</Text>
        {toast.message ? (
          <Text style={styles.msg}>{toast.message}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={styles.close}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    left: 16,
    right: 16,
    zIndex: 999,
    gap: 8,
  },
  toast: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
  },
  msg: {
    fontSize: 12,
    color: '#524F4A',
    marginTop: 1,
  },
  close: {
    fontSize: 18,
    color: '#918E87',
    padding: 4,
  },
});
