// constants/Colors.js
export const PharmacyColors = {
  // Primary Colors
  primary: '#0D47A1',        // Deep Blue
  primaryLight: '#1976D2',   // Medium Blue
  primaryDark: '#01579B',    // Darker Blue
  
  // Accent Colors
  accent: '#00BCD4',         // Cyan/Teal
  accentLight: '#4DD0E1',    // Light Cyan
  accentDark: '#00ACC1',     // Dark Cyan
  
  // Success/Health
  success: '#4CAF50',        // Green
  successLight: '#66BB6A',
  
  // Error/Alert
  error: '#F44336',          // Red
  errorLight: '#EF5350',
  warning: '#FF9800',        // Orange
  info: '#2196F3',           // Info Blue
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  darkGray: '#424242',
  borderGray: '#E0E0E0',
  
  // Background
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  
  // Text
  textPrimary: '#212121',
  textSecondary: '#757575',
  textLight: '#FFFFFF',
  textDisabled: '#BDBDBD',
  
  // Gradients (arrays for LinearGradient)
  gradientPrimary: ['#0D47A1', '#1565C0', '#1976D2'] as const,
  gradientAccent: ['#00BCD4', '#00ACC1'] as const,
  gradientSuccess: ['#4CAF50', '#66BB6A'] as const,
  gradientError: ['#F44336', '#E53935'] as const,
};

// React Native Paper Theme
import { DefaultTheme } from 'react-native-paper';

export const PaperTheme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: PharmacyColors.primary,
    accent: PharmacyColors.accent,
    background: PharmacyColors.background,
    surface: PharmacyColors.white,
    text: PharmacyColors.textPrimary,
    placeholder: PharmacyColors.gray,
    error: PharmacyColors.error,
    disabled: PharmacyColors.textDisabled,
    notification: PharmacyColors.warning,
  },
};

// Common Styles
export const CommonStyles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  shadowLarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    backgroundColor: PharmacyColors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};