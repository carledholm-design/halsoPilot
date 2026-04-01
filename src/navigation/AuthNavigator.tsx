import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BiometricLockScreen,
  PINScreen,
  SignInScreen,
  SignUpScreen,
  ResetPasswordScreen,
} from '../screens/Placeholders';
import type { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BiometricLock"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="BiometricLock" component={BiometricLockScreen} />
      <Stack.Screen name="PIN"           component={PINScreen}           />
      <Stack.Screen name="SignIn"        component={SignInScreen}        />
      <Stack.Screen name="SignUp"        component={SignUpScreen}        />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
