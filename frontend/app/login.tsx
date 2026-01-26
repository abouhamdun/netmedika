import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm } from "react-hook-form";
import CustomInput from '../components/CustomInput';
import AuthLayout from '../components/AuthLayout';
import { apiPost, API_ENDPOINTS } from '../config/apiConfig';
import { styles as authStyles } from '../styles/authStyles';
import { PharmacyColors } from '../constants/Colors';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await apiPost(API_ENDPOINTS.auth.login, { email: data.email.trim(), password: data.password });
      // Expect backend to return access token, refresh token, and user
      // Save tokens locally as needed (e.g., AsyncStorage) — omitted here
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Login failed', err);
      alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue"
      submitText="Sign In"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      footerText="Don't have an account? "
      footerLinkText="Sign Up"
      footerLinkHref="/register"
    >
      <CustomInput
        name="email"
        control={control}
        label="Email"
        validationType="email"
        keyboardType="email-address"
        left={<TextInput.Icon icon="email" color={PharmacyColors.accent} />}
      />

      <CustomInput
        name="password"
        control={control}
        label="Password"
        validationType="password"
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} color={PharmacyColors.gray} />}
        left={<TextInput.Icon icon="lock" color={PharmacyColors.accent} />}
      />

      <TouchableOpacity style={authStyles.forgotPassword} onPress={() => {}}>
        <Text style={authStyles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
