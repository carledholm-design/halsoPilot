import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SectionRow } from '../components/shared/SectionRow';

const CONDITIONS = [
  { id: 'c1', name: 'Rheumatoid Arthritis', color: '#3D7A8A' },
  { id: 'c2', name: "Hashimoto's", color: '#4A7C5F' },
  { id: 'c3', name: 'Fibromyalgia', color: '#7A6444' },
];

const TODAY_MEDS = [
  { id: 'm1', name: 'Methotrexate', dose: '15mg', time: '8:00 AM', taken: false },
  { id: 'm2', name: 'Levothyroxine', dose: '88mcg', time: '6:30 AM', taken: true },
  { id: 'm3', name: 'Vitamin D3', dose: '2000IU', time: '8:00 AM', taken: false },
];

const APPOINTMENTS = [
  { id: 'a1', title: 'Rheumatology Follow-up', time: '2:30 PM', location: 'NYU Langone', color: '#3D7A8A' },
  { id: 'a2', title: 'Blood Work · CBC Panel', time: '4:00 PM', location: '65th St', color: '#4A7C5F' },
];

const REFILLS = [
  { id: 'r1', name: 'Methotrexate', dose: '15mg', daysLeft: 3, pharmacy: 'CVS · 72nd St', urgent: true },
  { id: 'r2', name: 'Levothyroxine', dose: '88mcg', daysLeft: 7, pharmacy: 'Walgreens · 5th Ave', urgent: false },
];

const MOODS = ['😣','😔','😐','🙂','😊'];

interface TodayScreenProps {
  onNavigate: (tab: string) => void;
}

