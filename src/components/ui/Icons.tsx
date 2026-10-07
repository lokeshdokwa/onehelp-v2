import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  fill?: string;
}

export const ShieldPlusIcon: React.FC<IconProps> = ({ size = 24, color = '#DC2626' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4 5V11C4 16.55 7.42 21.74 12 23C16.58 21.74 20 16.55 20 11V5L12 2Z"
      fill={color}
    />
    <Path
      d="M12 7V17M7 12H17"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
    <Path d="M9 22V12H15V22" />
  </Svg>
);

export const MapIcon: React.FC<IconProps> = ({ size = 24, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" />
    <Path d="M8 2V18" />
    <Path d="M16 6V22" />
  </Svg>
);

export const PhoneCallIcon: React.FC<IconProps> = ({ size = 24, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4743 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5902 20.9046 21.7335 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2412 2.44824 7.27103 2.12 4.18C2.09492 3.90351 2.12787 3.62489 2.21679 3.36177C2.30571 3.09865 2.44865 2.85699 2.63644 2.65215C2.82424 2.44731 3.05282 2.28392 3.30737 2.17242C3.56191 2.06093 3.83685 2.00384 4.115 2.005H7.115C7.5953 1.99524 8.06145 2.16709 8.42065 2.48629C8.77986 2.8055 9.00665 3.24944 9.056 3.73C9.14896 4.62908 9.36979 5.51268 9.715 6.36C9.85196 6.69466 9.88849 7.06208 9.82025 7.41753C9.75201 7.77298 9.58204 8.10065 9.33 8.36L8.06 9.63C9.48834 12.1381 11.5319 14.1817 14.04 15.61L15.31 14.34C15.5693 14.088 15.897 13.918 16.2525 13.8498C16.6079 13.7815 16.9753 13.818 17.31 13.955C18.1573 14.3002 19.0409 14.521 19.94 14.614C20.4253 14.6637 20.8732 14.8944 21.1934 15.2598C21.5135 15.6252 21.6823 16.0991 21.666 16.585L22 16.92Z" />
  </Svg>
);

export const UsersIcon: React.FC<IconProps> = ({ size = 24, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
    <Path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
    <Path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
    <Path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" />
  </Svg>
);

export const MoreHorizontalIcon: React.FC<IconProps> = ({ size = 24, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="1" />
    <Circle cx="19" cy="12" r="1" />
    <Circle cx="5" cy="12" r="1" />
  </Svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3" />
    <Path d="M19.4 15A1.65 1.65 0 0 0 20 16.88L20.1 17A2 2 0 0 1 18.69 20.41L18.5 20.31A1.65 1.65 0 0 0 16.63 21H16A2 2 0 0 1 14 23H10A2 2 0 0 1 8 21H7.37A1.65 1.65 0 0 0 5.5 20.31L5.31 20.41A2 2 0 0 1 3.89 17L4 16.88A1.65 1.65 0 0 0 3.6 15V14.37A2 2 0 0 1 1 12A2 2 0 0 1 3 10V9.37A1.65 1.65 0 0 0 4 7.5L3.89 7.31A2 2 0 0 1 6.31 3.89L6.5 4A1.65 1.65 0 0 0 8.37 3H9A2 2 0 0 1 11 1H13A2 2 0 0 1 15 3H15.63A1.65 1.65 0 0 0 17.5 3.69L17.69 3.59A2 2 0 0 1 21.11 7.01L21 7.2A1.65 1.65 0 0 0 21.4 9V9.63A2 2 0 0 1 23 12A2 2 0 0 1 21 14V14.63Z" />
  </Svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ size = 20, color = '#2563EB' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

export const WifiIcon: React.FC<IconProps> = ({ size = 18, color = '#16A34A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 12.55C6.98 10.96 9.4 10 12 10C14.6 10 17.02 10.96 19 12.55" />
    <Path d="M1.42 9C4.38 6.48 8.04 5 12 5C15.96 5 19.62 6.48 22.58 9" />
    <Path d="M8.53 16.11C9.52 15.39 10.73 15 12 15C13.27 15 14.48 15.39 15.47 16.11" />
    <Circle cx="12" cy="20" r="1" fill={color} />
  </Svg>
);

export const BatteryIcon: React.FC<IconProps> = ({ size = 18, color = '#16A34A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <Path d="M23 13V11" />
    <Rect x="3" y="8" width="10" height="8" fill={color} />
  </Svg>
);

export const PoliceServiceIcon: React.FC<IconProps> = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
    <Path d="M12 4L6 6.5V11.5C6 15.5 8.5 19.2 12 20.5C15.5 19.2 18 15.5 18 11.5V6.5L12 4Z" fill="#2563EB" />
    <Circle cx="12" cy="11" r="2.5" fill="#FFFFFF" />
  </Svg>
);

export const FireServiceIcon: React.FC<IconProps> = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.5" />
    <Path d="M12 4C12 4 15 7.5 15 11C15 12.66 14.33 14 13.5 15C14.5 14 15 12.5 15 11C16.5 13 17 15.5 15.5 17.8C14.5 19.2 13 20 12 20C9.24 20 7 17.76 7 15C7 11.5 10 9 10 9C10 9 9.5 11 11 12.5C11 10.5 12 4 12 4Z" fill="#DC2626" />
  </Svg>
);

export const AmbulanceServiceIcon: React.FC<IconProps> = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.5" />
    <Rect x="4" y="6" width="16" height="12" rx="2" fill="#E11D48" />
    <Path d="M12 8.5V15.5M8.5 12H15.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DisasterServiceIcon: React.FC<IconProps> = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M12 5L4 19H20L12 5Z" fill="#D97706" />
    <Path d="M12 10V14M12 17H12.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 24, color = '#0F172A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5M12 19L5 12L12 5" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 20, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18L15 12L9 6" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 20, color = '#16A34A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6L9 17L4 12" />
  </Svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ size = 22, color = '#DC2626' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M10.29 3.86L1.82 18C1.64 18.3 1.55 18.65 1.55 19C1.55 20.1 2.45 21 3.55 21H20.45C20.8 21 21.15 20.91 21.45 20.73C22.4 20.18 22.7 18.95 22.15 18L13.71 3.86C13.53 3.56 13.28 3.31 12.98 3.14C12.03 2.59 10.8 2.91 10.29 3.86Z" />
    <Path d="M12 9V13M12 17H12.01" />
  </Svg>
);

export const MicIcon: React.FC<IconProps> = ({ size = 24, color = '#2563EB' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="8" y="2" width="8" height="12" rx="4" />
    <Path d="M19 10V12C19 15.87 15.87 19 12 19M5 10V12C5 15.87 8.13 19 12 19M12 19V22M8 22H16" />
  </Svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M23 4V10H17M1 20V14H7" />
    <Path d="M3.51 9A9 9 0 0 1 20.49 15M20.49 15L23 10M3.51 9L1 14" />
  </Svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </Svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 20, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21V19C20 17.94 19.58 16.92 18.83 16.17C18.08 15.42 17.06 15 16 15H8C6.94 15 5.92 15.42 5.17 16.17C4.42 16.92 4 17.94 4 19V21" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 20, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <Path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 5V19M5 12H19" />
  </Svg>
);

export const HeartPulseIcon: React.FC<IconProps> = ({ size = 20, color = '#DC2626' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19.5 13.57L12 21L4.5 13.57C2.5 11.57 2.5 8.35 4.5 6.35C6.5 4.35 9.72 4.35 11.72 6.35L12 6.63L12.28 6.35C14.28 4.35 17.5 4.35 19.5 6.35C21.5 8.35 21.5 11.57 19.5 13.57Z" />
    <Path d="M3.5 12H6.5L8.5 7L11.5 17L14.5 10L16 12H20.5" />
  </Svg>
);

export const VibratePhoneIcon: React.FC<IconProps> = ({ size = 64, color = '#2563EB' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
    <Path d="M11 18H13M2 8L4 10L2 12M2 14L4 16L2 18M22 8L20 10L22 12M22 14L20 16L22 18" />
  </Svg>
);
