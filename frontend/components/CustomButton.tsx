// import { TouchableOpacity, Text, ViewStyle } from "react-native";
// import styles from "../constants/Styles";

// type ButtonProps = {
//     style?: ViewStyle | ViewStyle[]; // Accepts single or multiple styles
//     onPress: () => void;
//     title:string
// };
// const CustomedButton = ({ style, onPress, title}: ButtonProps) => {
//     return ( 
//         <TouchableOpacity 
//             onPress={onPress} 
//             style={[styles.button, style]}  // Merged styles
//         >
//             <Text style={[styles.btnText, style]}>{ title }</Text>
//         </TouchableOpacity>
//      );
// }
 
// export default CustomedButton;

// components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PharmacyColors } from '../constants/Colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
}: CustomButtonProps) {
  
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return PharmacyColors.gradientAccent;
      case 'danger':
        return PharmacyColors.gradientError;
      default:
        return PharmacyColors.gradientAccent;
    }
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.outlineButton, disabled && styles.disabled, style]}
      >
        {loading ? (
          <ActivityIndicator color={PharmacyColors.accent} />
        ) : (
          <>
            {icon && <>{icon}</>}
            <Text style={styles.outlineButtonText}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.secondaryButton, disabled && styles.disabled, style]}
      >
        {loading ? (
          <ActivityIndicator color={PharmacyColors.white} />
        ) : (
          <>
            {icon && <>{icon}</>}
            <Text style={styles.secondaryButtonText}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[disabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator color={PharmacyColors.white} />
        ) : (
          <>
            {icon && <>{icon}</>}
            <Text style={styles.buttonText}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: PharmacyColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginLeft: 8,
  },
  outlineButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: PharmacyColors.accent,
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.accent,
    marginLeft: 8,
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: PharmacyColors.lightGray,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});