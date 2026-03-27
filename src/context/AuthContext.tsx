import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

// HIPAA: All auth state. Never log user identifiers.

interface AuthState {
  isAuthenticated: boolean;
  isLocked: boolean;
  userId: string | null;
  hasBiometrics: boolean;
  hasPin: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<boolean>;
  authenticateWithPin: (pin: string) => Promise<boolean>;
  setPin: (pin: string) => Promise<void>;
  lock: () => void;
  unlock: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLocked: true,
    userId: null,
    hasBiometrics: false,
    hasPin: false,
  });

  useEffect(() => {
    checkBiometrics();
    checkPin();
  }, []);

  const checkBiometrics = async () => {
    const available = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setState(s => ({ ...s, hasBiometrics: available && enrolled }));
  };

  const checkPin = async () => {
    const pin = await SecureStore.getItemAsync('halsopilot_pin');
    setState(s => ({ ...s, hasPin: !!pin }));
  };

  const authenticateWithBiometrics = useCallback(async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Access your health data',
        cancelLabel: 'Use PIN',
        fallbackLabel: 'Use PIN',
        disableDeviceFallback: false,
      });
      if (result.success) {
        setState(s => ({ ...s, isLocked: false }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const authenticateWithPin = useCallback(async (pin: string): Promise<boolean> => {
    const stored = await SecureStore.getItemAsync('halsopilot_pin');
    if (stored === pin) {
      setState(s => ({ ...s, isLocked: false }));
      return true;
    }
    return false;
  }, []);

  const setPin = useCallback(async (pin: string) => {
    await SecureStore.setItemAsync('halsopilot_pin', pin);
    setState(s => ({ ...s, hasPin: true }));
  }, []);

  const signIn = useCallback(async (_email: string, _password: string) => {
    // Firebase auth wired in Phase 2
    setState(s => ({ ...s, isAuthenticated: true, isLocked: false, userId: 'placeholder' }));
  }, []);

  const signUp = useCallback(async (_email: string, _password: string, _name: string) => {
    // Firebase auth wired in Phase 2
    setState(s => ({ ...s, isAuthenticated: true, isLocked: false, userId: 'placeholder' }));
  }, []);

  const signOut = useCallback(async () => {
    setState(s => ({ ...s, isAuthenticated: false, isLocked: true, userId: null }));
  }, []);

  const lock = useCallback(() => {
    setState(s => ({ ...s, isLocked: true }));
  }, []);

  const unlock = useCallback(() => {
    setState(s => ({ ...s, isLocked: false }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, authenticateWithBiometrics, authenticateWithPin, setPin, lock, unlock }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
