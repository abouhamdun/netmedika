import { StyleSheet } from 'react-native';
import { PharmacyColors, CommonStyles } from '../constants/Colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PharmacyColors.background },
  header: { paddingTop: 20, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  profileSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatarContainer: { marginRight: 16 },
  avatar: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: PharmacyColors.white },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: PharmacyColors.white },
  userInfo: { flex: 1 },
  userName: { fontSize: 22, fontWeight: 'bold', color: PharmacyColors.white, marginBottom: 4 },
  userEmail: { fontSize: 14, color: PharmacyColors.white, opacity: 0.9 },
  editButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, padding: 16, alignItems: 'center' },
  statCardMiddle: { marginHorizontal: 8 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: PharmacyColors.white, marginBottom: 4 },
  statLabel: { fontSize: 12, color: PharmacyColors.white, opacity: 0.9 },
  content: { flex: 1, paddingTop: 20 },
  menuContainer: { backgroundColor: PharmacyColors.white, marginHorizontal: 20, borderRadius: 16, padding: 8, ...CommonStyles.shadow },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 },
  menuIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: PharmacyColors.textPrimary },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: PharmacyColors.white, marginHorizontal: 20, marginTop: 20, marginBottom: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: PharmacyColors.error },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: PharmacyColors.error, marginLeft: 8 },
  versionText: { textAlign: 'center', color: PharmacyColors.gray, fontSize: 12, marginBottom: 30 },
});
