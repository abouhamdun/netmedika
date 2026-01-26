import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { PharmacyColors, PaperTheme } from '../constants/Colors';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  submitText: string;
  onSubmit: () => void;
  loading?: boolean;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
};

export default function AuthLayout({ title, subtitle, children, submitText, onSubmit, loading, footerText, footerLinkText, footerLinkHref }: Props) {
  return (
    <PaperProvider theme={PaperTheme}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <LinearGradient colors={PharmacyColors.gradientPrimary} style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{title}</Text>
              {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
            </View>
          </LinearGradient>

          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              {children}

              <TouchableOpacity activeOpacity={0.8} onPress={onSubmit} disabled={!!loading}>
                <LinearGradient colors={PharmacyColors.gradientAccent} style={[styles.submitButton, loading && styles.buttonDisabled]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.submitButtonText}>{loading ? `${submitText}...` : submitText}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {footerText && footerLinkText && footerLinkHref && (
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>{footerText}</Text>
                  <Link href={footerLinkHref} asChild>
                    <TouchableOpacity>
                      <Text style={styles.footerLink}>{footerLinkText}</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PharmacyColors.background },
  scrollContent: { flexGrow: 1 },
  header: { paddingTop: 60, paddingBottom: 40, paddingHorizontal: 30 },
  headerContent: { alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: PharmacyColors.white, marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: PharmacyColors.white, opacity: 0.9 },
  formContainer: { flex: 1, marginTop: -20, paddingHorizontal: 20 },
  formCard: { backgroundColor: PharmacyColors.white, borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  submitButton: { paddingVertical: 16, borderRadius: 30, alignItems: 'center', shadowColor: PharmacyColors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  submitButtonText: { fontSize: 18, fontWeight: 'bold', color: PharmacyColors.white },
  buttonDisabled: { opacity: 0.6 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: PharmacyColors.borderGray },
  dividerText: { marginHorizontal: 16, color: PharmacyColors.gray, fontSize: 14 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: PharmacyColors.textSecondary, fontSize: 15 },
  footerLink: { color: PharmacyColors.accent, fontSize: 15, fontWeight: 'bold' },
});
