import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from '../components/SplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import Svg, { Circle, Path, G, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulating some loading time (you can replace this with actual data loading)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0D47A1" />
      <LinearGradient
        colors={['#0D47A1', '#1565C0', '#1976D2']}
        style={styles.container}
      >
        {/* Top decorative gradient overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'transparent']}
          style={styles.topGradient}
        />

        {/* Pharmacy Icon/Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Svg height="120" width="120" viewBox="0 0 100 100">
              {/* Medical cross with rounded edges */}
              <G transform="translate(50, 50)">
                {/* Vertical bar */}
                <Rect
                  x="-8"
                  y="-25"
                  width="16"
                  height="50"
                  rx="4"
                  fill="#00BCD4"
                />
                {/* Horizontal bar */}
                <Rect
                  x="-25"
                  y="-8"
                  width="50"
                  height="16"
                  rx="4"
                  fill="#00BCD4"
                />
              </G>
              {/* Outer circle */}
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#00BCD4"
                strokeWidth="3"
                fill="none"
                opacity="0.5"
              />
            </Svg>
          </View>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to NetMedika</Text>
          <Text style={styles.subtitle}>
            Your trusted partner in health and wellness. Order medicines, consult experts, and manage your health easily.
          </Text>
        </View>

        {/* Feature Pills */}
        {/* <View style={styles.featuresContainer}>
          <View style={styles.featurePill}>
            <Text style={styles.featureIcon}>💊</Text>
            <Text style={styles.featureText}>Order Drugs</Text>
          </View>
          <View style={styles.featurePill}>
            <Text style={styles.featureIcon}>👨‍⚕️</Text>
            <Text style={styles.featureText}>Consultation</Text>
          </View>
          <View style={styles.featurePill}>
            <Text style={styles.featureIcon}>🚚</Text>
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
        </View> */}

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          
          {/* Get Started Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/login')}
          >
            <LinearGradient
              colors={['#00BCD4', '#00ACC1']}
              style={styles.primaryButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/login')}
            style={styles.secondaryButton}
          >
          </TouchableOpacity>
        </View>

        {/* Bottom decorative gradient */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.15)']}
          style={styles.bottomGradient}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  topGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.3,
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.2,
  },
  logoContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 80,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginVertical: 20,
  },
  featurePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 100,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: width * 0.85,
    gap: 16,
    marginBottom: 30,
  },
  primaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
});

export default WelcomeScreen;