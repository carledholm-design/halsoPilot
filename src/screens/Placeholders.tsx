import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../constants/tokens';

function Placeholder({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  );
}

export function TodayScreen()          { return <Placeholder name="Today" />; }
export function ConditionsScreen()     { return <Placeholder name="Conditions" />; }
export function ConditionDetailScreen(){ return <Placeholder name="Condition Detail" />; }
export function CareTeamScreen()       { return <Placeholder name="Care Team" />; }
export function LabsScreen()           { return <Placeholder name="Labs" />; }
export function AppointmentsScreen()   { return <Placeholder name="Appointments" />; }
export function MedsScreen()           { return <Placeholder name="Meds" />; }
export function MedDetailScreen()      { return <Placeholder name="Med Detail" />; }
export function VitalsScreen()         { return <Placeholder name="Vitals" />; }
export function CardListScreen()       { return <Placeholder name="Wallet" />; }
export function CardDetailScreen()     { return <Placeholder name="Card Detail" />; }
export function EmergencyCardScreen()  { return <Placeholder name="Emergency Card" />; }
export function OnboardingScreen()     { return <Placeholder name="Onboarding" />; }
export function BiometricLockScreen()  { return <Placeholder name="Biometric Lock" />; }
export function PINScreen()            { return <Placeholder name="PIN" />; }
export function SignInScreen()         { return <Placeholder name="Sign In" />; }
export function SignUpScreen()         { return <Placeholder name="Sign Up" />; }
export function ResetPasswordScreen()  { return <Placeholder name="Reset Password" />; }

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.bg },
  text: { fontSize: Typography.xxl, fontWeight: '300', color: Colors.onSurface, marginBottom: 8 },
  sub:  { fontSize: Typography.md, color: Colors.outline },
});
