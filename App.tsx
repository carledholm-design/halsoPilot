import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { AppHeader, HeaderIconButton } from '@/components/shared/AppHeader';
import { BottomNav } from '@/components/shared/BottomNav';
import { ToastContainer } from '@/components/shared/Toast';
import { TodayScreen } from '@/screens/TodayScreen';
import {
  HealthScreen, MedsScreen, VitalsScreen, WalletScreen
} from '@/screens/PlaceholderScreens';
import type { NavTab } from '@/constants/tokens';

function AppInner() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<NavTab>('Today');
  const insets = useSafeAreaInsets();

  const renderScreen = () => {
    switch (activeTab) {
      case 'Today':  return <TodayScreen onNavigate={setActiveTab} />;
      case 'Health': return <HealthScreen onNavigate={setActiveTab} />;
      case 'Meds':   return <MedsScreen onNavigate={setActiveTab} />;
      case 'Vitals': return <VitalsScreen onNavigate={setActiveTab} />;
      case 'Wallet': return <WalletScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.chrome}
      />

      {/* App header — always visible */}
      <AppHeader
        rightActions={
          <HeaderIconButton onPress={toggleTheme}>
            <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{
                width: 14, height: 14, borderRadius: 7,
                backgroundColor: isDark ? colors.primary : 'transparent',
                borderWidth: 1.5,
                borderColor: colors.onSurface2,
              }} />
            </View>
          </HeaderIconButton>
        }
      />

      {/* Screen content */}
      <View style={styles.screenArea}>
        {renderScreen()}
      </View>

      {/* Bottom nav — always visible */}
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Toast overlay */}
      <ToastContainer />
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppInner />
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  screenArea: {
    flex: 1,
    overflow: 'hidden',
  },
});
