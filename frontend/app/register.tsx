import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { account } from "../config/appwriteConfig";
import { ID } from 'appwrite';
import { PharmacyColors, PaperTheme } from '../constants/Colors';
import { useCustomAlert } from '../components/CustomAlert';

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      
      const user = await account.create(
        ID.unique(),
        data.email.trim(),
        data.password,
        data.username
      );

      console.log("✅ User created:", user);
      
      // Auto login after registration
      try {
        await account.createEmailPasswordSession(data.email.trim(), data.password);
        alert("Account created successfully!");
        router.replace('/(tabs)');
      } catch (sessionError) {
        alert("Account created! Please sign in.");
        router.replace('/');
      }

    } catch (err: any) {
      console.error("Registration failed:", err);
      
      let errorMessage = "Registration failed";
      if (err.code === 409) {
        errorMessage = "An account with this email already exists";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Gradient */}
          <LinearGradient
            colors={PharmacyColors.gradientPrimary}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Create Account</Text>
              <Text style={styles.headerSubtitle}>Join us to get started</Text>
            </View>
          </LinearGradient>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              
              {/* Username Field */}
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Username"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="outlined"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="account" color={PharmacyColors.accent} />}
                    error={!!errors.username}
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
              {errors.username && (
                <Text style={styles.errorText}>{errors.username.message}</Text>
              )}

              {/* Email Field */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email"
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

              {/* Password Field */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    left={<TextInput.Icon icon="lock" color={PharmacyColors.accent} />}
                    right={
                      <TextInput.Icon 
                        icon={showPassword ? "eye-off" : "eye"} 
                        onPress={() => setShowPassword(!showPassword)}
                        color={PharmacyColors.gray}
                      />
                    }
                    error={!!errors.password}
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
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}

              {/* Confirm Password Field */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="outlined"
                    secureTextEntry={!showConfirmPassword}
                    left={<TextInput.Icon icon="lock-check" color={PharmacyColors.accent} />}
                    right={
                      <TextInput.Icon 
                        icon={showConfirmPassword ? "eye-off" : "eye"} 
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        color={PharmacyColors.gray}
                      />
                    }
                    error={!!errors.confirmPassword}
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
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
              )}

              {/* Terms & Conditions */}
              <Text style={styles.termsText}>
                By signing up, you agree to our{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>

              {/* Register Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                <LinearGradient
                  colors={PharmacyColors.gradientAccent}
                  style={[styles.registerButton, loading && styles.buttonDisabled]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.registerButtonText}>
                    {loading ? "Creating Account..." : "Sign Up"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
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
    paddingBottom: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: PharmacyColors.white,
    opacity: 0.9,
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
  termsText: {
    fontSize: 13,
    color: PharmacyColors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: PharmacyColors.accent,
    fontWeight: '600',
  },
  registerButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: PharmacyColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.white,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: PharmacyColors.textSecondary,
    fontSize: 15,
  },
  loginLink: {
    color: PharmacyColors.accent,
    fontSize: 15,
    fontWeight: 'bold',
  },
});