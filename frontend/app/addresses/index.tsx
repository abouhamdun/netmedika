import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PharmacyColors, CommonStyles } from '../../constants/Colors';

interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
  });

  const handleAddAddress = () => {
    if (!newAddress.label.trim()) {
      Alert.alert('Invalid Input', 'Please enter an address label');
      return;
    }

    if (!newAddress.address.trim()) {
      Alert.alert('Invalid Input', 'Please enter an address');
      return;
    }

    const newAddressItem: Address = {
      id: Date.now().toString(),
      label: newAddress.label.trim(),
      address: newAddress.address.trim(),
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddressItem]);
    setShowAddAddress(false);
    setNewAddress({
      label: '',
      address: '',
    });

    Alert.alert('Success', 'Address added successfully');
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedAddresses = addresses.filter(addr => addr.id !== id);
            setAddresses(updatedAddresses);
            
            // If deleted address was default and there are other addresses, set first one as default
            if (updatedAddresses.length > 0 && addresses.find(a => a.id === id)?.isDefault) {
              updatedAddresses[0].isDefault = true;
            }
          },
        },
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addrs =>
      addrs.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />

      {/* Header */}
      <LinearGradient
        colors={PharmacyColors.gradientPrimary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={PharmacyColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery Addresses</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Saved Addresses */}
        {addresses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            {addresses.map((addr) => (
              <View key={addr.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <View style={styles.labelContainer}>
                    <Ionicons 
                      name="location" 
                      size={20} 
                      color={PharmacyColors.accent} 
                    />
                    <Text style={styles.addressLabel}>{addr.label}</Text>
                  </View>
                  {addr.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressText}>{addr.address}</Text>
                <View style={styles.addressActions}>
                  {!addr.isDefault && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSetDefault(addr.id)}
                    >
                      <Text style={styles.actionButtonText}>Set as Default</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteAddress(addr.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Add New Address Form */}
        <View style={styles.section}>
          {!showAddAddress ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddAddress(true)}
            >
              <Ionicons name="add-circle-outline" size={24} color={PharmacyColors.accent} />
              <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add New Address</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Label</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Home, Office, etc."
                  value={newAddress.label}
                  onChangeText={(text) => setNewAddress({...newAddress, label: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Delivery Address</Text>
                <TextInput
                  style={[styles.input, styles.addressInput]}
                  placeholder="Enter your full address"
                  value={newAddress.address}
                  onChangeText={(text) => setNewAddress({...newAddress, address: text})}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddAddress(false);
                    setNewAddress({
                      label: '',
                      address: '',
                    });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton]}
                  onPress={handleAddAddress}
                >
                  <Text style={styles.saveButtonText}>Save Address</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    backgroundColor: PharmacyColors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    ...CommonStyles.shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 16,
  },
  addressCard: {
    backgroundColor: PharmacyColors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    marginBottom: 12,
  },
  defaultBadge: {
    backgroundColor: PharmacyColors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    color: PharmacyColors.success,
    fontWeight: '600',
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: PharmacyColors.accent + '20',
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: PharmacyColors.accent,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: PharmacyColors.error + '20',
  },
  deleteButtonText: {
    color: PharmacyColors.error,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: PharmacyColors.accent + '40',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 16,
    color: PharmacyColors.accent,
    fontWeight: '600',
    marginLeft: 8,
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: PharmacyColors.lightGray,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: PharmacyColors.textPrimary,
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  formButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: PharmacyColors.gray + '20',
  },
  cancelButtonText: {
    fontSize: 16,
    color: PharmacyColors.gray,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: PharmacyColors.accent,
  },
  saveButtonText: {
    fontSize: 16,
    color: PharmacyColors.white,
    fontWeight: '600',
  },
});