export function TodayScreen({ onNavigate }: TodayScreenProps) {
  const [takenMeds, setTakenMeds] = useState<Set<string>>(new Set(['m2']));
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.pageHeader}>
        <View>
          <Text style={styles.greeting}>{greeting}, Alex</Text>
          <Text style={styles.dateStr}>{dateStr}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AP</Text>
        </View>
      </View>

      {/* AI Insight */}
      <TouchableOpacity style={styles.insightCard} activeOpacity={0.85}>
        <Text style={styles.insightTag}>✦  AI Insight · this week</Text>
        <Text style={styles.insightText}>
          Your pain has been moderate for 9 days, coinciding with your Methotrexate dose increase on March 4th.
        </Text>
        <Text style={styles.insightAction}>Worth mentioning at today's appointment ›</Text>
      </TouchableOpacity>

      {/* Check-in */}
      {!checkedIn ? (
        <View style={styles.checkinCard}>
          <Text style={styles.checkinTitle}>Daily check-in</Text>
          <Text style={styles.checkinSub}>How are you feeling today?</Text>
          <Text style={styles.checkinLabel}>MOOD</Text>
          <View style={styles.moodRow}>
            {MOODS.map((m, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedMood(i)}
                style={[styles.moodBtn, selectedMood === i && styles.moodBtnSel]}>
                <Text style={styles.moodEmoji}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.checkinLabel}>PAIN LEVEL</Text>
          <View style={styles.painRow}>
            {[1,2,3,4,5,6,7,8,9,10].map(p => (
              <TouchableOpacity key={p} onPress={() => setSelectedPain(p)}
                style={[styles.painBtn, { backgroundColor: selectedPain === p ? '#BA1A1A' : '#E4E0D8' }]}>
                <Text style={[styles.painNum, { color: selectedPain === p ? '#fff' : '#524F4A' }]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.checkinBtn}
            onPress={() => { if (selectedMood !== null && selectedPain !== null) setCheckedIn(true); }}>
            <Text style={styles.checkinBtnText}>Log check-in</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.checkinDone}>
          <Text style={styles.checkinDoneText}>✓ Checked in · {MOODS[selectedMood!]} mood · {selectedPain}/10 pain</Text>
        </View>
      )}

      {/* Conditions */}
      <SectionRow label="Active conditions" actionLabel="See all" onAction={() => onNavigate('Health')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.condStrip}>
          {CONDITIONS.map(c => (
            <View key={c.id} style={[styles.condPill, { backgroundColor: c.color + '22' }]}>
              <View style={[styles.condDot, { backgroundColor: c.color }]} />
              <Text style={[styles.condName, { color: c.color }]}>{c.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Meds */}
      <SectionRow label="Today's medications" actionLabel="All meds" onAction={() => onNavigate('Meds')} />
      {TODAY_MEDS.map(med => {
        const taken = takenMeds.has(med.id);
        return (
          <View key={med.id} style={[styles.card, { opacity: taken ? 0.5 : 1 }]}>
            <View style={styles.cardLeft}>
              <View style={styles.cardIcon}><Text>💊</Text></View>
              <View>
                <Text style={styles.cardTitle}>{med.name}</Text>
                <Text style={styles.cardSub}>{med.dose} · {med.time}</Text>
              </View>
            </View>
            {!taken ? (
              <TouchableOpacity style={styles.takenBtn}
                onPress={() => setTakenMeds(prev => new Set([...prev, med.id]))}>
                <Text style={styles.takenBtnText}>Taken ✓</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.takenBadge}>✓ Taken</Text>
            )}
          </View>
        );
      })}

      {/* Appointments */}
      <SectionRow label="Upcoming appointments" actionLabel="Calendar" onAction={() => onNavigate('Health')} />
      {APPOINTMENTS.map(appt => (
        <View key={appt.id} style={styles.card}>
          <View style={[styles.apptAccent, { backgroundColor: appt.color }]} />
          <View style={styles.cardLeft}>
            <View>
              <Text style={styles.cardTitle}>{appt.title}</Text>
              <Text style={styles.cardSub}>{appt.time} · {appt.location}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Refills */}
      <SectionRow label="Refill reminders" actionLabel="All meds" onAction={() => onNavigate('Meds')} />
      {REFILLS.map(refill => (
        <View key={refill.id} style={[styles.card, { backgroundColor: refill.urgent ? '#FFDAD6' : '#F6F3EE', borderColor: refill.urgent ? '#BA1A1A' : '#CAC6BE' }]}>
          <View style={styles.cardLeft}>
            <View>
              <Text style={styles.cardTitle}>{refill.name} {refill.dose}</Text>
              <Text style={[styles.cardSub, { color: refill.urgent ? '#BA1A1A' : '#524F4A' }]}>
                {refill.urgent ? `⚠ ${refill.daysLeft} days left` : `${refill.daysLeft} days left`} · {refill.pharmacy}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.orderBtnText}>Order</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EDEAE3' },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 120 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  greeting: { fontSize: 24, fontWeight: '300', color: '#1C1B1A' },
  dateStr: { fontSize: 13, color: '#524F4A', marginTop: 2 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#C2E8F0', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '600', color: '#3D7A8A' },
  insightCard: { borderRadius: 24, padding: 18, backgroundColor: '#C2E8F0', marginBottom: 12 },
  insightTag: { fontSize: 11, fontWeight: '600', color: '#3D7A8A', marginBottom: 8 },
  insightText: { fontSize: 14, lineHeight: 22, color: '#1C1B1A', marginBottom: 10 },
  insightAction: { fontSize: 12, fontWeight: '600', color: '#3D7A8A' },
  checkinCard: { borderRadius: 20, padding: 18, borderWidth: 0.5, borderColor: '#CAC6BE', backgroundColor: '#F6F3EE', marginBottom: 4 },
  checkinTitle: { fontSize: 16, fontWeight: '600', color: '#1C1B1A', marginBottom: 4 },
  checkinSub: { fontSize: 13, color: '#524F4A', marginBottom: 16 },
  checkinLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: '#918E87', marginBottom: 8 },
  moodRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  moodBtn: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 12, borderWidth: 1.5, borderColor: 'transparent', backgroundColor: '#E4E0D8' },
  moodBtnSel: { backgroundColor: '#C2E8F0', borderColor: '#3D7A8A' },
  moodEmoji: { fontSize: 22 },
  painRow: { flexDirection: 'row', gap: 4, marginBottom: 20, flexWrap: 'wrap' },
  painBtn: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  painNum: { fontSize: 12, fontWeight: '600' },
  checkinBtn: { borderRadius: 100, padding: 14, alignItems: 'center', backgroundColor: '#3D7A8A' },
  checkinBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  checkinDone: { borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: '#CAC6BE', marginBottom: 4, alignItems: 'center', backgroundColor: '#C5EAD3' },
  checkinDoneText: { fontSize: 13, fontWeight: '500', color: '#4A7C5F' },
  condStrip: { flexDirection: 'row', gap: 8, paddingBottom: 4 },
  condPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 100 },
  condDot: { width: 7, height: 7, borderRadius: 4 },
  condName: { fontSize: 13, fontWeight: '500' },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 14, borderWidth: 0.5, borderColor: '#CAC6BE', marginBottom: 8, gap: 12, backgroundColor: '#F6F3EE' },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: '#C2E8F0', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 14, fontWeight: '500', color: '#1C1B1A' },
  cardSub: { fontSize: 12, color: '#524F4A', marginTop: 2 },
  takenBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, backgroundColor: '#C5EAD3' },
  takenBtnText: { fontSize: 12, fontWeight: '600', color: '#4A7C5F' },
  takenBadge: { fontSize: 12, fontWeight: '600', color: '#4A7C5F' },
  apptAccent: { width: 4, borderRadius: 2, position: 'absolute', left: 0, top: 0, bottom: 0 },
  orderBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, backgroundColor: '#C5EAD3' },
  orderBtnText: { fontSize: 12, fontWeight: '600', color: '#4A7C5F' },
});
