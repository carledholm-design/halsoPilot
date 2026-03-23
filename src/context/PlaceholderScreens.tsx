import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PlaceholderScreen({ title, icon, sub }: { title: string; icon: string; sub: string }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  );
}

export function HealthScreen() {
  return <PlaceholderScreen title="Health" icon="📊" sub="Conditions, labs, care team" />;
}

export function MedsScreen() {
  return <PlaceholderScreen title="Meds" icon="💊" sub="Medications, supplements, interactions" />;
}

export function VitalsScreen() {
  return <PlaceholderScreen title="Vitals" icon="❤️" sub="Blood pressure, heart rate, weight" />;
}

export function WalletScreen() {
  return <PlaceholderScreen title="Wallet" icon="💳" sub="Insurance, FSA/HSA, Emergency Card" />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#EDEAE3',
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1C1B1A',
  },
  sub: {
    fontSize: 14,
    color: '#524F4A',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
