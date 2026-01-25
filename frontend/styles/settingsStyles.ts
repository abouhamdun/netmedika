import { StyleSheet } from 'react-native';
import { PharmacyColors, CommonStyles } from '../constants/Colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PharmacyColors.background },
  header: { paddingTop: 20, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: PharmacyColors.white },
  content: { flex: 1, paddingTop: 20 },
  settingsContainer: { backgroundColor: PharmacyColors.white, marginHorizontal: 20, borderRadius: 16, padding: 8, ...CommonStyles.shadow },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 },
  settingIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  settingContent: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: PharmacyColors.textPrimary },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: PharmacyColors.white, marginHorizontal: 20, marginTop: 20, marginBottom: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: PharmacyColors.error },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: PharmacyColors.error, marginLeft: 8 },
  versionText: { textAlign: 'center', color: PharmacyColors.gray, fontSize: 12, marginBottom: 30 },
});
