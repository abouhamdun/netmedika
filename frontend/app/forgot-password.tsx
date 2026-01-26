import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ionicons } from '@expo/vector-icons';
import { PharmacyColors, PaperTheme } from '../constants/Colors';

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

type FormData = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });


  if (emailSent) {
    return (
      <PaperProvider theme={PaperTheme}>
        <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />
        <View style={styles.container}>
          <LinearGradient
            colors={PharmacyColors.gradientPrimary}
            style={styles.successHeader}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={PharmacyColors.white} />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <LinearGradient
                colors={PharmacyColors.gradientSuccess}
                style={styles.successIconGradient}
              >
                <Ionicons name="mail-outline" size={60} color={PharmacyColors.white} />
              </LinearGradient>
            </View>

            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successMessage}>
              We've sent password reset instructions to{'\n'}
              <Text style={styles.emailText}>{getValues('email')}</Text>
            </Text>

            <View style={styles.instructionsContainer}>
              <View style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>1</Text>
                </View>
                <Text style={styles.instructionText}>Check your email inbox</Text>
              </View>

              <View style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>2</Text>
                </View>
                <Text style={styles.instructionText}>Click the reset password link</Text>
              </View>

              <View style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>3</Text>
                </View>
                <Text style={styles.instructionText}>Create your new password</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.replace('/')}
            >
              <LinearGradient
                colors={PharmacyColors.gradientAccent}
                style={styles.backToLoginButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the email? </Text>
              <TouchableOpacity>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={PaperTheme}>
      <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with Gradient */}
          <LinearGradient
            colors={PharmacyColors.gradientPrimary}
            style={styles.header}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={PharmacyColors.white} />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              {/* <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={50} color={PharmacyColors.white} />
              </View> */}
              <Text style={styles.headerTitle}>Forgot Password?</Text>
              <Text style={styles.headerSubtitle}>
                Don't worry! Enter your email and we'll send you instructions to reset your password
              </Text>
            </View>
          </LinearGradient>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              
              {/* Email Field */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email Address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="email" color={PharmacyColors.accent} />}
                    error={!!errors.email}
                    style={styles.input}
                    outlineColor={PharmacyColors.borderGray}
                    activeOutlineColor={PharmacyColors.accent}
                    theme={{
                      colors: {
                        primary: PharmacyColors.accent,
                        text: PharmacyColors.textPrimary,
                      }
                    }}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}

              {/* Info Box */}
              <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color={PharmacyColors.info} />
                <Text style={styles.infoText}>
                  We'll send you a secure link to reset your password
                </Text>
              </View>

              {/* Send Reset Link Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                // onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                <LinearGradient
                  colors={PharmacyColors.gradientAccent}
                  style={[styles.submitButton, loading && styles.buttonDisabled]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.submitButtonText}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Text>
                  {!loading && (
                    <Ionicons name="arrow-forward" size={20} color={PharmacyColors.white} />
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Back to Login */}
              <TouchableOpacity
                style={styles.backToLoginOutline}
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={20} color={PharmacyColors.accent} />
                <Text style={styles.backToLoginOutlineText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 15,
    color: PharmacyColors.white,
    opacity: 0.95,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: PharmacyColors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    marginBottom: 8,
    backgroundColor: PharmacyColors.white,
  },
  errorText: {
    color: PharmacyColors.error,
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PharmacyColors.info + '10',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: PharmacyColors.textSecondary,
    marginLeft: 10,
    lineHeight: 18,
  },
  submitButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PharmacyColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: PharmacyColors.borderGray,
  },
  dividerText: {
    marginHorizontal: 16,
    color: PharmacyColors.gray,
    fontSize: 14,
  },
  backToLoginOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: PharmacyColors.accent,
  },
  backToLoginOutlineText: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.accent,
    marginLeft: 8,
  },
  successHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  successIconContainer: {
    marginBottom: 30,
  },
  successIconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PharmacyColors.success,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    color: PharmacyColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  emailText: {
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: PharmacyColors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PharmacyColors.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructionNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: PharmacyColors.textPrimary,
  },
  backToLoginButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  backToLoginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
});