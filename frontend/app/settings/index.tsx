import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PharmacyColors, CommonStyles } from '../../constants/Colors';
import { account } from '../../config/appwriteConfig';
import * as LocalAuthentication from 'expo-local-authentication';

export default function SettingsScreen() {
  const router = useRouter();
  const [isBiometricEnabled, setBiometricEnabled] = useState(false);
  const [is2FAEnabled, set2FAEnabled] = useState(false);

  const securitySettings = [
    {
      id: 1,
      title: 'Change Password',
      icon: 'key-outline',
      color: PharmacyColors.primary,
      onPress: handleChangePassword,
    },
    {
      id: 2,
      title: '2-Factor Authentication',
      icon: 'shield-checkmark-outline',
      color: PharmacyColors.success,
      onPress: handle2FASetup,
      toggle: true,
      value: is2FAEnabled,
      onToggle: (value: boolean) => handle2FAToggle(value),
    },
    {
      id: 3,
      title: 'Login with Fingerprint',
      icon: 'finger-print-outline',
      color: PharmacyColors.accent,
      onPress: handleBiometricSetup,
      toggle: true,
      value: isBiometricEnabled,
      onToggle: (value: boolean) => handleBiometricToggle(value),
    },
  ];

  async function handleChangePassword() {
    Alert.alert(
      'Change Password',
      'Do you want to change your password?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: async () => {
            try {
              // Here you would implement the password change logic
              // For example, you could navigate to a password change screen
              router.push('/change-password');
            } catch (error) {
              console.error('Error changing password:', error);
              Alert.alert('Error', 'Failed to initiate password change');
            }
          },
        },
      ]
    );
  }

  async function handle2FASetup() {
    if (!is2FAEnabled) {
      Alert.alert(
        'Enable 2FA',
        'Two-factor authentication adds an extra layer of security to your account. Would you like to set it up?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => set2FAEnabled(false),
          },
          {
            text: 'Set up 2FA',
            onPress: async () => {
              try {
                // Here you would implement the 2FA setup flow
                // For example, you could navigate to a 2FA setup screen
                router.push('/setup-2fa');
              } catch (error) {
                console.error('Error setting up 2FA:', error);
                Alert.alert('Error', 'Failed to set up 2FA');
                set2FAEnabled(false);
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Disable 2FA',
        'Are you sure you want to disable two-factor authentication? This will make your account less secure.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Disable',
            style: 'destructive',
            onPress: () => set2FAEnabled(false),
          },
        ]
      );
    }
  }

  async function handle2FAToggle(value: boolean) {
    if (value) {
      handle2FASetup();
    } else {
      set2FAEnabled(false);
    }
  }

  async function handleBiometricSetup() {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert(
          'Incompatible Device',
          'Your device doesn\'t support biometric authentication'
        );
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert(
          'No Biometrics Found',
          'Please set up biometric authentication in your device settings first'
        );
        return;
      }

      if (!isBiometricEnabled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to enable fingerprint login',
        });

        if (result.success) {
          setBiometricEnabled(true);
        }
      } else {
        setBiometricEnabled(false);
      }
    } catch (error) {
      console.error('Biometric error:', error);
      Alert.alert('Error', 'Failed to set up biometric authentication');
    }
  }

  async function handleBiometricToggle(value: boolean) {
    if (value) {
      handleBiometricSetup();
    } else {
      setBiometricEnabled(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />

      {/* Header */}
      <LinearGradient
        colors={PharmacyColors.gradientPrimary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={PharmacyColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Security Settings</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsContainer}>
          {securitySettings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              style={styles.settingItem}
              onPress={setting.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.settingIcon, { backgroundColor: setting.color + '20' }]}>
                <Ionicons name={setting.icon as any} size={24} color={setting.color} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
              </View>
              {setting.toggle ? (
                <Switch
                  value={setting.value}
                  onValueChange={setting.onToggle}
                  trackColor={{ false: PharmacyColors.gray, true: setting.color }}
                  thumbColor={PharmacyColors.white}
                />
              ) : (
                <Ionicons name="chevron-forward" size={20} color={PharmacyColors.gray} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  settingsContainer: {
    backgroundColor: PharmacyColors.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 8,
    ...CommonStyles.shadow,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
  },
});