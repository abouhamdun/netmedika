// components/LoadingModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { PharmacyColors } from '../constants/Colors';

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export function LoadingModal({ visible, message = 'Loading...' }: LoadingModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require('../assets/loading.json')} // Download from lottiefiles.com
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

// components/SuccessModal.tsx
interface SuccessModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export function SuccessModal({ 
  visible, 
  title = 'Success!',
  message,
  onClose 
}: SuccessModalProps) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require('../assets/success.json')} // Download from lottiefiles.com
            autoPlay
            loop={false}
            style={styles.animation}
          />
          <Text style={styles.successTitle}>{title}</Text>
          {message && <Text style={styles.successMessage}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
}

// components/ErrorModal.tsx
interface ErrorModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export function ErrorModal({ 
  visible, 
  title = 'Error!',
  message = 'Something went wrong',
  onClose 
}: ErrorModalProps) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require('../assets/error.json')} // Download from lottiefiles.com
            autoPlay
            loop={false}
            style={styles.animation}
          />
          <Text style={styles.errorTitle}>{title}</Text>
          <Text style={styles.errorMessage}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: PharmacyColors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: 280,
    maxWidth: '80%',
  },
  animation: {
    width: 150,
    height: 150,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: PharmacyColors.textPrimary,
    fontWeight: '600',
  },
  successTitle: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: 'bold',
    color: PharmacyColors.success,
  },
  successMessage: {
    marginTop: 8,
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    textAlign: 'center',
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: 'bold',
    color: PharmacyColors.error,
  },
  errorMessage: {
    marginTop: 8,
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    textAlign: 'center',
  },
});

// Example Usage in Login Screen:
/*
import { LoadingModal, SuccessModal, ErrorModal } from '../components/LoadingModal';

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      
      const session = await account.createEmailSession(
        data.email.trim(),
        data.password
      );

      setLoading(false);
      setShowSuccess(true);
      
      // Navigate after success animation
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 2500);

    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Login failed');
      setShowError(true);
    }
  };

  return (
    <>
      {/* Your screen content *\/}
      
      <LoadingModal visible={loading} message="Signing you in..." />
      <SuccessModal 
        visible={showSuccess} 
        title="Welcome Back!"
        message="Login successful"
        onClose={() => setShowSuccess(false)}
      />
      <ErrorModal 
        visible={showError} 
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </>
  );
}
*/