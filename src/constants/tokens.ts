// hälsoPilot Design Tokens
// Swedish palette — locked. Zero hardcoded colors anywhere else.
export const Colors = {
  primary:      '#3D7A8A',
  primaryC:     '#C2E8F0',
  secondary:    '#4A7C5F',
  secondaryC:   '#C5EAD3',
  tertiary:     '#7A6444',
  tertiaryC:    '#F0DFC0',
  surface:      '#F6F3EE',
  surfaceVar:   '#E4E0D8',
  bg:           '#EDEAE3',
  onSurface:    '#1C1B1A',
  onSurface2:   '#524F4A',
  outline:      '#918E87',
  outlineVar:   '#CAC6BE',
  error:        '#BA1A1A',
  errorC:       '#FFDAD6',
  chrome:       '#FFFFFF',
  chromeBorder: '#E8E4DD',
  warn:         '#B45309',
  warnC:        '#FEF3C7',
} as const;

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  28,
  xxxl: 40,
} as const;

export const Typography = {
  xs:      10,
  sm:      12,
  md:      14,
  lg:      16,
  xl:      18,
  xxl:     24,
  xxxl:    32,
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
};
