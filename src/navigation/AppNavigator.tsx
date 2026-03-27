import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import { Colors, Typography } from '@/constants/tokens';
import {
  TodayScreen,
  VitalsScreen,
} from '@/screens/Placeholders';
import { HealthNavigator } from './HealthNavigator';
import { MedsNavigator, WalletNavigator } from './Navigators';
import type { AppTabParamList } from '@/types';

const Tab = createBottomTabNavigator<AppTabParamList>();

const TAB_ICONS: Record<string, string> = {
  Today:  '⌂',
  Health: '♥',
  Meds:   '⬡',
  Vitals: '〜',
  Wallet: '▭',
};

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.outline,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>
            {TAB_ICONS[route.name] ?? '•'}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Today"  component={TodayScreen}    options={{ title: 'Today'  }} />
      <Tab.Screen name="Health" component={HealthNavigator} options={{ title: 'Health' }} />
      <Tab.Screen name="Meds"   component={MedsNavigator}  options={{ title: 'Meds'   }} />
      <Tab.Screen name="Vitals" component={VitalsScreen}   options={{ title: 'Vitals' }} />
      <Tab.Screen name="Wallet" component={WalletNavigator} options={{ title: 'Wallet' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.chrome,
    borderTopWidth: 0.5,
    borderTopColor: Colors.chromeBorder,
    height: 84,
    paddingBottom: 24,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
});
