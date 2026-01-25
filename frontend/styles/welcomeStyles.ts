import { StyleSheet, Dimensions } from 'react-native';
import { PharmacyColors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
  logoContainer: { marginTop: 60, alignItems: 'center', justifyContent: 'center' },
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
  textContainer: { alignItems: 'center', paddingHorizontal: 30, marginTop: 30 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#fff', marginBottom: 16, textAlign: 'center', letterSpacing: 0.5 },
  subtitle: { fontSize: 16, color: '#fff', textAlign: 'center', opacity: 0.95, lineHeight: 24, paddingHorizontal: 10 },
  buttonsContainer: { width: width * 0.85, gap: 16, marginBottom: 30 },
  primaryButton: { paddingVertical: 18, paddingHorizontal: 40, borderRadius: 30, alignItems: 'center', shadowColor: '#00BCD4', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 },
  primaryButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff', letterSpacing: 0.5 },
  secondaryButton: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, alignItems: 'center', backgroundColor: 'transparent' },
  secondaryButtonText: { fontSize: 15, fontWeight: '600', color: '#fff', opacity: 0.9 },
});
