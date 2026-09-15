/**
 * OneHelp Design System — Color Tokens
 *
 * Design philosophy: Calm authority, clarity under pressure, trustworthiness.
 * The palette is dark-first, using near-black backgrounds with carefully chosen
 * accent colors that provide maximum contrast and meaning.
 *
 * Emergency red is the ONLY red in the app — reserved exclusively for
 * life-threatening alerts and the SOS button.
 */

export const Colors = {
  // Base — Deep space palette
  background: '#0D0F14',
  surface: '#161921',
  surfaceElevated: '#1E2230',
  border: '#252836',
  borderStrong: '#353A4F',

  // Emergency — the only red in the app
  emergency: '#E63946',
  emergencyDim: '#2D1518',
  emergencyText: '#FF6B73',

  // Safety — confirmations and safe status
  safe: '#2DC653',
  safeDim: '#132213',

  // Warning
  warning: '#F4A261',
  warningDim: '#2A1C0E',

  // Information
  info: '#4CC9F0',
  infoDim: '#0A1F2E',

  // Text
  textPrimary: '#F0F2F5',
  textSecondary: '#8A90A0',
  textMuted: '#505568',
  textInverse: '#0D0F14',

  // Mesh network indicator
  mesh: '#A78BFA',
  meshDim: '#1B1530',

  // Satellite
  satellite: '#60EFFF',

  // Core
  white: '#FFFFFF',
  black: '#000000',

  // Transparent variants
  emergencyOverlay: 'rgba(230, 57, 70, 0.15)',
  safeOverlay: 'rgba(45, 198, 83, 0.15)',
  warningOverlay: 'rgba(244, 162, 97, 0.15)',
  infoOverlay: 'rgba(76, 201, 240, 0.15)',
  meshOverlay: 'rgba(167, 139, 250, 0.15)',
  blackOverlay: 'rgba(0, 0, 0, 0.6)',
} as const;

export type ColorToken = keyof typeof Colors;
