import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MedsScreen,
  MedDetailScreen,
  CardListScreen,
  CardDetailScreen,
  EmergencyCardScreen,
  OnboardingScreen,
} from '@/screens/Placeholders';
import type { MedsStackParamList, WalletStackParamList } from '@/types';

// ── Meds ──────────────────────────────────────────────────────────────
const MedsStack = createNativeStackNavigator<MedsStackParamList>();

export function MedsNavigator() {
  return (
    <MedsStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <MedsStack.Screen name="MedsList"  component={MedsScreen}      />
      <MedsStack.Screen name="MedDetail" component={MedDetailScreen} />
    </MedsStack.Navigator>
  );
}

// ── Wallet ────────────────────────────────────────────────────────────
const WalletStack = createNativeStackNavigator<WalletStackParamList>();

export function WalletNavigator() {
  return (
    <WalletStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <WalletStack.Screen name="CardList"      component={CardListScreen}      />
      <WalletStack.Screen name="CardDetail"    component={CardDetailScreen}    />
      <WalletStack.Screen name="EmergencyCard" component={EmergencyCardScreen} />
    </WalletStack.Navigator>
  );
}

// ── Onboarding ────────────────────────────────────────────────────────
export function OnboardingNavigator() {
  return <OnboardingScreen />;
}
