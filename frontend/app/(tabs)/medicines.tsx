import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PharmacyColors, CommonStyles } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export default function MedicinesScreen(): React.ReactElement {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to take photos of your prescription.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Gallery permission is required to select prescription photos.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const takePicture = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        // Here you would typically upload the image to your server
        console.log("Prescription photo taken:", result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take picture. Please try again.");
      console.error(error);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        // Here you would typically upload the image to your server
        console.log("Prescription photo selected:", result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select picture. Please try again.");
      console.error(error);
    }
  };

  const openPrescriptionUpload = () => {
    Alert.alert(
      "Upload Prescription",
      "Choose an option to upload your prescription",
      [
        {
          text: "Take Photo",
          onPress: takePicture
        },
        {
          text: "Choose from Gallery",
          onPress: pickImage
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={PharmacyColors.gradientPrimary} style={styles.header}>
          <Text style={styles.headerTitle}>Find Medicines</Text>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={PharmacyColors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search medicines..."
                placeholderTextColor={PharmacyColors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={() => setSearchQuery("")}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={20} color={PharmacyColors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>

        <View style={styles.uploadSection}>
          
          <TouchableOpacity
            style={styles.uploadCard}
            onPress={openPrescriptionUpload}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#E3F2FD", "#BBDEFB"]}
              style={styles.uploadCardGradient}
            >
              <View style={styles.uploadIconContainer}>
                <LinearGradient
                  colors={PharmacyColors.gradientAccent}
                  style={styles.uploadIcon}
                >
                  <Ionicons name="camera" size={40} color={PharmacyColors.white} />
                </LinearGradient>
              </View>

              <Text style={styles.uploadTitle}>Upload Your Prescription</Text>
              <Text style={styles.uploadDescription}>
                Take a photo or upload an image of your doctor's prescription
              </Text>

              <View style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Now</Text>
                <Ionicons name="arrow-forward" size={20} color={PharmacyColors.accent} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Why upload prescription?</Text>
            
            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="checkmark-circle" size={24} color={PharmacyColors.success} />
              </View>
              <Text style={styles.benefitText}>Get exact medicines prescribed by your doctor</Text>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="shield-checkmark" size={24} color={PharmacyColors.success} />
              </View>
              <Text style={styles.benefitText}>Verified by professional pharmacists</Text>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="time" size={24} color={PharmacyColors.success} />
              </View>
              <Text style={styles.benefitText}>Fast delivery to your doorstep</Text>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="star" size={24} color={PharmacyColors.success} />
              </View>
              <Text style={styles.benefitText}>Best prices guaranteed</Text>
            </View>
          </View>
        </View>

        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Upload Prescription</Text>
              <Text style={styles.stepDescription}>
                Take a clear photo of your prescription or upload from gallery
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Pharmacist Review</Text>
              <Text style={styles.stepDescription}>
                Our licensed pharmacist will verify your prescription
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Receive Medicines</Text>
              <Text style={styles.stepDescription}>
                Get your medicines delivered to your home
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background
  },
  content: {
    flex: 1
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 8
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PharmacyColors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...CommonStyles.shadow
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: PharmacyColors.textPrimary,
    paddingVertical: 4
  },
  clearButton: {
    padding: 4
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: PharmacyColors.white,
    marginBottom: 6
  },
  headerSubtitle: {
    fontSize: 15,
    color: PharmacyColors.white,
    opacity: 0.9,
    marginBottom: 16
  },
  uploadSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: PharmacyColors.textPrimary,
    marginBottom: 16
  },
  uploadCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    ...CommonStyles.shadowMedium
  },
  uploadCardGradient: {
    padding: 24,
    alignItems: "center"
  },
  uploadIconContainer: {
    marginBottom: 20
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: PharmacyColors.textPrimary,
    marginBottom: 8,
    textAlign: "center"
  },
  uploadDescription: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PharmacyColors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    ...CommonStyles.shadow
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: PharmacyColors.accent,
    marginRight: 8
  },
  benefitsContainer: {
    backgroundColor: PharmacyColors.white,
    borderRadius: 16,
    padding: 20,
    ...CommonStyles.shadow
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: PharmacyColors.textPrimary,
    marginBottom: 16
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  benefitIconContainer: {
    marginRight: 12
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    lineHeight: 20
  },
  howItWorksSection: {
    paddingHorizontal: 20,
    marginBottom: 24
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PharmacyColors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: PharmacyColors.white
  },
  stepContent: {
    flex: 1
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: PharmacyColors.textPrimary,
    marginBottom: 4
  },
  stepDescription: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    lineHeight: 20
  },
  bottomSpacing: {
    height: 30
  }
});