import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ConditionsScreen,
  ConditionDetailScreen,
  CareTeamScreen,
  LabsScreen,
  AppointmentsScreen,
} from '../screens/Placeholders';
import type { HealthStackParamList } from '../types';

const Stack = createNativeStackNavigator<HealthStackParamList>();

export function HealthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Conditions"      component={ConditionsScreen}      />
      <Stack.Screen name="ConditionDetail" component={ConditionDetailScreen} />
      <Stack.Screen name="CareTeam"        component={CareTeamScreen}        />
      <Stack.Screen name="Labs"            component={LabsScreen}            />
      <Stack.Screen name="Appointments"    component={AppointmentsScreen}    />
    </Stack.Navigator>
  );
}
