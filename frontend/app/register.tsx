import { useState } from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm } from "react-hook-form";
import CustomInput from '../components/CustomInput';
import AuthLayout from '../components/AuthLayout';
import { apiPost, API_ENDPOINTS } from '../config/apiConfig';
import { styles as authStyles } from '../styles/authStyles';
import { PharmacyColors } from '../constants/Colors';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
        fullname: formData.username,
      };
      const res = await apiPost(API_ENDPOINTS.auth.register, payload);
      console.log('Registration successful', res);
      router.replace('/login');
    } catch (err: any) {
      console.error('Registration failed', err);
      alert(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

   

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to get started"
      submitText="Sign Up"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      footerText="Already have an account? "
      footerLinkText="Sign In"
      footerLinkHref="/login"
    >
      <CustomInput
        name="username"
        control={control}
        label="Username"
        validationType="username"
        left={<TextInput.Icon icon="account" color={PharmacyColors.accent} />}
      />

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

      <CustomInput
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        validationType="password"
        secureTextEntry={!showConfirmPassword}
        right={<TextInput.Icon icon={showConfirmPassword ? 'eye-off' : 'eye'} onPress={() => setShowConfirmPassword(!showConfirmPassword)} color={PharmacyColors.gray} />}
        left={<TextInput.Icon icon="lock-check" color={PharmacyColors.accent} />}
        validate={(val) => val === getValues('password') || 'Passwords must match'}
      />

      <Text style={authStyles.termsText}>
        By signing up, you agree to our{' '}
        <Text style={authStyles.termsLink}>Terms & Conditions</Text>
        {' '}and{' '}
        <Text style={authStyles.termsLink}>Privacy Policy</Text>
      </Text>
    </AuthLayout>
  );
}

