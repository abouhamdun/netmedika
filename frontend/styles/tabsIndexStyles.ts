import { StyleSheet } from 'react-native';
import { PharmacyColors, CommonStyles } from '../constants/Colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PharmacyColors.background },
  content: { flex: 1 },
  header: { paddingTop: 20, paddingBottom: 32, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  welcomeRow: { flexDirection: 'row', alignItems: 'center' },
  welcomeText: { fontSize: 16, color: PharmacyColors.white, opacity: 0.9 },
  userName: { fontSize: 16, fontWeight: 'bold', color: PharmacyColors.white },
  subtitle: { fontSize: 16, color: PharmacyColors.white, opacity: 0.9, marginTop: 8 },
  servicesContainer: { padding: 20 },
  serviceCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 20, ...CommonStyles.shadowMedium },
  serviceCardGradient: { padding: 24 },
  serviceIconContainer: { marginBottom: 16 },
  serviceIcon: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
  serviceTitle: { fontSize: 20, fontWeight: 'bold', color: PharmacyColors.textPrimary, marginBottom: 8 },
  serviceDescription: { fontSize: 14, color: PharmacyColors.textSecondary, lineHeight: 20, marginBottom: 16 },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: PharmacyColors.white, alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, ...CommonStyles.shadow },
  actionButtonText: { fontSize: 14, fontWeight: '600', marginRight: 8 },
});
