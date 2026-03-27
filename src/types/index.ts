// hälsoPilot — All Types
// Data model locked. Do not add fields without updating Firebase schema.

// ── Auth ──────────────────────────────────────────────────────────────
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
}

// ── Condition (ROOT entity — everything links to this) ────────────────
export interface Condition {
  id: string;
  name: string;
  diagnosisDate: string;
  notes?: string;
  color?: string;
  userId: string;
}

// ── Medication ────────────────────────────────────────────────────────
export type MedType = 'prescription' | 'supplement';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  type: MedType;
  conditionId: string;
  pharmacyId?: string;
  prescribingDoctor?: string;
  refillDate?: string;
  userId: string;
}

// ── Doctor ────────────────────────────────────────────────────────────
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone?: string;
  address?: string;
  npi?: string;
  portalUrl?: string;
  notes?: string;
  userId: string;
}

// ── Appointment ───────────────────────────────────────────────────────
export type AppointmentStatus = 'upcoming' | 'today' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  doctorId: string;
  conditionId: string;
  location?: string;
  notes?: string;
  status: AppointmentStatus;
  userId: string;
}

// ── Lab Result ────────────────────────────────────────────────────────
export interface Biomarker {
  name: string;
  value: number;
  unit: string;
  refMin?: number;
  refMax?: number;
  flag?: 'high' | 'low' | 'normal';
}

export interface LabResult {
  id: string;
  panelName: string;
  date: string;
  conditionId: string;
  biomarkers: Biomarker[];
  orderedBy?: string;
  userId: string;
}

// ── Check-In ──────────────────────────────────────────────────────────
export interface CheckIn {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  pain: 1 | 2 | 3 | 4 | 5;
  note?: string;
  userId: string;
}

// ── Card (Wallet) ─────────────────────────────────────────────────────
export type CardType =
  | 'insurance_primary'
  | 'insurance_secondary'
  | 'insurance_tertiary'
  | 'rx_discount'
  | 'dental'
  | 'vision'
  | 'fsa'
  | 'hsa'
  | 'medicare'
  | 'medicaid'
  | 'other';

export interface HealthCard {
  id: string;
  type: CardType;
  issuerName: string;
  memberId?: string;
  groupNumber?: string;
  expiration?: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  phoneNumbers?: string[];
  userId: string;
}

// ── Emergency Card (derived — never manually edited) ──────────────────
export interface EmergencyCard {
  name: string;
  dob: string;
  bloodType: string;
  conditions: string[];
  medications: Array<{ name: string; dosage: string }>;
  allergies: Array<{ name: string; severity: string }>;
  emergencyContacts: Array<{ name: string; relationship: string; phone: string }>;
  primaryPhysician?: string;
}

// ── Personal Profile ──────────────────────────────────────────────────
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';
export type AllergySeverity = 'mild' | 'moderate' | 'severe' | 'anaphylaxis';

export interface Allergy {
  id: string;
  name: string;
  type: 'medication' | 'food' | 'environmental' | 'other';
  severity: AllergySeverity;
  notes?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface UserProfile {
  uid: string;
  fullName: string;
  dob: string;
  bloodType: BloodType;
  allergies: Allergy[];
  emergencyContacts: EmergencyContact[];
  homeAddress: Address;
  photoUrl?: string;
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  country: 'US' | 'CA';
}

// ── Navigation ────────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  BiometricLock: undefined;
  PIN: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

export type AppTabParamList = {
  Today: undefined;
  Health: undefined;
  Meds: undefined;
  Vitals: undefined;
  Wallet: undefined;
};

export type HealthStackParamList = {
  Conditions: undefined;
  ConditionDetail: { id: string };
  CareTeam: undefined;
  Labs: { conditionId?: string };
  LabDetail: { id: string };
  Appointments: undefined;
  AppointmentDetail: { id: string };
};

export type MedsStackParamList = {
  MedsList: undefined;
  MedDetail: { id: string };
};

export type WalletStackParamList = {
  CardList: undefined;
  CardDetail: { id: string };
  EmergencyCard: undefined;
};
