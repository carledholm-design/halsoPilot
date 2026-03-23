import React from 'react';
import Svg, { Path, Polyline, Rect, Line } from 'react-native-svg';

interface NavIconProps {
  tab: string;
  color: string;
  size?: number;
}

export function NavIcons({ tab, color, size = 22 }: NavIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (tab) {
    case 'Today':
      return (
        <Svg {...props}>
          <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
      );
    case 'Health':
      return (
        <Svg {...props}>
          <Path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </Svg>
      );
    case 'Meds':
      return (
        <Svg {...props}>
          <Path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7.07-7.07l-10 10a4.95 4.95 0 1 0 7.07 7.07Z" />
          <Line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
        </Svg>
      );
    case 'Vitals':
      return (
        <Svg {...props}>
          <Path d="M3 12h4l3-9 4 18 3-9h4" />
        </Svg>
      );
    case 'Wallet':
      return (
        <Svg {...props}>
          <Rect x="2" y="5" width="20" height="14" rx="3" />
          <Line x1="2" y1="10" x2="22" y2="10" />
        </Svg>
      );
    default:
      return null;
  }
}
